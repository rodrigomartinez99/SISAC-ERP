package com.example.demo.repository;

import com.example.demo.entity.RegistroVentas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroVentasRepository extends JpaRepository<RegistroVentas, Long> {
    
    @Query("SELECT rv FROM RegistroVentas rv JOIN rv.comprobante c WHERE c.contribuyente.id = :contribuyenteId AND rv.fecha BETWEEN :inicio AND :fin")
    List<RegistroVentas> findByContribuyenteIdAndFechaBetween(Long contribuyenteId, LocalDate inicio, LocalDate fin);
}