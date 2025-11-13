package com.example.demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

/**
 * Test de Conexión a Base de Datos - SISAC ERP
 * Verifica la conectividad y configuración de la base de datos
 * 
 * Tipo: Test de Integración de Infraestructura
 * Propósito: Validar conexión H2 en memoria para tests
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de Conexión a Base de Datos")
class DatabaseConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    @DisplayName("DataSource debe estar configurado")
    void dataSourceShouldBeConfigured() {
        assertThat(dataSource).isNotNull();
    }

    @Test
    @DisplayName("Debe poder obtener conexión a la base de datos")
    void shouldGetDatabaseConnection() {
        assertDoesNotThrow(() -> {
            try (Connection connection = dataSource.getConnection()) {
                assertThat(connection).isNotNull();
                assertThat(connection.isClosed()).isFalse();
            }
        });
    }

    @Test
    @DisplayName("JdbcTemplate debe estar disponible")
    void jdbcTemplateShouldBeAvailable() {
        assertThat(jdbcTemplate).isNotNull();
    }

    @Test
    @DisplayName("Debe poder ejecutar query SELECT 1")
    void shouldExecuteSimpleQuery() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        assertThat(result).isEqualTo(1);
    }

    @Test
    @DisplayName("Base de datos debe ser H2 en modo test")
    void shouldBeH2Database() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String databaseProductName = connection.getMetaData().getDatabaseProductName();
            assertThat(databaseProductName).isEqualToIgnoringCase("H2");
        }
    }
}
