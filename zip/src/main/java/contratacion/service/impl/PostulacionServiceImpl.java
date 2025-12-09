package contratacion.service.impl;


import contratacion.entity.Candidato;
import contratacion.entity.Convocatoria;
import contratacion.repository.CandidatoRepository;
import contratacion.repository.ConvocatoriaRepository;
import contratacion.dto.PostulacionDTO;
import contratacion.entity.Postulacion;
import contratacion.repository.PostulacionRepository;
import contratacion.service.PostulacionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostulacionServiceImpl implements PostulacionService {

    @Autowired
    private PostulacionRepository repository;

    @Autowired
    private ConvocatoriaRepository convocatoriaRepository;

    @Autowired
    private CandidatoRepository candidatoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PostulacionDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PostulacionDTO findById(String id) {
        Postulacion entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Postulación no encontrada con ID: " + id));
        return convertToDto(entity);
    }

    @Override
    public PostulacionDTO save(PostulacionDTO dto) {
        Postulacion entity = convertToEntity(dto);
        Postulacion saved = repository.save(entity);
        return convertToDto(saved);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    private PostulacionDTO convertToDto(Postulacion entity) {
        PostulacionDTO dto = new PostulacionDTO();
        dto.setId(entity.getId());
        dto.setConvocatoriaId(entity.getConvocatoria().getId());
        dto.setCandidatoId(entity.getCandidato().getId());
        dto.setFechaEvaluacion(entity.getFechaEvaluacion());
        dto.setEstado(entity.getEstado());
        dto.setObservaciones(entity.getObservaciones());
        return dto;
    }

    private Postulacion convertToEntity(PostulacionDTO dto) {
        Postulacion entity = new Postulacion();
        entity.setId(dto.getId());

        // Cargar relaciones por ID
        Convocatoria convocatoria = convocatoriaRepository.findById(dto.getConvocatoriaId())
                .orElseThrow(() -> new RuntimeException("Convocatoria no encontrada: " + dto.getConvocatoriaId()));
        Candidato candidato = candidatoRepository.findById(dto.getCandidatoId())
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado: " + dto.getCandidatoId()));

        entity.setConvocatoria(convocatoria);
        entity.setCandidato(candidato);
        entity.setFechaEvaluacion(dto.getFechaEvaluacion());
        entity.setEstado(dto.getEstado());
        entity.setObservaciones(dto.getObservaciones());

        return entity;
    }
}