package com.example.demo.repository.convocatorias;

import com.example.demo.entity.convocatorias.Postulacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {
}