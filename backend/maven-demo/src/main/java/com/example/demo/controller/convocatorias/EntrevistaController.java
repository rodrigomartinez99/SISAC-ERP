package com.example.demo.controller.convocatorias;

import com.example.demo.entity.convocatorias.Entrevista;
import com.example.demo.service.convocatorias.EntrevistaService;
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