package com.example.demo.service.convocatorias;

import com.example.demo.entity.convocatorias.Convocatoria;
import com.example.demo.repository.convocatorias.ConvocatoriaRepository;
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