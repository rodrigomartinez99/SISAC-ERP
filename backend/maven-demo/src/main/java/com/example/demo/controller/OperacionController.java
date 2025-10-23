package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/operacion")
public class OperacionController {

    @GetMapping
    public String listar() {
        return "Operacion - listar (mock)";
    }

    @PostMapping
    public String crear() {
        return "Operacion - crear (mock)";
    }
}
