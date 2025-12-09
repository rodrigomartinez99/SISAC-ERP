package contratacion.repository;



import contratacion.entity.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, String> {
    // JpaRepository ya provee:
    // - save(), findById(), findAll(), deleteById(), existsById(), etc.
}