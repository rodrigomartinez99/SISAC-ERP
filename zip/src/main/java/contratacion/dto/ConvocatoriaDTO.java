package contratacion.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ConvocatoriaDTO {

    @NotBlank(message = "El ID es obligatorio")
    private String id;

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotNull(message = "La fecha de publicación es obligatoria")
    @JsonProperty("fechaPublicacion") // Para que coincida con tu frontend (camelCase)
    private LocalDate fechaPublicacion;

    private String descripcion;

    // Constructors
    public ConvocatoriaDTO() {}

    public ConvocatoriaDTO(String id, String titulo, LocalDate fechaPublicacion, String descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.fechaPublicacion = fechaPublicacion;
        this.descripcion = descripcion;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public LocalDate getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDate fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}