package com.example.demo.dto;

import java.math.BigDecimal;

public class RemuneracionDTO {
    private Long id;
    private Long empleadoId;
    private String empleadoNombre;
    private String empleadoDni;
    private Long planillaId;
    private BigDecimal sueldoBruto;
    private BigDecimal descuentos;
    private BigDecimal aportes;
    private BigDecimal sueldoNeto;

    // Constructors
    public RemuneracionDTO() {}

    public RemuneracionDTO(Long id, Long empleadoId, String empleadoNombre, String empleadoDni,
                          Long planillaId, BigDecimal sueldoBruto, BigDecimal descuentos, 
                          BigDecimal aportes, BigDecimal sueldoNeto) {
        this.id = id;
        this.empleadoId = empleadoId;
        this.empleadoNombre = empleadoNombre;
        this.empleadoDni = empleadoDni;
        this.planillaId = planillaId;
        this.sueldoBruto = sueldoBruto;
        this.descuentos = descuentos;
        this.aportes = aportes;
        this.sueldoNeto = sueldoNeto;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpleadoId() {
        return empleadoId;
    }

    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    public String getEmpleadoNombre() {
        return empleadoNombre;
    }

    public void setEmpleadoNombre(String empleadoNombre) {
        this.empleadoNombre = empleadoNombre;
    }

    public String getEmpleadoDni() {
        return empleadoDni;
    }

    public void setEmpleadoDni(String empleadoDni) {
        this.empleadoDni = empleadoDni;
    }

    public Long getPlanillaId() {
        return planillaId;
    }

    public void setPlanillaId(Long planillaId) {
        this.planillaId = planillaId;
    }

    public BigDecimal getSueldoBruto() {
        return sueldoBruto;
    }

    public void setSueldoBruto(BigDecimal sueldoBruto) {
        this.sueldoBruto = sueldoBruto;
    }

    public BigDecimal getDescuentos() {
        return descuentos;
    }

    public void setDescuentos(BigDecimal descuentos) {
        this.descuentos = descuentos;
    }

    public BigDecimal getAportes() {
        return aportes;
    }

    public void setAportes(BigDecimal aportes) {
        this.aportes = aportes;
    }

    public BigDecimal getSueldoNeto() {
        return sueldoNeto;
    }

    public void setSueldoNeto(BigDecimal sueldoNeto) {
        this.sueldoNeto = sueldoNeto;
    }
}
