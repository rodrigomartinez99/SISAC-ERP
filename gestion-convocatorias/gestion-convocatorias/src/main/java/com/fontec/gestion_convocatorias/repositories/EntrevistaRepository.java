package com.fontec.gestion_convocatorias.repositories;

import com.fontec.gestion_convocatorias.entities.Entrevista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrevistaRepository extends JpaRepository<Entrevista, Long> {
}