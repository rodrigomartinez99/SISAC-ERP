# SISAC-ERP con Docker

## 🐋 Setup con Docker (RECOMENDADO)

Docker elimina **TODOS** los problemas de configuración. Funciona igual en cualquier dispositivo.

---

## Requisitos

- Docker Desktop instalado ([descargar aquí](https://www.docker.com/products/docker-desktop))
- Git instalado

---

## 🚀 Pasos de Instalación

### 1. Clonar el Repositorio

```powershell
git clone https://github.com/rodrigomartinez99/SISAC-ERP.git
cd SISAC-ERP
git checkout Rodrigo
```

---

### 2. Iniciar Todo con Docker Compose

```powershell
docker-compose up --build
```

**Esto inicia automáticamente**:
- ✅ MySQL 8.0 con la base de datos completa importada
- ✅ Backend Spring Boot en puerto 8081
- ✅ Frontend React en puerto 5173

**Primera vez**: Toma 3-5 minutos (descarga imágenes + compilación)

**Siguientes veces**: Toma 30 segundos

---

### 3. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081
- **MySQL**: localhost:3306 (usuario: root, password: admin)

---

## 🛠️ Comandos Útiles

### Iniciar servicios
```powershell
docker-compose up
```

### Iniciar en segundo plano
```powershell
docker-compose up -d
```

### Detener servicios
```powershell
docker-compose down
```

### Ver logs
```powershell
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo base de datos
docker-compose logs -f mysql
```

### Reconstruir contenedores
```powershell
docker-compose up --build
```

### Reiniciar servicios
```powershell
docker-compose restart
```

### Limpiar todo y empezar de cero
```powershell
# Detener y eliminar contenedores, redes y volúmenes
docker-compose down -v

# Eliminar imágenes creadas
docker-compose down --rmi all

# Iniciar nuevamente
docker-compose up --build
```

---

## 🔍 Verificar que Todo Funciona

### 1. Verificar contenedores corriendo
```powershell
docker-compose ps
```

Deberías ver:
```
NAME              STATUS    PORTS
sisac-mysql       Up        0.0.0.0:3306->3306/tcp
sisac-backend     Up        0.0.0.0:8081->8081/tcp
sisac-frontend    Up        0.0.0.0:5173->5173/tcp
```

### 2. Verificar base de datos
```powershell
docker exec -it sisac-mysql mysql -u root -padmin -e "USE sisac_db; SHOW TABLES;"
```

Deberías ver las 32 tablas, incluyendo:
- convocatoria
- entrevistas
- candidato
- empleados
- etc.

### 3. Probar el backend
```powershell
curl http://localhost:8081/actuator/health
```

Debería responder: `{"status":"UP"}`

---

## 📝 Ventajas de Docker

✅ **No necesitas instalar**:
- MySQL (se ejecuta en contenedor)
- Java 21 (se ejecuta en contenedor)
- Node.js (se ejecuta en contenedor)

✅ **Configuración automática**:
- Base de datos se importa automáticamente
- Variables de entorno configuradas
- Puertos mapeados correctamente

✅ **Funciona igual en**:
- Windows
- Mac
- Linux

✅ **Fácil de limpiar**:
- `docker-compose down -v` elimina todo
- No deja rastros en tu sistema

---

## 🔧 Desarrollo Local (Modificar Código)

### Backend

El código se compila dentro del contenedor. Para ver cambios:

```powershell
# Reconstruir solo el backend
docker-compose up -d --build backend
```

### Frontend

El frontend tiene **hot reload** automático. Solo guarda el archivo y verás los cambios en el navegador.

### Base de Datos

Los datos persisten en un volumen Docker (`mysql_data`). Aunque reinicies los contenedores, los datos se mantienen.

Para **resetear la base de datos**:
```powershell
docker-compose down -v
docker-compose up --build
```

---

## 🐛 Solución de Problemas

### Error: "Port already in use"

**Causa**: Puerto 3306, 8081 o 5173 está ocupado

**Solución**:
```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :3306
netstat -ano | findstr :8081
netstat -ano | findstr :5173

# Detener el proceso o cambiar el puerto en docker-compose.yml
```

### Error: "Cannot connect to Docker daemon"

**Causa**: Docker Desktop no está corriendo

**Solución**:
- Abre Docker Desktop
- Espera a que inicie completamente
- Intenta de nuevo

### Backend no inicia

**Ver logs**:
```powershell
docker-compose logs backend
```

**Reiniciar**:
```powershell
docker-compose restart backend
```

### MySQL no se conecta

**Verificar que esté saludable**:
```powershell
docker-compose ps
```

Si muestra `health: starting`, espera 30 segundos más.

---

## 📊 Comparación: Docker vs Manual

| Aspecto | Manual | Docker |
|---------|--------|--------|
| Instalaciones | MySQL + Java + Node | Solo Docker |
| Configuración | Manual (30 min) | Automática (5 min) |
| Errores comunes | Muchos | Casi ninguno |
| Portabilidad | Depende del SO | Funciona en todos |
| Limpieza | Difícil | `docker-compose down -v` |
| Actualizaciones | Manual | `docker-compose up --build` |

---

## 🎯 Recomendación

**Para desarrollo**: Usa Docker
**Para producción**: Usa Docker + orquestador (Kubernetes, Docker Swarm)

---

## 📞 Próximos Pasos

Una vez que Docker funcione:

1. **Desarrollo local**: Modifica código y verás cambios automáticamente
2. **Compartir**: Solo necesitas compartir el repositorio (Git)
3. **Deployment**: Subir imágenes a Docker Hub o usar CI/CD

---

**Fecha**: 11 Diciembre 2025
**Versión**: Con base de datos completa incluida
