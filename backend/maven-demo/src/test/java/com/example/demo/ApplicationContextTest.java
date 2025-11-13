package com.example.demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test de Contexto de Aplicación - SISAC ERP
 * Verifica que el contexto de Spring Boot se cargue correctamente
 * 
 * Tipo: Test de Humo (Smoke Test)
 * Propósito: Validar que la aplicación arranca sin errores
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de Contexto de Aplicación")
class ApplicationContextTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @DisplayName("El contexto de Spring Boot debe cargar exitosamente")
    void contextLoads() {
        assertThat(applicationContext).isNotNull();
    }

    @Test
    @DisplayName("Debe tener configuración de seguridad")
    void shouldHaveSecurityConfiguration() {
        assertThat(applicationContext.containsBean("securityConfig")).isTrue();
    }

    @Test
    @DisplayName("Debe tener JwtUtil bean configurado")
    void shouldHaveJwtUtilBean() {
        assertThat(applicationContext.containsBean("jwtUtil")).isTrue();
    }

    @Test
    @DisplayName("Debe tener DataSource configurado")
    void shouldHaveDataSource() {
        assertThat(applicationContext.containsBean("dataSource")).isTrue();
    }

    @Test
    @DisplayName("Debe tener EntityManagerFactory configurado")
    void shouldHaveEntityManagerFactory() {
        assertThat(applicationContext.containsBean("entityManagerFactory")).isTrue();
    }
}
