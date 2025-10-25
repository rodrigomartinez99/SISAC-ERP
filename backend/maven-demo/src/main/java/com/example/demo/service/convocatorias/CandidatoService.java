package com.example.demo.service.convocatorias;

import com.example.demo.entity.convocatorias.Candidato;
import com.example.demo.repository.convocatorias.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatoService {

    @Autowired
    private CandidatoRepository repository;

    public List<Candidato> findAll() {
        return repository.findAll();
    }

    public Optional<Candidato> findById(Long id) {
        return repository.findById(id);
    }

    public Candidato save(Candidato candidato) {
        return repository.save(candidato);
    }

    public Optional<Candidato> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}