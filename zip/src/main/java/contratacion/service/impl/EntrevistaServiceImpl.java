package contratacion.service.impl;


import contratacion.dto.EntrevistaDTO;
import contratacion.entity.Candidato;
import contratacion.entity.Convocatoria;
import contratacion.entity.Entrevista;
import contratacion.repository.CandidatoRepository;
import contratacion.repository.ConvocatoriaRepository;
import contratacion.repository.EntrevistaRepository;
import contratacion.service.EntrevistaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntrevistaServiceImpl implements EntrevistaService {

    @Autowired
    private EntrevistaRepository repository;

    @Autowired
    private ConvocatoriaRepository convocatoriaRepository;

    @Autowired
    private CandidatoRepository candidatoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<EntrevistaDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EntrevistaDTO findById(String id) {
        Entrevista entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrevista no encontrada con ID: " + id));
        return convertToDto(entity);
    }

    @Override
    public EntrevistaDTO save(EntrevistaDTO dto) {
        Entrevista entity = convertToEntity(dto);
        Entrevista saved = repository.save(entity);
        return convertToDto(saved);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    private EntrevistaDTO convertToDto(Entrevista entity) {
        EntrevistaDTO dto = new EntrevistaDTO();
        dto.setId(entity.getId());
        dto.setConvocatoriaId(entity.getConvocatoria().getId());
        dto.setCandidatoId(entity.getCandidato().getId());
        dto.setNombreEvaluador(entity.getNombreEvaluador());
        dto.setResultado(entity.getResultado());
        dto.setFechaEvaluacion(entity.getFechaEvaluacion());
        dto.setObservaciones(entity.getObservaciones());
        return dto;
    }

    private Entrevista convertToEntity(EntrevistaDTO dto) {
        Entrevista entity = new Entrevista();
        entity.setId(dto.getId());

        // Cargar relaciones por ID
        Convocatoria convocatoria = convocatoriaRepository.findById(dto.getConvocatoriaId())
                .orElseThrow(() -> new RuntimeException("Convocatoria no encontrada: " + dto.getConvocatoriaId()));
        Candidato candidato = candidatoRepository.findById(dto.getCandidatoId())
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado: " + dto.getCandidatoId()));

        entity.setConvocatoria(convocatoria);
        entity.setCandidato(candidato);
        entity.setNombreEvaluador(dto.getNombreEvaluador());
        entity.setResultado(dto.getResultado());
        entity.setFechaEvaluacion(dto.getFechaEvaluacion());
        entity.setObservaciones(dto.getObservaciones());

        return entity;
    }
}