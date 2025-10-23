package com.fontec.gestion_convocatorias.repositories;

import com.fontec.gestion_convocatorias.entities.Postulacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {
}