package contratacion.service;

import contratacion.dto.ConvocatoriaDTO;

import java.util.List;

public interface ConvocatoriaService {
    List<ConvocatoriaDTO> findAll();
    ConvocatoriaDTO findById(String id);
    ConvocatoriaDTO save(ConvocatoriaDTO dto);
    void deleteById(String id);
}