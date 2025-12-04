package com.example.demo.controller;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entity.Role;
import com.example.demo.entity.UsuarioAdmin;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuariosController {

    @Autowired private UsuarioAdminRepository usuarioRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    // Listar usuarios
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        List<UsuarioDTO> usuarios = usuarioRepository.findAll().stream()
            .map(u -> new UsuarioDTO(
                u.getId(), u.getEmail(), u.getNombre(), u.getApellido(),
                u.getRole().getNombre(), u.getActivo()
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }

    // Crear usuario
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody UsuarioDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya existe");
        }

        UsuarioAdmin usuario = new UsuarioAdmin();
        usuario.setEmail(dto.getEmail());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setActivo(true);
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        Role rol = roleRepository.findByNombre(dto.getRol())
            .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + dto.getRol()));
        usuario.setRole(rol);

        usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado");
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody UsuarioDTO dto) {
        UsuarioAdmin usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        
        // Actualizar rol si se envía
        if (dto.getRol() != null) {
            Role rol = roleRepository.findByNombre(dto.getRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
            usuario.setRole(rol);
        }

        // Actualizar password si se envía
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        usuario.setActivo(dto.getActivo());
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario actualizado");
    }

    // Eliminar (Desactivar lógicamente para mantener integridad)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        UsuarioAdmin usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setActivo(false);
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario desactivado");
    }
}