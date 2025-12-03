package com.example.demo.service;

import com.example.demo.dto.PlanillaDTO;
import com.example.demo.dto.RemuneracionDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanillasService {

    @Autowired
    private PlanillasRepository planillasRepository;

    @Autowired
    private PresupuestoPlanillaRepository presupuestoRepository;

    @Autowired
    private EmpleadosRepository empleadosRepository;

    @Autowired
    private RemuneracionesRepository remuneracionesRepository;

    @Autowired
    private AsistenciasRepository asistenciasRepository;

    @Autowired
    private PagosRepository pagosRepository;

    // Constantes para cálculos
    private static final BigDecimal TASA_ONP = new BigDecimal("0.13"); // 13%
    private static final BigDecimal TASA_ESSALUD = new BigDecimal("0.09"); // 9%
    private static final BigDecimal HORAS_MENSUALES = new BigDecimal("160"); // 8 horas x 20 días
    private static final BigDecimal TASA_HORA_EXTRA = new BigDecimal("1.25"); // 25% adicional

    @Transactional(readOnly = true)
    public List<PlanillaDTO> listarTodas() {
        return planillasRepository.findByOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PlanillaDTO obtenerPorId(Long id) {
        Planillas planilla = planillasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Planilla no encontrada con ID: " + id));
        
        PlanillaDTO dto = convertToDTO(planilla);
        
        // Cargar remuneraciones
        List<RemuneracionDTO> remuneraciones = remuneracionesRepository.findByPlanilla(planilla).stream()
                .map(this::convertRemuneracionToDTO)
                .collect(Collectors.toList());
        dto.setRemuneraciones(remuneraciones);
        
        return dto;
    }

    @Transactional(readOnly = true)
    public PlanillaDTO obtenerPorPeriodo(String periodo) {
        Planillas planilla = planillasRepository.findByPeriodo(periodo)
                .orElseThrow(() -> new RuntimeException("No existe planilla para el periodo: " + periodo));
        return obtenerPorId(planilla.getId());
    }

    @Transactional
    public PlanillaDTO crear(PlanillaDTO planillaDTO) {
        // Validar que no exista planilla para el periodo
        planillasRepository.findByPeriodo(planillaDTO.getPeriodo()).ifPresent(p -> {
            throw new RuntimeException("Ya existe una planilla para el periodo: " + planillaDTO.getPeriodo());
        });

        // Validar presupuesto
        PresupuestoPlanilla presupuesto = presupuestoRepository.findById(planillaDTO.getPresupuestoId())
                .orElseThrow(() -> new RuntimeException("Presupuesto no encontrado con ID: " + planillaDTO.getPresupuestoId()));

        Planillas planilla = new Planillas();
        planilla.setPeriodo(planillaDTO.getPeriodo());
        planilla.setEstado("BORRADOR");
        planilla.setPresupuestoPlanilla(presupuesto);
        planilla.setTotalBruto(BigDecimal.ZERO);
        planilla.setTotalNeto(BigDecimal.ZERO);

        Planillas saved = planillasRepository.save(planilla);
        return convertToDTO(saved);
    }

    @Transactional
    public PlanillaDTO calcularRemuneraciones(Long planillaId) {
        Planillas planilla = planillasRepository.findById(planillaId)
                .orElseThrow(() -> new RuntimeException("Planilla no encontrada con ID: " + planillaId));

        if (!"BORRADOR".equals(planilla.getEstado())) {
            throw new RuntimeException("Solo se pueden calcular remuneraciones en planillas en estado BORRADOR");
        }

        // Eliminar remuneraciones existentes si las hay
        remuneracionesRepository.findByPlanilla(planilla).forEach(r -> remuneracionesRepository.delete(r));

        // Obtener empleados activos
        List<Empleados> empleadosActivos = empleadosRepository.findByEstado("ACTIVO");

        BigDecimal totalBruto = BigDecimal.ZERO;
        BigDecimal totalNeto = BigDecimal.ZERO;

        for (Empleados empleado : empleadosActivos) {
            // Calcular remuneración por empleado
            Remuneraciones remuneracion = calcularRemuneracionEmpleado(empleado, planilla);
            remuneracionesRepository.save(remuneracion);

            totalBruto = totalBruto.add(remuneracion.getSueldoBruto());
            totalNeto = totalNeto.add(remuneracion.getSueldoNeto());
        }

        // Actualizar totales de planilla
        planilla.setTotalBruto(totalBruto);
        planilla.setTotalNeto(totalNeto);
        planillasRepository.save(planilla);

        return obtenerPorId(planillaId);
    }

    private Remuneraciones calcularRemuneracionEmpleado(Empleados empleado, Planillas planilla) {
        BigDecimal sueldoBase = empleado.getSueldoBase();
        BigDecimal tarifaHora = sueldoBase.divide(HORAS_MENSUALES, 2, RoundingMode.HALF_UP);

        // Obtener asistencias del periodo
        List<Asistencias> asistencias = asistenciasRepository.findByEmpleadoIdAndPeriodo(
                empleado.getId(), 
                planilla.getPeriodo()
        );

        // Calcular horas extra
        BigDecimal totalHorasExtra = asistencias.stream()
                .map(a -> a.getHorasExtra() != null ? a.getHorasExtra() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal pagoHorasExtra = tarifaHora.multiply(TASA_HORA_EXTRA).multiply(totalHorasExtra);

        // Calcular descuento por tardanzas (se descuenta la hora completa)
        BigDecimal totalTardanzas = asistencias.stream()
                .map(a -> a.getTardanza() != null ? a.getTardanza() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal descuentoTardanzas = tarifaHora.multiply(totalTardanzas);

        // Calcular descuento por ausencias (día completo = 8 horas)
        long totalAusencias = asistencias.stream()
                .filter(a -> a.getAusencia() != null && a.getAusencia())
                .count();

        BigDecimal descuentoAusencias = tarifaHora.multiply(new BigDecimal("8")).multiply(BigDecimal.valueOf(totalAusencias));

        // Sueldo bruto
        BigDecimal sueldoBruto = sueldoBase
                .add(pagoHorasExtra)
                .subtract(descuentoTardanzas)
                .subtract(descuentoAusencias);

        // Descuentos (ONP 13%)
        BigDecimal descuentoONP = sueldoBruto.multiply(TASA_ONP).setScale(2, RoundingMode.HALF_UP);

        // Aportes del empleador (EsSalud 9%)
        BigDecimal aporteEsSalud = sueldoBruto.multiply(TASA_ESSALUD).setScale(2, RoundingMode.HALF_UP);

        // Sueldo neto
        BigDecimal sueldoNeto = sueldoBruto.subtract(descuentoONP);

        // Crear remuneración
        Remuneraciones remuneracion = new Remuneraciones();
        remuneracion.setEmpleado(empleado);
        remuneracion.setPlanilla(planilla);
        remuneracion.setSueldoBruto(sueldoBruto.setScale(2, RoundingMode.HALF_UP));
        remuneracion.setDescuentos(descuentoONP);
        remuneracion.setAportes(aporteEsSalud);
        remuneracion.setSueldoNeto(sueldoNeto.setScale(2, RoundingMode.HALF_UP));

        return remuneracion;
    }

    @Transactional
    public PlanillaDTO aprobar(Long planillaId) {
        Planillas planilla = planillasRepository.findById(planillaId)
                .orElseThrow(() -> new RuntimeException("Planilla no encontrada con ID: " + planillaId));

        if (!"BORRADOR".equals(planilla.getEstado())) {
            throw new RuntimeException("Solo se pueden aprobar planillas en estado BORRADOR");
        }

        // Validar que existan remuneraciones
        List<Remuneraciones> remuneraciones = remuneracionesRepository.findByPlanilla(planilla);
        if (remuneraciones.isEmpty()) {
            throw new RuntimeException("La planilla no tiene remuneraciones calculadas");
        }

        // Validar presupuesto
        if (planilla.getPresupuestoPlanilla() != null) {
            if (planilla.getTotalNeto().compareTo(planilla.getPresupuestoPlanilla().getMontoTotal()) > 0) {
                throw new RuntimeException("El total de la planilla excede el presupuesto disponible");
            }
        }

        planilla.setEstado("APROBADA");
        Planillas updated = planillasRepository.save(planilla);

        return convertToDTO(updated);
    }

    @Transactional
    public PlanillaDTO vincularPago(Long planillaId, Long pagoId) {
        Planillas planilla = planillasRepository.findById(planillaId)
                .orElseThrow(() -> new RuntimeException("Planilla no encontrada con ID: " + planillaId));

        Pagos pago = pagosRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con ID: " + pagoId));

        if (!"APROBADA".equals(planilla.getEstado()) && !"PAGADA".equals(planilla.getEstado())) {
            throw new RuntimeException("Solo se pueden vincular pagos a planillas APROBADAS");
        }

        planilla.setPago(pago);
        planilla.setEstado("PAGADA");
        Planillas updated = planillasRepository.save(planilla);

        return convertToDTO(updated);
    }

    @Transactional
    public void eliminar(Long id) {
        Planillas planilla = planillasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Planilla no encontrada con ID: " + id));

        if (!"BORRADOR".equals(planilla.getEstado())) {
            throw new RuntimeException("Solo se pueden eliminar planillas en estado BORRADOR");
        }

        // Eliminar remuneraciones asociadas
        remuneracionesRepository.findByPlanilla(planilla).forEach(r -> remuneracionesRepository.delete(r));

        planillasRepository.deleteById(id);
    }

    private PlanillaDTO convertToDTO(Planillas planilla) {
        return new PlanillaDTO(
                planilla.getId(),
                planilla.getPeriodo(),
                planilla.getEstado(),
                planilla.getTotalBruto(),
                planilla.getTotalNeto(),
                planilla.getPresupuestoPlanilla() != null ? planilla.getPresupuestoPlanilla().getId() : null,
                planilla.getPago() != null ? planilla.getPago().getId() : null
        );
    }

    private RemuneracionDTO convertRemuneracionToDTO(Remuneraciones remuneracion) {
        return new RemuneracionDTO(
                remuneracion.getId(),
                remuneracion.getEmpleado().getId(),
                remuneracion.getEmpleado().getNombre(),
                remuneracion.getEmpleado().getDni(),
                remuneracion.getPlanilla().getId(),
                remuneracion.getSueldoBruto(),
                remuneracion.getDescuentos(),
                remuneracion.getAportes(),
                remuneracion.getSueldoNeto()
        );
    }
}
