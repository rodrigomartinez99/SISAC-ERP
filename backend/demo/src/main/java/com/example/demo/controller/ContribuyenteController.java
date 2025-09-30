package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contribuyente")
public class ContribuyenteController {

    @GetMapping
    public String listar() {
        return "Contribuyente - listar (mock)";
    }

    @PostMapping
    public String crear() {
        return "Contribuyente - crear (mock)";
    }
}
