#!/bin/bash
# Dubbelklik dit bestand om Prospect Kompas te starten (macOS en Linux).
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  Node is niet gevonden."
  echo "  Installeer het via https://nodejs.org en probeer opnieuw."
  echo ""
  read -r -p "  Druk op Enter om te sluiten." _
  exit 1
fi
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "  .env aangemaakt. Zet je Lusha-sleutel erin voor de contactpersonen."
  echo ""
fi
node server.mjs
read -r -p "  Gestopt. Druk op Enter om te sluiten." _
