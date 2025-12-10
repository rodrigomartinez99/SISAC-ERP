# SETUP EN OTRO DISPOSITIVO - SISAC ERP
## Fecha: 10 Diciembre 2025
## Commit: 371a98c (modulo convocatorias unido)

---

## ⚠️ IMPORTANTE: Base de Datos Exportada Lista

Este proyecto está **FUNCIONANDO** en el dispositivo original.
Se generó un archivo SQL con **toda la base de datos funcional**.

**Archivo generado**: `sisac_db_completo_20251210_135130.sql`
**Ubicación**: `backend/sisac_db_completo_20251210_135130.sql`

---

## 📋 PASOS PARA EL NUEVO DISPOSITIVO

### ✅ Paso 1: Obtener el archivo de la base de datos

**YA ESTÁ LISTO** en el repositorio:
- Archivo: `backend/sisac_db_completo_20251210_135130.sql`
- Contiene: Toda la estructura + datos + tablas del módulo convocatorias

**Después de clonar el repo**, este archivo ya estará disponible.

---

### ✅ Paso 2: Clonar/Actualizar el Repositorio

```powershell
cd "ruta\donde\quieres\el\proyecto"
git clone https://github.com/rodrigomartinez99/SISAC-ERP.git
cd SISAC-ERP
git checkout Rodrigo
git pull origin Rodrigo
```

---

### ✅ Paso 3: Importar la Base de Datos

1. **Abre PowerShell como Administrador**

2. **Navega al directorio backend**:
```powershell
cd SISAC-ERP\backend
```

3. **Importa la base de datos**:
```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < sisac_db_completo_20251210_135130.sql
```
*Te pedirá el password de MySQL - ingrésalo*

4. **Verifica que se importó correctamente**:
```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p sisac_db -e "SHOW TABLES;"
```

**Deberías ver estas tablas importantes**:
- ✅ `convocatoria` (singular)
- ✅ `entrevistas` (plural)
- ✅ `candidato`
- ✅ `postulacion`
- ✅ `empleados`
- ✅ `planillas`
- Y todas las demás...

---

### ✅ Paso 4: Configurar application.properties

Edita: `backend/maven-demo/src/main/resources/application.properties`

**Cambia SOLO el password de MySQL** a tu password local:

```properties
spring.datasource.password=TU_PASSWORD_MYSQL_AQUI
```

**CRÍTICO**: Verifica que Flyway esté **DESHABILITADO**:

```properties
spring.flyway.enabled=false
```

*(Si está en `true`, cámbialo a `false`)*

---

### ✅ Paso 5: Iniciar el Backend

```powershell
cd backend\maven-demo
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

**Debería iniciar SIN ERRORES** en: http://localhost:8081

---

### ✅ Paso 6: Iniciar el Frontend

Abre **otra terminal PowerShell**:

```powershell
cd SISAC-ERP\frontend
npm install
npm run dev
```

**Debería iniciar** en: http://localhost:5173

---

## ✅ Verificación Final

Si todo está correcto:

- ✅ Backend corriendo en: http://localhost:8081
- ✅ Frontend corriendo en: http://localhost:5173
- ✅ Base de datos con 32 tablas importadas
- ✅ **Sin errores** de "Table doesn't exist"
- ✅ **Sin errores** de "Unknown column"

---

## 🔧 Solución de Problemas

### ❌ Error: "Table 'sisac_db.convocatoria' doesn't exist"

**Causa**: La base de datos no se importó o Flyway está habilitado y causó conflictos.

**Solución**:
1. Verifica que Flyway esté deshabilitado: `spring.flyway.enabled=false` en `application.properties`
2. Reimporta la base de datos:
```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "DROP DATABASE IF EXISTS sisac_db;"
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < sisac_db_completo_20251210_135130.sql
```

---

### ❌ Error: "Access denied for user 'root'@'localhost'"

**Causa**: Password incorrecto en `application.properties`

**Solución**:
- Edita `backend/maven-demo/src/main/resources/application.properties`
- Cambia `spring.datasource.password=` a tu password real de MySQL

---

### ❌ Error: "Unknown column 'e1_0.id' in 'field list'"

**Causa**: La estructura de la base de datos no coincide con las entidades Java.

**Solución**:
1. Asegúrate de estar usando el archivo SQL correcto: `sisac_db_completo_20251210_135130.sql`
2. Verifica que el código esté en el commit correcto: `git log --oneline -1` debe mostrar `371a98c`
3. Reimporta la base de datos

---

### ❌ Error: "Could not create connection to database server"

**Causa**: MySQL no está corriendo o la URL es incorrecta.

**Solución**:
1. Verifica que MySQL esté corriendo:
```powershell
Get-Service MySQL80
```
2. Si está detenido, inícialo:
```powershell
Start-Service MySQL80
```

---

## 📝 Notas Importantes

- ✅ **La base de datos exportada contiene TODO**: estructura + datos + módulo convocatorias
- ✅ **NO ejecutes las migraciones de Flyway** - Deshabilítalo siempre
- ✅ **El archivo SQL corresponde al commit actual** (371a98c)
- ✅ **Incluye 32 tablas** completas y funcionales
- ✅ **La importación toma solo unos segundos** (archivo de 0.08 MB)

---

## 🚫 NO USAR FLYWAY

Las migraciones V1-V4 fueron diseñadas para **documentar** una BD existente, NO para crearla desde cero.

**Problemas si habilitas Flyway**:
- V2 falla: Intenta eliminar Foreign Keys inexistentes
- V4 falla: Intenta renombrar columnas que ya están correctas
- Conflictos con tablas existentes

**SIEMPRE mantener**: `spring.flyway.enabled=false`

---

## 📞 Contacto

Si tienes problemas siguiendo estos pasos, verifica:
1. El archivo SQL esté en `backend/sisac_db_completo_20251210_135130.sql`
2. MySQL 8.0 esté instalado y corriendo
3. Java 21 esté instalado
4. Node.js esté instalado

**Fecha de última actualización**: 10 Diciembre 2025
**Versión del dump**: sisac_db_completo_20251210_135130.sql
