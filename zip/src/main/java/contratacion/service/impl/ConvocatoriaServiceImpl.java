package contratacion.service.impl;

import contratacion.dto.ConvocatoriaDTO;
import contratacion.entity.Convocatoria;
import contratacion.repository.ConvocatoriaRepository;
import contratacion.service.ConvocatoriaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConvocatoriaServiceImpl implements ConvocatoriaService {

    @Autowired
    private ConvocatoriaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ConvocatoriaDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ConvocatoriaDTO findById(String id) {
        return convertToDto(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Convocatoria no encontrada con ID: " + id)));
    }

    @Override
    public ConvocatoriaDTO save(ConvocatoriaDTO dto) {
        Convocatoria entity = convertToEntity(dto);
        return convertToDto(repository.save(entity));
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    private ConvocatoriaDTO convertToDto(Convocatoria entity) {
        return modelMapper.map(entity, ConvocatoriaDTO.class);
    }

    private Convocatoria convertToEntity(ConvocatoriaDTO dto) {
        return modelMapper.map(dto, Convocatoria.class);
    }
}