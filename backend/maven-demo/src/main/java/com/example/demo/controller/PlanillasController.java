package com.example.demo.controller;

import com.example.demo.dto.PlanillaDTO;
import com.example.demo.service.PlanillasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/planillas")
@CrossOrigin(origins = "*")
public class PlanillasController {

    @Autowired
    private PlanillasService planillasService;

    @GetMapping
    public ResponseEntity<List<PlanillaDTO>> listarTodas() {
        try {
            List<PlanillaDTO> planillas = planillasService.listarTodas();
            return ResponseEntity.ok(planillas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanillaDTO> obtenerPorId(@PathVariable Long id) {
        try {
            PlanillaDTO planilla = planillasService.obtenerPorId(id);
            return ResponseEntity.ok(planilla);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/periodo/{periodo}")
    public ResponseEntity<?> obtenerPorPeriodo(@PathVariable String periodo) {
        try {
            PlanillaDTO planilla = planillasService.obtenerPorPeriodo(periodo);
            return ResponseEntity.ok(planilla);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody PlanillaDTO planillaDTO) {
        try {
            PlanillaDTO created = planillasService.crear(planillaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al crear planilla"));
        }
    }

    @PostMapping("/{id}/calcular")
    public ResponseEntity<?> calcularRemuneraciones(@PathVariable Long id) {
        try {
            PlanillaDTO planilla = planillasService.calcularRemuneraciones(id);
            return ResponseEntity.ok(planilla);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al calcular remuneraciones"));
        }
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<?> aprobar(@PathVariable Long id) {
        try {
            PlanillaDTO planilla = planillasService.aprobar(id);
            return ResponseEntity.ok(planilla);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al aprobar planilla"));
        }
    }

    @PutMapping("/{id}/vincular-pago")
    public ResponseEntity<?> vincularPago(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        try {
            Long pagoId = body.get("pagoId");
            if (pagoId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "pagoId requerido"));
            }
            PlanillaDTO planilla = planillasService.vincularPago(id, pagoId);
            return ResponseEntity.ok(planilla);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al vincular pago"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            planillasService.eliminar(id);
            return ResponseEntity.ok(Map.of("message", "Planilla eliminada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar planilla"));
        }
    }
}
