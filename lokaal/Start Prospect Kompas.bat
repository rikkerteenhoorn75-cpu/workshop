@echo off
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
if not exist .env (
  copy .env.example .env >nul
  echo.
  echo   .env aangemaakt. Zet je Lusha-sleutel erin voor de contactpersonen.
  echo.
)
node server.mjs
pause
