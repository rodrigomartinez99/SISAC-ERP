package com.fontec.gestion_convocatorias.services;

import com.fontec.gestion_convocatorias.entities.Convocatoria;
import com.fontec.gestion_convocatorias.repositories.ConvocatoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConvocatoriaService {

    @Autowired
    private ConvocatoriaRepository repository;

    public List<Convocatoria> findAll() {
        return repository.findAll();
    }

    public Optional<Convocatoria> findById(Long id) {
        return repository.findById(id);
    }

    public Convocatoria save(Convocatoria convocatoria) {
        return repository.save(convocatoria);
    }
}