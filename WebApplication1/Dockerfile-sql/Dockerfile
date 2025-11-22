FROM mcr.microsoft.com/windows/servercore:ltsc2022

LABEL maintainer="Joshua"

# Variables de entorno
ENV SA_PASSWORD=Jos95123!
ENV ACCEPT_EULA=Y

# Ruta oficial de SQL Server Express 2017
ENV SQL_EXPRESS_URL=https://go.microsoft.com/fwlink/?linkid=829176

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Copia el script SQL y el script de inicio
COPY midb.sql C:/setup/midb.sql
COPY start.ps1 C:/setup/start.ps1
WORKDIR C:/setup

# Descarga e instala SQL Server Express
RUN Invoke-WebRequest -Uri $env:SQL_EXPRESS_URL -OutFile sqlexpress.exe ; \
    Start-Process -Wait -FilePath .\sqlexpress.exe -ArgumentList /qs, /x:setup ; \
    .\setup\setup.exe /q /ACTION=Install /INSTANCENAME=SQLEXPRESS /FEATURES=SQLEngine /UPDATEENABLED=0 /SQLSVCACCOUNT='NT AUTHORITY\System' /SQLSYSADMINACCOUNTS='BUILTIN\ADMINISTRATORS' /TCPENABLED=1 /NPENABLED=0 /IACCEPTSQLSERVERLICENSETERMS ; \
    Remove-Item -Recurse -Force sqlexpress.exe, setup

# Configura puerto TCP fijo y autenticación SQL
RUN Stop-Service MSSQL`$SQLEXPRESS ; \
    Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql14.SQLEXPRESS\mssqlserver\supersocketnetlib\tcp\ipall' -Name tcpdynamicports -Value '' ; \
    Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql14.SQLEXPRESS\mssqlserver\supersocketnetlib\tcp\ipall' -Name tcpport -Value 1433 ; \
    Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql14.SQLEXPRESS\mssqlserver' -Name LoginMode -Value 2

# Comando de inicio
CMD ["powershell", "-ExecutionPolicy", "Bypass", "-File", "C:\\setup\\start.ps1"]