package com.example.demo.service.convocatorias;

import com.example.demo.entity.convocatorias.Entrevista;
import com.example.demo.entity.convocatorias.Postulacion;
import com.example.demo.repository.convocatorias.EntrevistaRepository;
import com.example.demo.repository.convocatorias.PostulacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrevistaService {

    @Autowired
    private EntrevistaRepository repository;

    @Autowired
    private PostulacionRepository postulacionRepository;

    public List<Entrevista> findAll() {
        return repository.findAll();
    }

    public Optional<Entrevista> findById(Long id) {
        return repository.findById(id);
    }

    public Entrevista save(Entrevista entrevista) {
        if (entrevista.getPostulacion() != null && entrevista.getPostulacion().getId() != null) {
            Postulacion post = postulacionRepository.findById(entrevista.getPostulacion().getId())
                .orElseThrow(() -> new RuntimeException("Postulación no encontrada"));
            entrevista.setPostulacion(post);
            post.setEntrevista(entrevista); // Vincular bidireccionalmente
        }
        if (entrevista.getResultado() == null) entrevista.setResultado("Pendiente");
        return repository.save(entrevista);
    }
}