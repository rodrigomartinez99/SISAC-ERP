package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {

    @GetMapping
    public String listar() {
        return "Producto - listar (mock)";
    }

    @PostMapping
    public String crear() {
        return "Producto - crear (mock)";
    }
}
