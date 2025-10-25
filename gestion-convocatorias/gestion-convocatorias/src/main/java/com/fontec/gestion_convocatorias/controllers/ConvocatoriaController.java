package com.fontec.gestion_convocatorias.controllers;



import com.fontec.gestion_convocatorias.entities.Convocatoria;
import com.fontec.gestion_convocatorias.services.ConvocatoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/convocatorias")
@CrossOrigin(origins = "http://localhost:3000")
public class ConvocatoriaController {

    @Autowired
    private ConvocatoriaService service;

    @GetMapping
    public List<Convocatoria> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Convocatoria> getById(@PathVariable Long id) {
        Optional<Convocatoria> conv = service.findById(id);
        return conv.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}