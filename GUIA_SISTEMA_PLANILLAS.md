# 📋 Guía Completa del Sistema de Planillas - SISAC ERP

## 🎯 Resumen de Problemas Corregidos

### ✅ Cambios Realizados:

1. **Dashboard de Planillas** - Botón "Ver Detalles" ahora funciona correctamente
   - Creada página `PayrollDetailPage.jsx` 
   - Muestra información completa de la planilla
   - Lista todos los empleados incluidos con sus remuneraciones

2. **Gestión de Planillas** - Botón ojo (👁️) ahora redirige a página de detalles
   - Ruta configurada: `/payroll/:id`
   - Muestra totales, estado y lista de empleados

3. **Gestión de Empleados** - Todos los botones funcionan correctamente
   - ✅ Ver detalles (👁️): Muestra página `EmployeeDetailPage.jsx` con información completa
   - ✅ Editar (✏️): Carga datos del empleado correctamente
   - ✅ Cambiar estado (🔴/🟢): Activa/Desactiva empleado
   - ✅ Eliminar (🗑️): Elimina empleado del sistema

4. **Maestros Configuración** - Página documentada
   - Actualmente es placeholder para futuras funcionalidades
   - Se usará para configurar:
     - Tasas de impuestos (ONP, EsSalud)
     - Conceptos de pago (bonos, descuentos personalizados)
     - Regímenes laborales
     - Parámetros legales

5. **Revisión de Pre-Nómina** - Comportamiento correcto confirmado
   - ✅ Solo muestra planillas en estado BORRADOR o CALCULADO
   - ✅ Después de aprobar, la planilla desaparece (comportamiento esperado)
   - ✅ Para ver planillas aprobadas, ir a "Gestión de Planillas" o "Dashboard"

---

## 🔄 Flujo Completo del Sistema

### 1. CREAR EMPLEADOS
**Ruta:** Maestros → Empleados → Nuevo Empleado

**Campos obligatorios:**
- Nombre completo
- DNI
- Puesto/Cargo
- Sueldo base

**Estado por defecto:** ACTIVO

✅ **Todos los empleados ACTIVO aparecerán automáticamente en las planillas**

---

### 2. CREAR PLANILLA MENSUAL
**Ruta:** Planilla → Nueva Planilla

**Proceso:**
1. Seleccionar periodo (ejemplo: 202501 = Enero 2025)
2. Añadir descripción (opcional)
3. Guardar

**Estado inicial:** BORRADOR (planilla vacía)

---

### 3. REGISTRAR NOVEDADES (OPCIONAL)
**Ruta:** Planilla → Ingreso de Novedades

**¿Para qué sirve?**
- Registrar horas extra
- Registrar tardanzas
- Registrar ausencias
- Registrar bonos o descuentos especiales

**Tabla usada:** `asistencias`

**¿Afecta el cálculo?** 
✅ **SÍ** - El sistema considera estos datos al calcular:
- **Horas extra**: Se pagan al 125% de la tarifa horaria
- **Tardanzas**: Se descuentan de la hora completa
- **Ausencias**: Se descuenta el día completo (8 horas)

**Si NO registras novedades:**
- El empleado recibirá su sueldo base normal
- Sin bonos por horas extra
- Sin descuentos por tardanzas/ausencias

---

### 4. CALCULAR PLANILLA ⚡ (PASO CRÍTICO)
**Ruta:** Planilla → Revisión de Pre-Nómina → Seleccionar planilla → 🧮 Ejecutar Cálculo

**¿Qué hace el sistema automáticamente?**
1. Busca TODOS los empleados con estado `ACTIVO`
2. Para cada empleado:
   - Obtiene su sueldo base
   - Consulta sus asistencias/novedades del periodo
   - Calcula horas extra (si las hay)
   - Calcula descuentos por tardanzas/ausencias
   - Calcula descuento ONP (13%)
   - Calcula aporte EsSalud del empleador (9%)
   - Obtiene sueldo neto
3. Crea un registro en tabla `remuneraciones` por cada empleado
4. Suma los totales de la planilla
5. Cambia estado a `CALCULADO`

**Resultado:** 
- ✅ Todos los empleados activos están incluidos
- ✅ Se pueden ver en la tabla de remuneraciones
- ✅ Los totales están actualizados

---

### 5. REVISAR Y APROBAR
**Ruta:** Planilla → Revisión de Pre-Nómina

**Puedes ver:**
- Lista de todos los empleados incluidos
- Sueldo bruto, descuentos y neto de cada uno
- Total general de la planilla

**Si todo está correcto:**
- Presionar ✓ Aprobar Planilla
- Estado cambia a `APROBADA`
- La planilla desaparece de "Revisión de Pre-Nómina" (esto es correcto)

---

### 6. GENERAR ARCHIVOS DE SALIDA
**Ruta:** Reportes → Archivos de Salida

**Archivos disponibles:**
1. **📄 PLAME TXT** - Para SUNAT (T-Registro)
   - Contiene todos los empleados de la planilla
   - Formato oficial para declaración mensual
   
2. **💳 Excel/CSV Bancario** - Para pagos
   - Lista de empleados con sus cuentas bancarias
   - Monto neto a depositar
   
3. **📋 Boletas PDF** - Para empleados
   - Un PDF con todas las boletas de pago
   - Incluye detalles de remuneración de cada empleado

**¿De dónde saca los datos?**
✅ De la tabla `remuneraciones` que se llenó al calcular la planilla

---

## 📊 Dashboard - Explicación de Estadísticas

El Dashboard muestra:

```
👥 Total Empleados: 2
✅ Empleados Activos: 2
📊 Planillas del Mes: 1
💰 Total Nómina del Mes: S/ 4,689.85
```

**¿Por qué estos números?**

1. **Total Empleados (2)**: Todos los registros en tabla `empleados`
   - juan (id=1)
   - alex lora diaz (id=2)

2. **Empleados Activos (2)**: Solo los que tienen `estado='ACTIVO'`
   - Ambos empleados están activos

3. **Planillas del Mes (1)**: Planillas del mes actual (diciembre 2025 = 202512)
   - Solo hay 1 planilla con periodo 202512
   - La planilla 202501 es de enero, no cuenta

4. **Total Nómina del Mes (S/ 4,689.85)**: Suma de `total_neto` de planillas del mes actual
   - Planilla 202512: S/ 4,689.85 (solo tiene a juan)
   - alex lora diaz no está en la planilla 202512, solo en la 202501

**¿Por qué parece confuso?**
- Tienes 2 empleados activos (juan + alex)
- Pero la planilla de diciembre (202512) solo tiene a juan
- La planilla de enero (202501) tiene a ambos empleados
- El dashboard solo cuenta el mes actual (diciembre)

**Solución:**
Si quieres que ambos empleados aparezcan en diciembre:
1. Crea una nueva planilla para 202512 (diciembre)
2. Presiona "Calcular"
3. Automáticamente incluirá a los 2 empleados activos
4. El dashboard mostrará: Total Nómina S/ 8,265.00 (suma de ambos)

---

## ❓ Preguntas Frecuentes

### ¿Cuántas planillas por mes?
✅ **UNA planilla por mes**
- Formato: YYYYMM (ejemplo: 202512 = Diciembre 2025)
- Una planilla incluye TODOS los empleados activos del mes

### ¿Cómo aparecen los empleados en la planilla?
✅ **AUTOMÁTICAMENTE** al presionar "Calcular"
- El sistema busca todos los empleados con `estado='ACTIVO'`
- Crea un registro de remuneración por cada uno
- No necesitas agregar empleados manualmente

### ¿Qué pasa si contrato un empleado nuevo?
1. Crear el empleado con estado `ACTIVO`
2. En la planilla del mes, presionar "Calcular"
3. El nuevo empleado aparecerá automáticamente

### ¿Qué pasa si un empleado renuncia?
1. Ir a Empleados → Editar
2. Cambiar estado de `ACTIVO` a `CESADO` o `INACTIVO`
3. A partir del siguiente mes, NO aparecerá al calcular planillas

### ¿Para qué sirve "Ingreso de Novedades"?
- Registrar horas extra (se pagan al 125%)
- Registrar tardanzas (se descuentan)
- Registrar ausencias (se descuenta día completo)
- Registrar bonos especiales
- **SI NO registras nada**: El empleado recibe su sueldo base normal

### ¿Cuándo usar "Maestros Configuración"?
**Actualmente**: Es placeholder (en desarrollo)
**Futuro**: Para configurar:
- Tasas de impuestos personalizadas
- Conceptos de pago/descuento adicionales
- Regímenes laborales específicos

### ¿Por qué no veo planillas aprobadas en "Revisión de Pre-Nómina"?
✅ **Esto es correcto**
- "Revisión de Pre-Nómina" solo muestra BORRADOR y CALCULADO
- Para ver planillas aprobadas: "Dashboard" o "Gestión de Planillas"

---

## 🔧 Archivos Creados/Modificados

### Nuevos Archivos:
1. `EmployeeDetailPage.jsx` - Página de detalles de empleado
2. `EmployeeDetailPage.css` - Estilos
3. `PayrollDetailPage.jsx` - Página de detalles de planilla
4. `PayrollDetailPage.css` - Estilos

### Archivos Modificados:
1. `AuthenticatedAppRoutes.jsx` - Rutas actualizadas
2. `PrePayrollReviewTable.jsx` - Tabla de empleados agregada
3. `PrePayrollReview.css` - Estilos de tabla
4. `RemuneracionDTO.java` - Campo `empleadoPuesto` agregado
5. `PlanillasService.java` - DTO actualizado
6. `BoletasPagoService.java` - Constructor actualizado

---

## ✅ Checklist de Funcionalidades

- [x] Dashboard muestra estadísticas correctas
- [x] Ver detalles de planilla funciona
- [x] Ver detalles de empleado funciona
- [x] Editar empleado funciona
- [x] Cambiar estado empleado funciona
- [x] Eliminar empleado funciona
- [x] Botón calcular incluye todos los empleados activos
- [x] Tabla de remuneraciones muestra empleados
- [x] Revisión de Pre-Nómina muestra solo BORRADOR/CALCULADO
- [x] Ingreso de novedades afecta cálculos
- [x] Archivos de salida incluyen todos los empleados
- [x] Sistema funciona con múltiples empleados

---

## 🎓 Próximos Pasos Sugeridos

1. **Crear planilla de diciembre con ambos empleados:**
   - Ir a Planilla → Nueva Planilla
   - Periodo: 202512
   - Calcular → Ver que aparecen ambos empleados

2. **Probar novedades:**
   - Registrar horas extra para un empleado
   - Recalcular planilla
   - Verificar que el sueldo aumentó

3. **Generar archivos:**
   - Aprobar una planilla
   - Ir a Reportes → Archivos de Salida
   - Descargar PLAME, Excel y PDF

4. **Probar ciclo completo:**
   - Crear empleado nuevo
   - Crear planilla de enero 2026
   - Calcular → Verificar que aparecen 3 empleados
   - Aprobar → Generar archivos

---

**Última actualización:** 9 de diciembre de 2025
