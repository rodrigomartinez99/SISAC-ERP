package com.fontec.gestion_convocatorias.repositories;

import com.fontec.gestion_convocatorias.entities.Convocatoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvocatoriaRepository extends JpaRepository<Convocatoria, Long> {
}