package contratacion.repository;



import contratacion.entity.Convocatoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConvocatoriaRepository extends JpaRepository<Convocatoria, String> {
    // JpaRepository ya provee: findAll(), findById(), save(), deleteById(), etc.
}