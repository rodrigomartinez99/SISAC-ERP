package com.example.demo.dto;

public class UsuarioDTO {
    private Long id;
    private String email;
    private String nombre;
    private String apellido;
    private String rol;
    private Boolean activo;
    private String password;

    public UsuarioDTO() {}

    public UsuarioDTO(Long id, String email, String nombre, String apellido, String rol, Boolean activo) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = rol;
        this.activo = activo;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}