package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auditlog")
public class AuditLogController {

    @GetMapping
    public String listar() {
        return "AuditLog - listar (mock)";
    }

    @PostMapping
    public String crear() {
        return "AuditLog - crear (mock)";
    }
}
