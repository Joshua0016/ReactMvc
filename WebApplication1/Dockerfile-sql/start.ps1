# 1. Esperar hasta que SQL Server esté listo
$timeout = 120
$elapsed = 0
$ready = $false

Write-Host "Esperando que SQL Server Express esté disponible..."

while ($elapsed -lt $timeout -and -not $ready) {
    # Intentar conectarse a la instancia nombrada SQLEXPRESS usando la Autenticación de Windows (-E)
    try {
        & sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT 1" -h -1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $ready = $true
            Write-Host "✅ SQL Server Express está listo."
        }
    } catch {}

    if (-not $ready) {
        Write-Host "SQL no está listo. Esperando 5 segundos..."
        Start-Sleep -Seconds 5
        $elapsed += 5
    }
}

if (-not $ready) {
    Write-Error "🛑 Tiempo de espera agotado. SQL Server no arrancó a tiempo."
    exit 1
}

# 2. Configurar login 'sa'
Write-Host "Configurando login 'sa'..."
# Habilitar el login 'sa'
& sqlcmd -S localhost\SQLEXPRESS -E -Q "ALTER LOGIN sa ENABLE"
# Asignar la contraseña usando la variable de entorno
& sqlcmd -S localhost\SQLEXPRESS -E -Q "ALTER LOGIN sa WITH PASSWORD = '$env:SA_PASSWORD'"
Write-Host "✅ Login 'sa' habilitado."

# 3. Crear la base 'midb' si no existe
Write-Host "Verificando existencia y creando la base 'midb'..."
# Usamos autenticación SQL para este paso ya que 'sa' ya está configurado.
& sqlcmd -S localhost\SQLEXPRESS -U sa -P "$env:SA_PASSWORD" -Q "IF DB_ID('midb') IS NULL CREATE DATABASE midb;" -b

# 4. Ejecutar script de inicialización: Crear Tablas e Insertar Datos
# NOTA: Ejecutamos el script SIEMPRE en el contexto de 'midb' (-d midb)
# y forzamos la codificación UTF-8 (-f 65001) para manejar los acentos de los INSERTs.
Write-Host "Ejecutando script de inicialización en 'midb' (con UTF-8)..."

& sqlcmd -S localhost\SQLEXPRESS -U sa -P "$env:SA_PASSWORD" -d midb -i "C:\setup\midb.sql" -b -f 65001

if ($LASTEXITCODE -ne 0) {
    Write-Error "🛑 Error crítico al ejecutar midb.sql. La tabla sigue vacía."
    exit 1
}

Write-Host "✅ Base de datos 'midb' lista y poblada."

# 5. Mantener el contenedor vivo
Write-Host "✨ Configuración completada. Contenedor en modo mantenimiento..."
while ($true) { Start-Sleep -Seconds 3600 }