package com.example.demo;

import com.example.demo.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test de Capa de Repositorios - SISAC ERP
 * Verifica que todos los repositorios JPA estén correctamente configurados
 * 
 * Tipo: Test de Integración de Persistencia
 * Propósito: Validar que los repositorios se inyecten correctamente
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de Capa de Repositorios")
class RepositoryLayerTest {

    @Autowired(required = false)
    private UsuarioAdminRepository usuarioAdminRepository;

    @Autowired(required = false)
    private ContribuyentesRepository contribuyentesRepository;

    @Autowired(required = false)
    private ParametrosTributariosRepository parametrosTributariosRepository;

    @Test
    @DisplayName("UsuarioAdminRepository debe estar disponible")
    void usuarioAdminRepositoryShouldBeAvailable() {
        assertThat(usuarioAdminRepository).isNotNull();
    }

    @Test
    @DisplayName("ContribuyentesRepository debe estar disponible")
    void contribuyentesRepositoryShouldBeAvailable() {
        assertThat(contribuyentesRepository).isNotNull();
    }

    @Test
    @DisplayName("ParametrosTributariosRepository debe estar disponible")
    void parametrosTributariosRepositoryShouldBeAvailable() {
        assertThat(parametrosTributariosRepository).isNotNull();
    }

    @Test
    @DisplayName("Todos los repositorios deben contar registros inicialmente")
    void allRepositoriesShouldCountRecords() {
        if (usuarioAdminRepository != null) {
            long count = usuarioAdminRepository.count();
            assertThat(count).isGreaterThanOrEqualTo(0);
        }

        if (contribuyentesRepository != null) {
            long count = contribuyentesRepository.count();
            assertThat(count).isGreaterThanOrEqualTo(0);
        }

        if (parametrosTributariosRepository != null) {
            long count = parametrosTributariosRepository.count();
            assertThat(count).isGreaterThanOrEqualTo(0);
        }
    }
}
