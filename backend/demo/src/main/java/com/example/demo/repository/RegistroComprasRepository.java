package com.example.demo.repository;

import com.example.demo.entity.RegistroCompras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroComprasRepository extends JpaRepository<RegistroCompras, Long> {
    boolean existsByProveedorIdAndNumeroFactura(Long proveedorId, String numeroFactura);
    
    List<RegistroCompras> findByContribuyenteIdAndFechaEmisionBetween(Long contribuyenteId, LocalDate inicio, LocalDate fin);
}