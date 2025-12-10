# SETUP EN OTRO DISPOSITIVO - SISAC ERP
## Fecha: 10 Diciembre 2025
## Commit: 371a98c (modulo convocatorias unido)

---

## ⚠️ IMPORTANTE: Este Setup Funciona en Dispositivo Original

Este proyecto está **FUNCIONANDO** en el dispositivo original con esta configuración exacta.
El objetivo es **replicar el mismo estado** en otro dispositivo **SIN Flyway automático**.

---

## 🚫 POR QUÉ FLYWAY NO FUNCIONA EN DISPOSITIVO NUEVO

Las migraciones V1-V4 **NO fueron diseñadas para crear BD desde cero**. Fueron creadas para documentar una BD que ya existía manualmente.

### Errores que aparecen:
1. **V2 falla**: Intenta eliminar Foreign Keys que no existen
2. **V4 falla**: Intenta renombrar columnas que ya tienen el nombre correcto

### Por qué funciona aquí:
- La BD se creó manualmente ANTES de las migraciones
- Flyway solo "documentó" los cambios
- El historial de Flyway está marcado como ejecutado pero nunca realmente ejecutó desde cero

---

## ✅ SOLUCIÓN: Importar BD Completa (NO usar migraciones)

### Paso 1: En Dispositivo Original (Este)

```bash
# Hacer dump completo de la base de datos funcionando
mysqldump -u root -p sisac_db > sisac_db_completo.sql

# Hacer dump solo de estructura (sin datos)
mysqldump -u root -p --no-data sisac_db > sisac_db_estructura.sql
```

### Paso 2: Copiar archivos al Nuevo Dispositivo

Copiar estos archivos:
- `sisac_db_completo.sql` (con datos)
- O `sisac_db_estructura.sql` (solo estructura)

### Paso 3: En Dispositivo Nuevo

```bash
# 1. Crear base de datos
mysql -u root -p -e "CREATE DATABASE sisac_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

# 2. Importar dump
mysql -u root -p sisac_db < sisac_db_completo.sql

# 3. DESHABILITAR Flyway temporalmente
```

Editar `backend/maven-demo/src/main/resources/application.properties`:
```properties
# DESACTIVAR Flyway (la BD ya está completa)
spring.flyway.enabled=false
```

```bash
# 4. Iniciar backend
cd backend/maven-demo
.\mvnw.cmd spring-boot:run
```

---

## 📊 Alternativa: Marcar Migraciones como Ejecutadas

Si quieres mantener Flyway habilitado (pero sin ejecutar nada):

### Paso 1: Importar BD
```bash
mysql -u root -p sisac_db < sisac_db_completo.sql
```

### Paso 2: Crear Tabla de Historial de Flyway (manualmente)

```sql
USE sisac_db;

-- Crear tabla de historial si no existe
CREATE TABLE IF NOT EXISTS flyway_schema_history (
    installed_rank INT NOT NULL,
    version VARCHAR(50),
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    execution_time INT NOT NULL,
    success BOOLEAN NOT NULL,
    PRIMARY KEY (installed_rank)
);

-- Marcar migraciones como ya ejecutadas
INSERT INTO flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, execution_time, success) VALUES
(1, '1', 'create initial schema', 'SQL', 'V1__create_initial_schema.sql', NULL, 'root', 0, 1),
(2, '2', 'fix int to bigint primary keys', 'SQL', 'V2__fix_int_to_bigint_primary_keys.sql', NULL, 'root', 0, 1),
(3, '3', 'standardize remaining primary keys', 'SQL', 'V3__standardize_remaining_primary_keys.sql', NULL, 'root', 0, 1),
(4, '4', 'complete snake case standardization', 'SQL', 'V4__complete_snake_case_standardization.sql', NULL, 'root', 0, 1);
```

### Paso 3: Mantener Flyway Habilitado

En `application.properties`:
```properties
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
```

### Paso 4: Iniciar Backend
```bash
cd backend/maven-demo
.\mvnw.cmd spring-boot:run
```

Flyway detectará que las migraciones ya están "ejecutadas" y no intentará ejecutarlas de nuevo.

---

## 🎯 RESUMEN

| Método | Pros | Contras |
|--------|------|---------|
| **Importar BD + Flyway OFF** | ✅ Simple<br>✅ Sin errores<br>✅ Rápido | ⚠️ Flyway deshabilitado |
| **Importar BD + Marcar historial** | ✅ Flyway habilitado<br>✅ Sin errores | ⚠️ Requiere SQL manual |
| **Ejecutar migraciones** | ❌ NO FUNCIONA | ❌ V2 y V4 fallan |

---

## 📝 Archivos Necesarios para Otro Dispositivo

1. ✅ Código fuente (git clone)
2. ✅ Dump de BD (`sisac_db_completo.sql` o `sisac_db_estructura.sql`)
3. ✅ Este archivo de instrucciones
4. ⚠️ **NO** intentar usar Flyway para crear BD desde cero

---

## 🔧 Configuración de Flyway en Este Commit

```properties
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration
spring.flyway.validate-on-migrate=false
```

Pero recuerda: **Flyway está habilitado porque la BD ya existía antes**. En dispositivo nuevo, desactívalo o marca el historial manualmente.

---

## ✅ Verificación Post-Setup

Después de importar la BD, verificar:

```bash
# Ver tablas creadas
mysql -u root -p sisac_db -e "SHOW TABLES;"

# Ver módulo convocatorias
mysql -u root -p sisac_db -e "SELECT * FROM convocatoria LIMIT 1;"

# Ver historial Flyway (si está habilitado)
mysql -u root -p sisac_db -e "SELECT * FROM flyway_schema_history;"
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que importaste el dump completo
2. Verifica que MySQL está corriendo
3. Verifica las credenciales en `application.properties`
4. Si Flyway da problemas, desactívalo con `spring.flyway.enabled=false`

---

**Última actualización**: 10 Diciembre 2025  
**Commit funcional**: 371a98c
