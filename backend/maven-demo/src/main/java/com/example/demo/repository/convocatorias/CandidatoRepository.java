package com.example.demo.repository.convocatorias;

import com.example.demo.entity.convocatorias.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    Optional<Candidato> findByEmail(String email);
}