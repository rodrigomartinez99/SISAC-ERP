package com.example.demo.controller.convocatorias;

import com.example.demo.entity.convocatorias.Postulacion;
import com.example.demo.service.convocatorias.PostulacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/postulaciones")
@CrossOrigin(origins = "http://localhost:3000")
public class PostulacionController {

    @Autowired
    private PostulacionService service;

    @GetMapping
    public List<Postulacion> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Postulacion> getById(@PathVariable Long id) {
        Optional<Postulacion> post = service.findById(id);
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Postulacion create(@RequestBody Postulacion postulacion) {
        return service.save(postulacion);
    }
}