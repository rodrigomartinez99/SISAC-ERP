package com.example.demo.service.convocatorias;

import com.example.demo.entity.convocatorias.Candidato;
import com.example.demo.entity.convocatorias.Convocatoria;
import com.example.demo.entity.convocatorias.Postulacion;
import com.example.demo.repository.convocatorias.CandidatoRepository;
import com.example.demo.repository.convocatorias.ConvocatoriaRepository;
import com.example.demo.repository.convocatorias.PostulacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostulacionService {

    @Autowired
    private PostulacionRepository repository;

    @Autowired
    private CandidatoRepository candidatoRepository;

    @Autowired
    private ConvocatoriaRepository convocatoriaRepository;

    public List<Postulacion> findAll() {
        return repository.findAll();
    }

    public Optional<Postulacion> findById(Long id) {
        return repository.findById(id);
    }

    public Postulacion save(Postulacion postulacion) {
        // Manejar candidato
        Candidato candidato = postulacion.getCandidato();
        if (candidato.getId() == null) {
            Optional<Candidato> existente = candidatoRepository.findByEmail(candidato.getEmail());
            if (existente.isPresent()) {
                postulacion.setCandidato(existente.get());
            } else {
                postulacion.setCandidato(candidatoRepository.save(candidato));
            }
        }

        // Manejar convocatoria
        if (postulacion.getConvocatoria() != null && postulacion.getConvocatoria().getId() != null) {
            Convocatoria conv = convocatoriaRepository.findById(postulacion.getConvocatoria().getId())
                .orElseThrow(() -> new RuntimeException("Convocatoria no encontrada"));
            postulacion.setConvocatoria(conv);
        }

        // Estados por defecto
        if (postulacion.getEstadoCv() == null) postulacion.setEstadoCv("Pendiente");
        if (postulacion.getEstadoPostulacion() == null) postulacion.setEstadoPostulacion("Pendiente");

        return repository.save(postulacion);
    }
}