package com.fontec.gestion_convocatorias.controllers;



import com.fontec.gestion_convocatorias.entities.Entrevista;
import com.fontec.gestion_convocatorias.services.EntrevistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrevistas")
@CrossOrigin(origins = "http://localhost:3000")
public class EntrevistaController {

    @Autowired
    private EntrevistaService service;

    @GetMapping
    public List<Entrevista> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Entrevista create(@RequestBody Entrevista entrevista) {
        return service.save(entrevista);
    }
}