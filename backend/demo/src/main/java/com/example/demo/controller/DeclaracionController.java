package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/declaracion")
public class DeclaracionController {

    @GetMapping
    public String listar() {
        return "Declaracion - listar (mock)";
    }

    @PostMapping
    public String crear() {
        return "Declaracion - crear (mock)";
    }
}
