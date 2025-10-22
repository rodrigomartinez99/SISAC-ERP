package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Contribuyente;

public interface ContribuyenteRepository extends JpaRepository<Contribuyente, Long> {

}
