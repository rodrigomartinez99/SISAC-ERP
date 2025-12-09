# Revisión y Simplificación de Formularios - Módulo de Planillas

**Fecha:** 9 de diciembre de 2025  
**Objetivo:** Eliminar confusión entre campos que se muestran vs campos que realmente se guardan en la base de datos

---

## 📋 PROBLEMAS IDENTIFICADOS

### 1. Formulario de Empleados (EmployeeFormPage.jsx)

**ANTES:** El formulario mostraba 13 campos, pero solo 5 se guardaban en la BD.

#### ❌ Campos que se mostraban pero NO se guardaban:
- Apellido Paterno
- Apellido Materno
- Tipo de Documento (DNI/CE/Pasaporte)
- Email
- Teléfono
- Fecha de Ingreso
- Régimen Laboral
- CUSPP (AFP)
- Cuenta Bancaria

#### ✅ Campos que SÍ se guardan en la BD (tabla `empleados`):
- **id** (Long) - Generado automáticamente
- **nombre** (String) - Nombre completo
- **dni** (String) - Documento de identidad
- **puesto** (String) - Cargo/puesto del empleado
- **sueldoBase** (BigDecimal) - Sueldo mensual base
- **estado** (String) - ACTIVO, INACTIVO, ELIMINADO
- **created_at** (LocalDateTime) - Fecha de creación automática

---

### 2. Formulario de Planillas (PayrollFormPage.jsx)

**ANTES:** El formulario mostraba 4 campos de entrada, pero solo 2 se guardaban.

#### ❌ Campos que se mostraban pero NO se guardaban:
- mes (solo se usa para generar el periodo)
- año (solo se usa para generar el periodo)
- descripción

#### ✅ Campos que SÍ se guardan en la BD (tabla `planillas`):
- **id** (Long) - Generado automáticamente
- **periodo** (String) - Formato YYYYMM (ej: 202501 para enero 2025)
- **estado** (String) - BORRADOR, CALCULADO, APROBADO
- **total_bruto** (BigDecimal) - Calculado automáticamente
- **total_neto** (BigDecimal) - Calculado automáticamente
- **presupuesto_id** (Long) - Referencia a presupuesto (por defecto 1)
- **pago_id** (Long) - Referencia a pago (opcional)
- **created_at** (LocalDateTime) - Fecha de creación automática

---

## 🔧 CAMBIOS REALIZADOS

### A. EmployeeFormPage.jsx

#### 1. Estado del formulario simplificado:
```javascript
// ANTES (13 campos)
const [formData, setFormData] = useState({
  nombre: '', apellidoPaterno: '', apellidoMaterno: '',
  tipoDocumento: 'DNI', documento: '', email: '', telefono: '',
  cargo: '', sueldoBase: '', fechaIngreso: '', estado: 'ACTIVO',
  regimenLaboral: 'COMPLETO', cuspp: '', cuentaBancaria: ''
});

// DESPUÉS (5 campos)
const [formData, setFormData] = useState({
  nombre: '',
  dni: '',
  puesto: '',
  sueldoBase: '',
  estado: 'ACTIVO'
});
```

#### 2. Campos del formulario HTML:
- **Nombre Completo** (texto libre) - Se guarda tal cual
- **DNI** (8 dígitos numéricos) - Validación de formato
- **Puesto/Cargo** (texto libre)
- **Sueldo Base** (número decimal)
- **Estado** (ACTIVO/INACTIVO)

#### 3. Mejoras de UX:
- Agregado `placeholder` para guiar al usuario
- Agregado `<small>` con descripción de cada campo
- Agregado `.form-note` explicando que solo se guardan esos campos
- Validación de DNI con `pattern="[0-9]{8}"`

---

### B. PayrollFormPage.jsx

#### 1. Estado del formulario simplificado:
```javascript
// ANTES (4 campos)
const [formData, setFormData] = useState({
  periodo: '', mes: '', anio: 2025, descripcion: ''
});

// DESPUÉS (3 campos - descripción eliminada)
const [formData, setFormData] = useState({
  periodo: '', mes: '', anio: 2025
});
```

#### 2. Campos del formulario HTML:
- **Mes** (selector 1-12)
- **Año** (número 2020-2030)
- **Periodo** (campo deshabilitado, generado automáticamente)

#### 3. Mejoras de UX:
- Agregado `.form-note` explicando el propósito
- Agregado `.info-box` con reglas importantes:
  - Solo una planilla por periodo
  - Estado inicial: BORRADOR
  - Se debe calcular después de crear
  - Solo incluye empleados ACTIVOS
- Campo descripción eliminado (no se guardaba)

---

## 📊 COMPARACIÓN BACKEND vs FRONTEND

### Entidades de Base de Datos:

#### `empleados` (7 columnas):
```sql
CREATE TABLE empleados (
  idEmpleado BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  dni VARCHAR(8) NOT NULL UNIQUE,
  puesto VARCHAR(100),
  sueldoBase DECIMAL(10,2),
  estado VARCHAR(20) DEFAULT 'ACTIVO',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `planillas` (8 columnas):
```sql
CREATE TABLE planillas (
  idPlanilla BIGINT PRIMARY KEY AUTO_INCREMENT,
  periodo VARCHAR(6) NOT NULL UNIQUE,
  estado VARCHAR(20) DEFAULT 'BORRADOR',
  total_bruto DECIMAL(15,2),
  total_neto DECIMAL(15,2),
  presupuesto_id BIGINT,
  pago_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### DTOs del Backend:

#### `EmpleadoDTO.java` (6 campos):
```java
public class EmpleadoDTO {
    private Long id;
    private String nombre;
    private String dni;
    private String puesto;
    private BigDecimal sueldoBase;
    private String estado;
}
```

#### `PlanillaDTO.java` (8 campos):
```java
public class PlanillaDTO {
    private Long id;
    private String periodo;
    private String estado;
    private BigDecimal totalBruto;
    private BigDecimal totalNeto;
    private Long presupuestoId;
    private Long pagoId;
    private List<RemuneracionDTO> remuneraciones;
}
```

---

## ✅ VALIDACIONES IMPLEMENTADAS

### En EmployeeFormPage:
1. **Nombre completo**: Requerido, texto libre
2. **DNI**: Requerido, exactamente 8 dígitos numéricos
3. **Puesto**: Requerido, texto libre
4. **Sueldo Base**: Requerido, número decimal positivo
5. **Estado**: Requerido, solo ACTIVO o INACTIVO

### En PayrollFormPage:
1. **Mes**: Requerido, valores 1-12
2. **Año**: Requerido, rango 2020-2030
3. **Periodo**: Generado automáticamente (no editable)
4. **Validación backend**: Periodo único (no duplicados)

---

## 📁 ARCHIVOS MODIFICADOS

### 1. Frontend - Páginas:
- ✅ `frontend/src/features/payroll/pages/EmployeeFormPage.jsx`
  - Reducido de 326 a ~120 líneas
  - Eliminados 8 campos innecesarios
  - Simplificada lógica de mapeo de datos

- ✅ `frontend/src/features/payroll/pages/PayrollFormPage.jsx`
  - Reducido de 191 a ~170 líneas
  - Eliminado campo descripción
  - Agregada caja informativa con reglas

- ✅ `frontend/src/features/payroll/pages/PayrollListPage.jsx`
  - Eliminadas columnas: mes, año, descripción
  - Agregada columna: cantidad de empleados
  - Corregido filtro de búsqueda (eliminada búsqueda por descripción)

- ✅ `frontend/src/features/payroll/pages/PayrollDashboardPage.jsx`
  - Eliminada columna descripción de tabla de planillas recientes
  - Agregada columna de cantidad de empleados

### 2. Frontend - Componentes:
- ✅ `frontend/src/features/payroll/components/processes/MonthlyNoveltyEntry.jsx`
  - Corregido selector de empleados: usa `nombre` y `dni` en lugar de apellidos inexistentes

- ✅ `frontend/src/features/payroll/components/processes/PrePayrollReviewTable.jsx`
  - Eliminado display de descripción
  - Agregado contador de empleados en cards

- ✅ `frontend/src/features/payroll/components/reports/PayrollSummaryReportPage.jsx`
  - Eliminados campos: mes, año, descripción de la tabla de información
  - Agregados campos: cantidad de empleados, estado
  - Corregido selector de periodo

- ✅ `frontend/src/features/payroll/components/reports/OutputFilesPage.jsx`
  - Eliminada descripción del selector de planillas
  - Agregada información de cantidad de empleados

### 3. Frontend - Estilos:
- ✅ `frontend/src/features/payroll/styles/EmployeeFormPage.css`
  - Agregado `.form-note` para notas informativas
  - Agregado estilo para `<small>` (descripciones de campos)

- ✅ `frontend/src/features/payroll/styles/PayrollFormPage.css`
  - Agregado `.form-note` para notas informativas
  - Agregado `.info-box` para mensajes importantes
  - Agregado estilo para `<small>` (ayudas de campo)

---

## 🔍 PROBLEMAS ADICIONALES ENCONTRADOS

Durante la revisión exhaustiva, se encontraron campos inexistentes en varias páginas adicionales:

### 1. **PayrollListPage** (Gestión de Planillas):
- ❌ Columnas: `mes`, `anio`, `descripcion` → **NO existen en PlanillaDTO**
- ✅ Solución: Eliminadas y reemplazadas por columna "Empleados" con cantidad

### 2. **PayrollDashboardPage** (Dashboard):
- ❌ Columna: `descripcion` en tabla de planillas recientes → **NO existe**
- ✅ Solución: Eliminada y agregada columna de cantidad de empleados

### 3. **MonthlyNoveltyEntry** (Registro de Novedades):
- ❌ Campos: `apellidoPaterno`, `apellidoMaterno`, `documento` → **NO existen en EmpleadoDTO**
- ✅ Solución: Selector ahora muestra `nombre` y `dni`

### 4. **PrePayrollReviewTable** (Revisión de Pre-Nómina):
- ❌ Campo: `descripcion` → **NO existe**
- ✅ Solución: Reemplazado por contador de empleados

### 5. **PayrollSummaryReportPage** (Resumen de Planilla):
- ❌ Campos: `mes`, `anio`, `descripcion` → **NO existen**
- ✅ Solución: Reemplazados por cantidad de empleados y estado

### 6. **OutputFilesPage** (Generación de Archivos):
- ❌ Campo: `descripcion` en selector → **NO existe**
- ✅ Solución: Muestra periodo, estado y cantidad de empleados

---

## 🎯 IMPACTO DE LOS CAMBIOS

### Beneficios:
1. ✅ **Menos confusión**: Usuario solo ve campos que realmente se guardan
2. ✅ **Mejor UX**: Descripciones claras de qué hace cada campo
3. ✅ **Código más limpio**: Eliminada lógica innecesaria de mapeo
4. ✅ **Mantenibilidad**: Frontend alineado con backend
5. ✅ **Consistencia**: Lo que se muestra = lo que se guarda
6. ✅ **Sin errores de undefined**: Eliminados accesos a propiedades inexistentes

### Datos que el usuario debe saber:
- **DNI**: Es el único identificador único del empleado
- **Nombre completo**: Se guarda como un solo campo (no se separa en apellidos)
- **Periodo**: Se genera automáticamente del mes y año
- **Estado ACTIVO**: Solo empleados activos aparecen en planillas
- **Estado ELIMINADO**: No se borra físicamente, solo se marca como eliminado

---

## 📝 NOTAS IMPORTANTES

### 1. Sobre Empleados:
- El campo `nombre` guarda el nombre completo en un solo string
- El `dni` debe ser único (validación en backend)
- Solo empleados con `estado = 'ACTIVO'` se incluyen al calcular planillas
- `created_at` se genera automáticamente, no se puede modificar

### 2. Sobre Planillas:
- El `periodo` debe ser único (formato YYYYMM)
- Los campos `totalBruto` y `totalNeto` se calculan automáticamente
- El flujo es: BORRADOR → calcular → CALCULADO → aprobar → APROBADO
- Solo en BORRADOR se puede editar/calcular
- `presupuestoId` por defecto es 1 (debe existir en la tabla presupuesto_planilla)

### 3. Sobre Remuneraciones:
- Se generan automáticamente al calcular la planilla
- Una remuneración por cada empleado ACTIVO
- Incluyen: sueldoBruto, descuentos, aportes, sueldoNeto
- Se muestran en `PayrollDetailPage` con datos del empleado

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

1. **Probar los formularios**:
   - Crear nuevo empleado con campos simplificados
   - Verificar que el DNI se guarda correctamente
   - Crear nueva planilla y verificar periodo

2. **Verificar reportes y archivos**:
   - Confirmar que los PDF/TXT/Excel muestren el DNI
   - Verificar que el nombre completo aparece en todos los reportes

3. **Considerar agregar en el futuro** (si se necesita):
   - Tabla `empleados_detalles` con email, teléfono, etc.
   - Campo `descripcion` en planillas (requiere agregar columna en BD)
   - Campos de fecha de ingreso/contratación

4. **Documentación adicional**:
   - Actualizar manual de usuario con nuevos campos
   - Documentar qué campos son obligatorios
   - Explicar el flujo completo de creación de planilla

---

## 📞 SOPORTE

Si encuentra algún campo que se muestra pero no se guarda, o viceversa, revisar:
1. La entidad en `backend/maven-demo/src/main/java/com/example/demo/entity/`
2. El DTO en `backend/maven-demo/src/main/java/com/example/demo/dto/`
3. El servicio en `backend/maven-demo/src/main/java/com/example/demo/service/`

Todos los campos deben estar alineados entre estos tres niveles.

---

**FIN DEL DOCUMENTO**
