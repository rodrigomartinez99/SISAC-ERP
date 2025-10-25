package com.example.demo.repository.convocatorias;

import com.example.demo.entity.convocatorias.Entrevista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrevistaRepository extends JpaRepository<Entrevista, Long> {
}