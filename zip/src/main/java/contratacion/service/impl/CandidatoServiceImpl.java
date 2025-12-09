package contratacion.service.impl;



import contratacion.dto.CandidatoDTO;
import contratacion.entity.Candidato;
import contratacion.repository.CandidatoRepository;
import contratacion.service.CandidatoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidatoServiceImpl implements CandidatoService {

    @Autowired
    private CandidatoRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CandidatoDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CandidatoDTO findById(String id) {
        return convertToDto(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado con ID: " + id)));
    }

    @Override
    public CandidatoDTO save(CandidatoDTO dto) {
        Candidato entity = convertToEntity(dto);
        return convertToDto(repository.save(entity));
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    private CandidatoDTO convertToDto(Candidato entity) {
        return modelMapper.map(entity, CandidatoDTO.class);
    }

    private Candidato convertToEntity(CandidatoDTO dto) {
        return modelMapper.map(dto, Candidato.class);
    }
}