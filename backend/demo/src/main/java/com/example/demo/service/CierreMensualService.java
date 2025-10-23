package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter; // Import DateTimeFormatter
import java.util.List;
import java.util.Map;
import java.util.Objects; // Import Objects for null checks
import java.util.Optional; // Import Optional
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class CierreMensualService {

    @Autowired private DeclaracionesRepository declaracionesRepository;
    @Autowired private RegistroVentasRepository registroVentasRepository;
    @Autowired private RegistroComprasRepository registroComprasRepository;
    @Autowired private ContribuyentesRepository contribuyentesRepository;
    @Autowired private AuditoriaService auditoriaService;

    private final Path fileStorageLocation = Paths.get("sisac_storage/declaraciones").toAbsolutePath().normalize();

    public CierreMensualService() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("No se pudo crear el directorio de almacenamiento de archivos.", ex);
        }
    }

    // Proceso 3 - Inicio
    @Transactional // Añadir Transactional
    public Declaraciones iniciarProcesoCierre(Long contribuyenteId, String periodo, String usuario) throws Exception {
        // Validar formato YYYYMM
        if (!periodo.matches("^\\d{6}$")) {
            throw new Exception("El formato del periodo debe ser YYYYMM");
        }

        Contribuyentes contribuyente = contribuyentesRepository.findById(contribuyenteId)
            .orElseThrow(() -> new Exception("Contribuyente no encontrado"));

        // Buscar si ya existe una declaración para ese periodo
        Declaraciones declaracion = declaracionesRepository.findByContribuyenteIdAndPeriodo(contribuyenteId, periodo)
            .orElse(new Declaraciones()); // Crear una nueva si no existe

        // Asignar datos básicos
        declaracion.setContribuyente(contribuyente);
        declaracion.setPeriodo(periodo);
        declaracion.setEstado("PENDIENTE_CALCULO"); // Estado inicial

        // 1. Extraer Registros
        YearMonth ym = YearMonth.parse(periodo, DateTimeFormatter.ofPattern("yyyyMM")); // Usar DateTimeFormatter
        LocalDate inicioMes = ym.atDay(1);
        LocalDate finMes = ym.atEndOfMonth();

        List<RegistroVentas> ventas = registroVentasRepository.findByContribuyenteIdAndFechaBetween(contribuyenteId, inicioMes, finMes);
        List<RegistroCompras> compras = registroComprasRepository.findByContribuyenteIdAndFechaEmisionBetween(contribuyenteId, inicioMes, finMes);

        // 2. Calcular RF006 (Corregido con getters y manejo de nulos)
        BigDecimal igvDebito = ventas.stream()
            .map(RegistroVentas::getIgv) // Usar getter
            .filter(Objects::nonNull) // Filtrar nulos
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal igvCredito = compras.stream()
            .map(RegistroCompras::getIgv) // Usar getter
            .filter(Objects::nonNull) // Filtrar nulos
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal igvNeto = igvDebito.subtract(igvCredito);

        // Simulación Renta (Corregido con getter y manejo de nulos)
        BigDecimal baseRenta = ventas.stream()
            .map(RegistroVentas::getMontoTotal) // Usar getter
            .filter(Objects::nonNull) // Filtrar nulos
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal renta = baseRenta.multiply(new BigDecimal("0.015")); // 1.5%

        declaracion.setIgvDebito(igvDebito);
        declaracion.setIgvCredito(igvCredito);
        declaracion.setIgvNeto(igvNeto);
        declaracion.setRentaPagoCuenta(renta);

        // 3. Generar Archivos (RF007, RF009)
        String baseFileName = "Declaracion_" + periodo + "_" + contribuyente.getRuc(); // Usar getter
        String borradorPath = generarBorradorCalculo(baseFileName, ventas, compras, declaracion);

        // Simulación de creación de otros archivos
        String form621PdfPath = simularCreacionArchivo(baseFileName + "_Form621.pdf");
        String resumenIgvPdfPath = simularCreacionArchivo(baseFileName + "_ResumenIGV.pdf");
        String libroVentasPath = simularCreacionArchivo(baseFileName + "_LibroVentas.xlsx");
        String libroComprasPath = simularCreacionArchivo(baseFileName + "_LibroCompras.xlsx");

        declaracion.setForm621Pdf(form621PdfPath);
        declaracion.setResumenIgvPdf(resumenIgvPdfPath);
        declaracion.setLibroVentasXlsx(libroVentasPath);
        declaracion.setLibroComprasXlsx(libroComprasPath);

        // Generar ZIP
        String paqueteZipPath = generarPaqueteZip(baseFileName, Map.of(
            "BorradorCalculo.xlsx", borradorPath,
            "Form621.pdf", form621PdfPath,
            "ResumenIGV.pdf", resumenIgvPdfPath
        ));
        declaracion.setPaqueteZip(paqueteZipPath);

        declaracion.setEstado("PENDIENTE_APROBACION");

        Declaraciones savedDeclaracion = declaracionesRepository.save(declaracion);
        auditoriaService.registrar(usuario, "Declaraciones", "CALCULO_CIERRE", null, savedDeclaracion);

        // 4. Notificar (RF008) - Simulación
        System.out.println("NOTIFICACION: Declaración " + periodo + " lista para revisión.");

        return savedDeclaracion;
    }

    // Proceso 3 - Aprobación
    @Transactional // Añadir Transactional
    public Declaraciones aprobarDeclaracion(Long declaracionId, String usuario, boolean aprobado) throws Exception {
        Declaraciones declaracion = declaracionesRepository.findById(declaracionId)
            .orElseThrow(() -> new Exception("Declaración no encontrada"));

        if (!"PENDIENTE_APROBACION".equals(declaracion.getEstado())) { // Usar getter y equals
            throw new Exception("La declaración no está pendiente de aprobación");
        }

        Declaraciones oldDeclaracion = clonarDeclaracion(declaracion); // Para auditoría

        if (aprobado) {
            declaracion.setEstado("APROBADO_LISTO_PRESENTAR");
            auditoriaService.registrar(usuario, "Declaraciones", "APROBADO", oldDeclaracion, declaracion);
            // Aquí se podría actualizar el calendario de obligaciones
        } else {
            declaracion.setEstado("RECHAZADO_AJUSTES");
            // Se debería crear la "ListaAjustes"
            auditoriaService.registrar(usuario, "Declaraciones", "RECHAZADO", oldDeclaracion, declaracion);
        }

        return declaracionesRepository.save(declaracion);
    }

    // --- Métodos de Archivos ---

    private String generarBorradorCalculo(String baseFileName, List<RegistroVentas> ventas, List<RegistroCompras> compras, Declaraciones d) throws IOException {
        String fileName = baseFileName + "_BorradorCalculo.xlsx";
        Path filePath = this.fileStorageLocation.resolve(fileName);

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            XSSFSheet sheet = workbook.createSheet("Resumen");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Concepto");
            header.createCell(1).setCellValue("Monto");

            Row r1 = sheet.createRow(1);
            r1.createCell(0).setCellValue("IGV Débito (Ventas)");
            r1.createCell(1).setCellValue(d.getIgvDebito() != null ? d.getIgvDebito().doubleValue() : 0.0); // Usar getter y check null

            Row r2 = sheet.createRow(2);
            r2.createCell(0).setCellValue("IGV Crédito (Compras)");
            r2.createCell(1).setCellValue(d.getIgvCredito() != null ? d.getIgvCredito().doubleValue() : 0.0); // Usar getter y check null

            Row r3 = sheet.createRow(3);
            r3.createCell(0).setCellValue("IGV Neto a Pagar");
            r3.createCell(1).setCellValue(d.getIgvNeto() != null ? d.getIgvNeto().doubleValue() : 0.0); // Usar getter y check null

            Row r4 = sheet.createRow(4);
            r4.createCell(0).setCellValue("Renta Pago a Cuenta");
            r4.createCell(1).setCellValue(d.getRentaPagoCuenta() != null ? d.getRentaPagoCuenta().doubleValue() : 0.0); // Usar getter y check null

            // ... (Se podrían agregar más hojas con el detalle de ventas y compras) ...

            try (FileOutputStream outputStream = new FileOutputStream(filePath.toFile())) {
                workbook.write(outputStream);
            }
        }
        return fileName;
    }

    private String simularCreacionArchivo(String fileName) throws IOException {
        Path filePath = this.fileStorageLocation.resolve(fileName);
        // Crea un archivo vacío como simulación
        if (!Files.exists(filePath)) {
            Files.createFile(filePath);
        }
        return fileName;
    }

    private String generarPaqueteZip(String baseFileName, Map<String, String> archivos) throws IOException {
        String zipFileName = baseFileName + "_PaqueteDeclaracion.zip";
        Path zipFilePath = this.fileStorageLocation.resolve(zipFileName);

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFilePath.toFile()))) {
            for (Map.Entry<String, String> entry : archivos.entrySet()) {
                Path filePath = this.fileStorageLocation.resolve(entry.getValue());
                File fileToZip = filePath.toFile();

                if (fileToZip.exists()) {
                    zos.putNextEntry(new ZipEntry(entry.getKey())); // Nombre dentro del ZIP
                    Files.copy(filePath, zos);
                    zos.closeEntry();
                }
            }
        }
        return zipFileName;
    }

    public Resource cargarArchivoComoRecurso(Long declaracionId, String tipoArchivo) throws Exception {
        Declaraciones declaracion = declaracionesRepository.findById(declaracionId)
            .orElseThrow(() -> new Exception("Declaración no encontrada"));

        String fileName = "";
        switch (tipoArchivo) {
             // Usar getters para obtener los nombres de archivo
            case "borrador":
                fileName = Optional.ofNullable(declaracion.getLibroVentasXlsx())
                                   .map(s -> s.replace("LibroVentas.xlsx", "BorradorCalculo.xlsx"))
                                   .orElseThrow(() -> new Exception("Nombre de archivo de borrador no encontrado"));
                break;
            case "form621": fileName = Optional.ofNullable(declaracion.getForm621Pdf()).orElseThrow(() -> new Exception("Archivo Form621 no encontrado")); break;
            case "resumen": fileName = Optional.ofNullable(declaracion.getResumenIgvPdf()).orElseThrow(() -> new Exception("Archivo Resumen IGV no encontrado")); break;
            case "paquete": fileName = Optional.ofNullable(declaracion.getPaqueteZip()).orElseThrow(() -> new Exception("Archivo Paquete ZIP no encontrado")); break;
            default: throw new Exception("Tipo de archivo no válido: " + tipoArchivo);
        }

        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new Exception("Archivo no encontrado en el sistema: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new Exception("Error al construir la ruta del archivo: " + fileName, ex);
        }
    }

     // Helper para clonar el objeto antes de modificarlo para la auditoría
    private Declaraciones clonarDeclaracion(Declaraciones original) {
        Declaraciones clon = new Declaraciones();
        clon.setId(original.getId());
        clon.setContribuyente(original.getContribuyente());
        clon.setPeriodo(original.getPeriodo());
        clon.setIgvDebito(original.getIgvDebito());
        clon.setIgvCredito(original.getIgvCredito());
        clon.setIgvNeto(original.getIgvNeto());
        clon.setRentaPagoCuenta(original.getRentaPagoCuenta());
        clon.setForm621Pdf(original.getForm621Pdf());
        clon.setResumenIgvPdf(original.getResumenIgvPdf());
        clon.setLibroVentasXlsx(original.getLibroVentasXlsx());
        clon.setLibroComprasXlsx(original.getLibroComprasXlsx());
        clon.setPaqueteZip(original.getPaqueteZip());
        clon.setEstado(original.getEstado());
        clon.setCreatedAt(original.getCreatedAt());
        return clon;
    }
}