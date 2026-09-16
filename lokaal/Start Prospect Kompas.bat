@echo off
setlocal enabledelayedexpansion
rem Dubbelklik dit bestand om Prospect Kompas te starten (Windows).
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node is niet gevonden.
  echo   Installeer het via https://nodejs.org en probeer opnieuw.
  echo.
  pause
  exit /b 1
)

if not exist .env copy .env.example .env >nul

rem Sleutel ontbreekt? Vraag hem hier, dan hoef je geen bestand te bewerken.
set HEEFT=
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
  if /i "%%A"=="LUSHA_API_KEY" if not "%%B"=="" set HEEFT=1
)
if not defined HEEFT (
  echo.
  echo   Contactpersonen ophalen vraagt een Lusha-sleutel.
  echo   Maak er een aan in je Lusha-account onder API.
  echo   Laat leeg als je de app zonder contactpersonen wilt gebruiken.
  echo.
  set /p SLEUTEL="  Lusha-sleutel: "
  if not "!SLEUTEL!"=="" (
    findstr /v /b /i "LUSHA_API_KEY=" .env > .env.tmp
    echo LUSHA_API_KEY=!SLEUTEL!>> .env.tmp
    move /y .env.tmp .env >nul
    echo   Opgeslagen in .env. Dat bestand blijft op deze computer.
    echo.
  )
)

node server.mjs
pause
