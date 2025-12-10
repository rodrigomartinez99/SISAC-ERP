# Script para Exportar Base de Datos SISAC-ERP
# Ejecutar este script en el dispositivo FUNCIONAL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EXPORTAR BASE DE DATOS SISAC-ERP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuración
$dbName = "sisac_db"
$dbUser = "root"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

# Verificar si MySQL está disponible
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
if (-not (Test-Path $mysqlPath)) {
    $mysqlPath = "mysqldump"
}

Write-Host "📁 Exportando base de datos..." -ForegroundColor Yellow
Write-Host ""

# Opción 1: Dump completo (con datos)
Write-Host "1️⃣  Exportando BD COMPLETA (con datos)..." -ForegroundColor Green
$outputFile1 = "sisac_db_completo_$timestamp.sql"
& $mysqlPath -u $dbUser -p $dbName > $outputFile1

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Exportado: $outputFile1" -ForegroundColor Green
    $size1 = (Get-Item $outputFile1).Length / 1KB
    Write-Host "   📊 Tamaño: $([math]::Round($size1, 2)) KB" -ForegroundColor Gray
} else {
    Write-Host "   ❌ Error al exportar BD completa" -ForegroundColor Red
}

Write-Host ""

# Opción 2: Solo estructura (sin datos)
Write-Host "2️⃣  Exportando SOLO ESTRUCTURA (sin datos)..." -ForegroundColor Green
$outputFile2 = "sisac_db_estructura_$timestamp.sql"
& $mysqlPath -u $dbUser -p --no-data $dbName > $outputFile2

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Exportado: $outputFile2" -ForegroundColor Green
    $size2 = (Get-Item $outputFile2).Length / 1KB
    Write-Host "   📊 Tamaño: $([math]::Round($size2, 2)) KB" -ForegroundColor Gray
} else {
    Write-Host "   ❌ Error al exportar estructura" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EXPORTACIÓN COMPLETADA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📦 Archivos generados:" -ForegroundColor Yellow
Write-Host "   • $outputFile1 (BD completa con datos)" -ForegroundColor White
Write-Host "   • $outputFile2 (Solo estructura)" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "   1. Copia estos archivos al nuevo dispositivo" -ForegroundColor White
Write-Host "   2. Lee SETUP_OTRO_DISPOSITIVO.md para instrucciones" -ForegroundColor White
Write-Host "   3. Importa el dump en el nuevo dispositivo" -ForegroundColor White
Write-Host ""
