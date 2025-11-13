package com.example.demo;

import com.example.demo.util.JwtUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test de Configuración de Seguridad - SISAC ERP
 * Verifica que los componentes de seguridad estén correctamente configurados
 * 
 * Tipo: Test de Configuración
 * Propósito: Validar beans de seguridad (JWT, PasswordEncoder, etc.)
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de Configuración de Seguridad")
class SecurityConfigurationTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("JwtUtil debe estar configurado correctamente")
    void jwtUtilShouldBeConfigured() {
        assertThat(jwtUtil).isNotNull();
    }

    @Test
    @DisplayName("PasswordEncoder debe estar configurado")
    void passwordEncoderShouldBeConfigured() {
        assertThat(passwordEncoder).isNotNull();
    }

    @Test
    @DisplayName("PasswordEncoder debe codificar contraseñas")
    void passwordEncoderShouldEncodePasswords() {
        String rawPassword = "TestPassword123!";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        assertThat(encodedPassword).isNotNull();
        assertThat(encodedPassword).isNotEqualTo(rawPassword);
        assertThat(encodedPassword.length()).isGreaterThan(20);
    }

    @Test
    @DisplayName("PasswordEncoder debe validar contraseñas codificadas")
    void passwordEncoderShouldMatchEncodedPasswords() {
        String rawPassword = "SecurePass456!";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        assertThat(matches).isTrue();
    }

    @Test
    @DisplayName("PasswordEncoder debe rechazar contraseñas incorrectas")
    void passwordEncoderShouldRejectWrongPasswords() {
        String rawPassword = "CorrectPassword";
        String wrongPassword = "WrongPassword";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        boolean matches = passwordEncoder.matches(wrongPassword, encodedPassword);
        assertThat(matches).isFalse();
    }

    @Test
    @DisplayName("Contraseñas codificadas deben ser únicas (sal aleatoria)")
    void encodedPasswordsShouldBeUnique() {
        String password = "SamePassword123";
        String encoded1 = passwordEncoder.encode(password);
        String encoded2 = passwordEncoder.encode(password);
        
        // BCrypt genera sal diferente cada vez
        assertThat(encoded1).isNotEqualTo(encoded2);
        
        // Pero ambas deben validar contra la password original
        assertThat(passwordEncoder.matches(password, encoded1)).isTrue();
        assertThat(passwordEncoder.matches(password, encoded2)).isTrue();
    }
}
