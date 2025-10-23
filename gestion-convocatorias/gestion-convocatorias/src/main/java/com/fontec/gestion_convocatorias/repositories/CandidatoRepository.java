package com.fontec.gestion_convocatorias.repositories;

import com.fontec.gestion_convocatorias.entities.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    Optional<Candidato> findByEmail(String email);
}