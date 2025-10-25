package com.example.demo.controller.convocatorias;

import com.example.demo.entity.convocatorias.Candidato;
import com.example.demo.service.convocatorias.CandidatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatos")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidatoController {

    @Autowired
    private CandidatoService service;

    @GetMapping
    public List<Candidato> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Candidato create(@RequestBody Candidato candidato) {
        return service.save(candidato);
    }
}