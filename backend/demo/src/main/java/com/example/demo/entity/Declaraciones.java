package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "declaraciones")
public class Declaraciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contribuyente_id")
    private Contribuyentes contribuyente;

    private String periodo; // "YYYYMM"
    private BigDecimal igvDebito;
    private BigDecimal igvCredito;
    private BigDecimal igvNeto;
    private BigDecimal rentaPagoCuenta;
    private String form621Pdf;
    private String resumenIgvPdf;
    private String libroVentasXlsx;
    private String libroComprasXlsx;
    private String paqueteZip;
    private String estado; // PENDIENTE_CALCULO, PENDIENTE_APROBACION, APROBADO_LISTO_PRESENTAR, RECHAZADO_AJUSTES

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // --- GETTERS Y SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Contribuyentes getContribuyente() {
        return contribuyente;
    }

    public void setContribuyente(Contribuyentes contribuyente) {
        this.contribuyente = contribuyente;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public BigDecimal getIgvDebito() {
        return igvDebito;
    }

    public void setIgvDebito(BigDecimal igvDebito) {
        this.igvDebito = igvDebito;
    }

    public BigDecimal getIgvCredito() {
        return igvCredito;
    }

    public void setIgvCredito(BigDecimal igvCredito) {
        this.igvCredito = igvCredito;
    }

    public BigDecimal getIgvNeto() {
        return igvNeto;
    }

    public void setIgvNeto(BigDecimal igvNeto) {
        this.igvNeto = igvNeto;
    }

    public BigDecimal getRentaPagoCuenta() {
        return rentaPagoCuenta;
    }

    public void setRentaPagoCuenta(BigDecimal rentaPagoCuenta) {
        this.rentaPagoCuenta = rentaPagoCuenta;
    }

    public String getForm621Pdf() {
        return form621Pdf;
    }

    public void setForm621Pdf(String form621Pdf) {
        this.form621Pdf = form621Pdf;
    }

    public String getResumenIgvPdf() {
        return resumenIgvPdf;
    }

    public void setResumenIgvPdf(String resumenIgvPdf) {
        this.resumenIgvPdf = resumenIgvPdf;
    }

    public String getLibroVentasXlsx() {
        return libroVentasXlsx;
    }

    public void setLibroVentasXlsx(String libroVentasXlsx) {
        this.libroVentasXlsx = libroVentasXlsx;
    }

    public String getLibroComprasXlsx() {
        return libroComprasXlsx;
    }

    public void setLibroComprasXlsx(String libroComprasXlsx) {
        this.libroComprasXlsx = libroComprasXlsx;
    }

    public String getPaqueteZip() {
        return paqueteZip;
    }

    public void setPaqueteZip(String paqueteZip) {
        this.paqueteZip = paqueteZip;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
