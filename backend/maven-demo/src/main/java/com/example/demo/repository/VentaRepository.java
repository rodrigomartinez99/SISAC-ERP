package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {

}
