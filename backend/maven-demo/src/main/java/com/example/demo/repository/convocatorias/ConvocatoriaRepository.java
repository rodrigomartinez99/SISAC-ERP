package com.example.demo.repository.convocatorias;

import com.example.demo.entity.convocatorias.Convocatoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvocatoriaRepository extends JpaRepository<Convocatoria, Long> {
}