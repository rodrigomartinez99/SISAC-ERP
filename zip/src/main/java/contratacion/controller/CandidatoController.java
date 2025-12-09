package contratacion.controller;



import contratacion.dto.CandidatoDTO;
import contratacion.service.CandidatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatos")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidatoController {

    @Autowired
    private CandidatoService service;

    @GetMapping
    public ResponseEntity<List<CandidatoDTO>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<CandidatoDTO> create(@RequestBody CandidatoDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatoDTO> update(@PathVariable String id, @RequestBody CandidatoDTO dto) {
        if (!id.equals(dto.getId())) {
            throw new IllegalArgumentException("ID en URL debe coincidir con ID en el cuerpo");
        }
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}