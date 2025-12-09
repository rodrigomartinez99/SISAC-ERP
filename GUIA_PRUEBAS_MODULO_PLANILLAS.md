# 🧪 GUÍA COMPLETA DE PRUEBAS - MÓDULO DE PLANILLAS

## 📋 ÍNDICE
1. [Preparación del Sistema](#preparación-del-sistema)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Navegación del Módulo](#navegación-del-módulo)
4. [Pruebas por Funcionalidad](#pruebas-por-funcionalidad)
5. [APIs Disponibles](#apis-disponibles)
6. [Verificación de Resultados](#verificación-de-resultados)

---

## 🚀 PREPARACIÓN DEL SISTEMA

### 1. Verificar que los servicios estén corriendo:

**Backend (Puerto 8081):**
```powershell
cd backend/maven-demo
.\mvnw.cmd spring-boot:run
```
✅ Debe mostrar: "Started DemoApplication"

**Frontend (Puerto 5173):**
```powershell
cd frontend
npm run dev
```
✅ Debe mostrar: "Local: http://localhost:5173/"

**Base de Datos MySQL:**
- Servicio MySQL corriendo en puerto 3306
- Base de datos: `sisac_db`
- Usuario: `root` / Password: `admin`

---

## 🔐 ACCESO AL SISTEMA

### 1. Abrir el navegador:
```
http://localhost:5173
```

### 2. Credenciales de acceso:
```
Email: planilla@sisac.com
Password: planilla123
```

### 3. Verificar login exitoso:
- ✅ Debe redirigir a `/dashboard`
- ✅ Debe mostrar el sidebar con 6 opciones del módulo de planillas
- ✅ Debe mostrar el nombre del usuario en la parte superior

---

## 🧭 NAVEGACIÓN DEL MÓDULO

El sidebar muestra las siguientes opciones para el rol **GESTOR_PLANILLA**:

| Botón | Ruta | Componente |
|-------|------|------------|
| 📊 **Dashboard** | `/payroll/dashboard` | `PayrollDashboardPage` |
| ⚙️ **Maestros y Config** | `/masters/legal-parameters` | `LegalParametersTable` |
| ✏️ **Ingreso Novedades** | `/payroll/novelties` | `MonthlyNoveltyEntry` |
| ☑️ **Revisión Pre-Nómina** | `/payroll/review` | `PrePayrollReviewTable` |
| 📊 **Resumen Planilla** | `/reports/summary` | `PayrollSummaryReportPage` |
| 💾 **Archivos de Salida** | `/reports/output-files` | `OutputFilesPage` |

---

## 🧪 PRUEBAS POR FUNCIONALIDAD

### 1️⃣ DASHBOARD DE PLANILLA

**Ruta:** `/payroll/dashboard`

**Cómo acceder:**
- Click en el botón "📊 Dashboard" del sidebar

**Qué probar:**
- ✅ Verifica que la página cargue sin errores
- ✅ Debe mostrar el título "Dashboard de Planilla"
- ✅ Verifica que se muestre información básica del dashboard

**Estado actual:** Página básica implementada

---

### 2️⃣ MAESTROS Y CONFIGURACIÓN (Parámetros Legales)

**Ruta:** `/masters/legal-parameters`

**Cómo acceder:**
- Click en el botón "⚙️ Maestros y Config" del sidebar

**Qué probar:**
- ✅ Debe mostrar el título "Maestros y Configuración"
- ✅ Debe mostrar la sección "Parámetros Legales (UIT y RMV)"
  - UIT actual: S/ 5,150.00
  - RMV actual: S/ 1,025.00
- ✅ Debe mostrar botón "Gestionar Histórico / AFP Config"
- ✅ Debe mostrar sección "Gestión de Conceptos y Afectación"
- ✅ Debe mostrar botón "Editar Conceptos"

**APIs relacionadas:**
```bash
GET http://localhost:8081/api/configuracion
```

**Funcionalidad:** Gestión de parámetros legales como UIT, RMV, AFP, y configuración de conceptos de planilla.

---

### 3️⃣ INGRESO DE NOVEDADES MENSUALES

**Ruta:** `/payroll/novelties`

**Cómo acceder:**
- Click en el botón "✏️ Ingreso Novedades" del sidebar

**Qué probar:**
- ✅ Debe mostrar el título "Ingreso de Novedades"
- ✅ Debe mostrar la descripción: "Registrar horas extras, faltas, adelantos y bonificaciones del periodo actual"
- ✅ Debe mostrar sección "Novedades Mensuales" con ícono de reloj
- ✅ Debe mostrar botón "Registrar Novedades"

**Funcionalidad:** Registro de novedades que afectan la nómina mensual:
- Horas extras
- Faltas y tardanzas
- Adelantos de sueldo
- Bonificaciones especiales

---

### 4️⃣ REVISIÓN PRE-NÓMINA

**Ruta:** `/payroll/review`

**Cómo acceder:**
- Click en el botón "☑️ Revisión Pre-Nómina" del sidebar

**Qué probar:**
- ✅ Debe mostrar el título "Revisión Pre-Nómina"
- ✅ Debe mostrar una tabla con los empleados y sus cálculos
- ✅ Debe permitir revisar los cálculos antes de aprobar la planilla

**APIs relacionadas:**
```bash
GET http://localhost:8081/api/planillas
GET http://localhost:8081/api/planillas/{id}
POST http://localhost:8081/api/planillas/{id}/calcular
```

**Funcionalidad:** Revisión de cálculos de remuneraciones antes de la aprobación final.

---

### 5️⃣ RESUMEN DE PLANILLA

**Ruta:** `/reports/summary`

**Cómo acceder:**
- Click en el botón "📊 Resumen Planilla" del sidebar

**Qué probar:**
- ✅ Debe mostrar el título "Resumen de Planilla"
- ✅ Debe mostrar reportes consolidados
- ✅ Debe permitir visualizar totales y estadísticas

**APIs relacionadas:**
```bash
GET http://localhost:8081/api/planillas
GET http://localhost:8081/api/planillas/periodo/{periodo}
```

**Funcionalidad:** Visualización de resúmenes y reportes de la planilla procesada.

---

### 6️⃣ ARCHIVOS DE SALIDA

**Ruta:** `/reports/output-files`

**Cómo acceder:**
- Click en el botón "💾 Archivos de Salida" del sidebar

**Qué probar:**
- ✅ Debe mostrar el título "Archivos de Salida"
- ✅ Debe permitir generar archivos para:
  - PDT PLAME
  - AFP NET
  - Bancos (abono de sueldos)
  - Boletas de pago
- ✅ Debe mostrar listado de archivos generados

**APIs relacionadas:**
```bash
GET http://localhost:8081/api/planillas/{id}
POST http://localhost:8081/api/planillas/{id}/calcular
PUT http://localhost:8081/api/planillas/{id}/aprobar
```

**Funcionalidad:** Generación de archivos de salida para presentación a entidades externas.

---

## 🔌 APIs DISPONIBLES

### PLANILLAS
```bash
# Listar todas las planillas
GET http://localhost:8081/api/planillas

# Obtener planilla por ID
GET http://localhost:8081/api/planillas/{id}

# Obtener planilla por periodo (ej: 2024-12)
GET http://localhost:8081/api/planillas/periodo/2024-12

# Crear nueva planilla
POST http://localhost:8081/api/planillas
Content-Type: application/json
{
  "periodo": "2024-12",
  "mes": 12,
  "anio": 2024,
  "descripcion": "Planilla Diciembre 2024"
}

# Calcular remuneraciones
POST http://localhost:8081/api/planillas/{id}/calcular

# Aprobar planilla
PUT http://localhost:8081/api/planillas/{id}/aprobar

# Vincular pago
PUT http://localhost:8081/api/planillas/{id}/vincular-pago
Content-Type: application/json
{
  "pagoId": 1
}
```

### EMPLEADOS
```bash
# Listar todos los empleados
GET http://localhost:8081/api/empleados

# Listar empleados por estado
GET http://localhost:8081/api/empleados?estado=ACTIVO

# Obtener empleado por ID
GET http://localhost:8081/api/empleados/{id}

# Crear nuevo empleado
POST http://localhost:8081/api/empleados
Content-Type: application/json
{
  "nombre": "Juan",
  "apellidoPaterno": "Pérez",
  "apellidoMaterno": "García",
  "documento": "12345678",
  "tipoDocumento": "DNI",
  "email": "juan.perez@example.com",
  "cargo": "Analista",
  "sueldoBase": 3000.00,
  "fechaIngreso": "2024-01-15",
  "estado": "ACTIVO"
}

# Actualizar empleado
PUT http://localhost:8081/api/empleados/{id}

# Cambiar estado de empleado
PATCH http://localhost:8081/api/empleados/{id}/estado
Content-Type: application/json
{
  "estado": "INACTIVO"
}

# Eliminar empleado
DELETE http://localhost:8081/api/empleados/{id}
```

### CONFIGURACIÓN
```bash
# Obtener configuración actual
GET http://localhost:8081/api/configuracion

# Actualizar parámetros legales
PUT http://localhost:8081/api/configuracion
```

### ASISTENCIAS
```bash
# Registrar asistencias
GET http://localhost:8081/api/asistencias

# Obtener asistencias de un empleado
GET http://localhost:8081/api/asistencias/empleado/{empleadoId}
```

### BOLETAS DE PAGO
```bash
# Generar boletas
GET http://localhost:8081/api/boletas

# Obtener boleta por empleado y periodo
GET http://localhost:8081/api/boletas/{empleadoId}/periodo/{periodo}
```

---

## ✅ VERIFICACIÓN DE RESULTADOS

### 1. Verificar en Consola del Navegador (F12)
- No debe haber errores de JavaScript
- Verificar que las peticiones a la API devuelvan status 200
- Verificar que los datos se carguen correctamente

### 2. Verificar en Base de Datos
```sql
-- Verificar empleados
SELECT * FROM empleados LIMIT 10;

-- Verificar planillas
SELECT * FROM planillas ORDER BY periodo DESC LIMIT 5;

-- Verificar configuración
SELECT * FROM configuracion;

-- Verificar usuarios admin
SELECT * FROM usuarios_admin;
```

### 3. Verificar Logs del Backend
- Abrir la terminal donde corre Spring Boot
- Verificar que no haya errores SQL
- Verificar que las peticiones se procesen correctamente

### 4. Verificar Permisos
Abre la consola del navegador y ejecuta:
```javascript
// Ver usuario actual
JSON.parse(localStorage.getItem('user'))

// Ver permisos
JSON.parse(localStorage.getItem('user')).permissions
```

Debe mostrar:
```javascript
[
  'view_dashboard',
  'manage_legal_parameters',
  'manage_payroll_novelties',
  'review_pre_payroll',
  'generate_payroll_reports',
  'manage_output_files'
]
```

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: No carga la página
**Solución:** Verifica que ambos servicios (backend y frontend) estén corriendo

### Problema 2: Error 404 al navegar
**Solución:** Las rutas fueron corregidas a paths relativos. Refresca el navegador (F5)

### Problema 3: No aparecen los botones del sidebar
**Solución:** Verifica que el usuario tenga el rol `GESTOR_PLANILLA` y los permisos correctos

### Problema 4: Error de CORS
**Solución:** Verifica que el backend tenga `@CrossOrigin(origins = "*")` en los controllers

### Problema 5: Error de base de datos
**Solución:** Verifica que:
- MySQL esté corriendo
- La base de datos `sisac_db` exista
- Las credenciales sean correctas (root/admin)
- Flyway esté deshabilitado en `application.properties`

---

## 📊 RESUMEN DE COMPONENTES

| Módulo | Componentes Frontend | APIs Backend | Estado |
|--------|---------------------|--------------|--------|
| **Dashboard** | PayrollDashboardPage | - | ✅ Básico |
| **Maestros** | LegalParametersTable, EmployeePayrollDetails | /api/configuracion, /api/empleados | ✅ Funcional |
| **Novedades** | MonthlyNoveltyEntry | /api/asistencias | ✅ Funcional |
| **Revisión** | PrePayrollReviewTable | /api/planillas | ✅ Funcional |
| **Resumen** | PayrollSummaryReportPage | /api/planillas | ✅ Funcional |
| **Archivos** | OutputFilesPage | /api/boletas, /api/planillas | ✅ Funcional |

---

## 🎯 FLUJO COMPLETO DE PRUEBA

### Flujo Recomendado:
1. **Login** → Ingresar como `planilla@sisac.com`
2. **Dashboard** → Ver resumen general
3. **Maestros y Config** → Verificar parámetros UIT/RMV
4. **Ingreso Novedades** → Registrar novedades del mes
5. **Revisión Pre-Nómina** → Revisar cálculos
6. **Resumen Planilla** → Ver totales
7. **Archivos de Salida** → Generar archivos para AFP/PLAME/Bancos

---

## 📝 NOTAS FINALES

- **Rol del usuario:** GESTOR_PLANILLA
- **Permisos asignados:** 6 permisos relacionados con planillas
- **Puerto Backend:** 8081
- **Puerto Frontend:** 5173
- **Base de datos:** MySQL 8.0 (sisac_db)

---

**✨ SISTEMA LISTO PARA PRUEBAS ✨**
