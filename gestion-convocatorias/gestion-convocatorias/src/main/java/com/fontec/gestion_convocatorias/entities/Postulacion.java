package com.fontec.gestion_convocatorias.entities;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "postulaciones")
public class Postulacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String estadoCv;
    private LocalDateTime fechaEvaluacionCv;
    private String observacionesCv;
    private String estadoPostulacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_candidato", nullable = false)
    private Candidato candidato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_convocatoria", nullable = false)
    private Convocatoria convocatoria;

    @OneToOne(mappedBy = "postulacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private Entrevista entrevista;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEstadoCv() { return estadoCv; }
    public void setEstadoCv(String estadoCv) { this.estadoCv = estadoCv; }
    public LocalDateTime getFechaEvaluacionCv() { return fechaEvaluacionCv; }
    public void setFechaEvaluacionCv(LocalDateTime fechaEvaluacionCv) { this.fechaEvaluacionCv = fechaEvaluacionCv; }
    public String getObservacionesCv() { return observacionesCv; }
    public void setObservacionesCv(String observacionesCv) { this.observacionesCv = observacionesCv; }
    public String getEstadoPostulacion() { return estadoPostulacion; }
    public void setEstadoPostulacion(String estadoPostulacion) { this.estadoPostulacion = estadoPostulacion; }
    public Candidato getCandidato() { return candidato; }
    public void setCandidato(Candidato candidato) { this.candidato = candidato; }
    public Convocatoria getConvocatoria() { return convocatoria; }
    public void setConvocatoria(Convocatoria convocatoria) { this.convocatoria = convocatoria; }
    public Entrevista getEntrevista() { return entrevista; }
    public void setEntrevista(Entrevista entrevista) { this.entrevista = entrevista; }
}