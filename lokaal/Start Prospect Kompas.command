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

[ -f .env ] || cp .env.example .env

# Sleutel ontbreekt? Vraag hem hier, dan hoef je geen bestand te bewerken.
if ! grep -qE '^LUSHA_API_KEY=.+' .env; then
  echo ""
  echo "  Contactpersonen ophalen vraagt een Lusha-sleutel."
  echo "  Maak er een aan in je Lusha-account onder API."
  echo "  Laat leeg als je de app zonder contactpersonen wilt gebruiken."
  echo ""
  read -r -p "  Lusha-sleutel: " SLEUTEL
  SLEUTEL="$(printf '%s' "$SLEUTEL" | tr -d '[:space:]')"
  if [ -n "$SLEUTEL" ]; then
    # tijdelijk bestand in dezelfde map: sed -i verschilt tussen macOS en Linux
    grep -v '^LUSHA_API_KEY=' .env > .env.tmp
    printf 'LUSHA_API_KEY=%s\n' "$SLEUTEL" >> .env.tmp
    mv .env.tmp .env
    chmod 600 .env
    echo "  Opgeslagen in .env. Dat bestand blijft op deze computer."
    echo ""
  fi
fi

node server.mjs
read -r -p "  Gestopt. Druk op Enter om te sluiten." _
