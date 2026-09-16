# Prospect Kompas — lokaal draaien

Deze map bevat de app plus een kleine server die je **op je eigen machine** draait.
De server houdt de API-sleutels vast en geeft aanroepen door aan Company.info en Lusha.
De sleutels komen daardoor nooit in de browser — Company.info schrijft dat zelf voor:

> Never expose them in client-side applications, public repositories, logs, or other
> publicly accessible locations.

## Wat je nodig hebt

Node 18 of nieuwer. Verder niets: geen `npm install`, geen afhankelijkheden.

## Starten

```bash
cd lokaal
cp .env.example .env      # vul je sleutels in
node server.mjs
```

Open daarna **http://127.0.0.1:4321**.

De server luistert bewust alleen op `127.0.0.1`. Hij is dus niet bereikbaar vanaf
je netwerk, ook niet voor collega's op hetzelfde wifi.

## Sleutels

Zet ze in `lokaal/.env`. Dat bestand staat in `.gitignore` en komt nooit in de repo.

| Variabele | Waar vandaan |
|---|---|
| `COMPANYINFO_API_KEY` | De technisch contactpersoon uit de onboarding heeft deze per mail gekregen |
| `LUSHA_API_KEY` | Maak een **nieuwe** aan in je Lusha-account |

Een sleutel die ooit in een chat, mail of document heeft gestaan, is gelekt.
Trek die in en maak een nieuwe aan.

Bij het opstarten zegt de server per bron of de sleutel er is. Hij toont
de sleutel nooit — alleen het aantal tekens, zodat je kunt zien of je per ongeluk
een lege of afgekapte waarde hebt geplakt.

## Wat werkt er nu

| | |
|---|---|
| Klantenlijst inlezen (.xlsx of .csv) | werkt, ook zonder server |
| Naam zoeken en de accountmanager tonen | werkt, ook zonder server |
| Demo-dossiers, vragenset, mails | werkt, ook zonder server |
| API-verkenner | alleen lokaal, met sleutel |
| Concernstructuur, signalen en contactpersonen uit de API | **nog niet** — zie hieronder |

## De volgende stap: eindpunten vinden

Van Lusha weten we de eindpunten uit hun documentatie:

- `POST v3/companies/prospecting`
- `POST v3/contacts/prospecting`

Van Company.info nog niet. Hun documentatie-index staat op
`https://docs.company.info/llms.txt`. Zoek daar het eindpunt dat de
**concernstructuur** teruggeeft (holding, werkmaatschappijen, vestigingen).

Gebruik de **API-verkenner** op het startscherm om een pad uit te proberen:
kies de bron, vul het pad in, druk op Aanroepen. Je ziet de ruwe respons,
inclusief foutmeldingen van de leverancier zelf.

Zodra je weet welk eindpunt de juiste gegevens geeft, bouwen we dat in het dossier in.

## Problemen

| Wat je ziet | Wat het betekent |
|---|---|
| `✗ geen sleutel` bij het opstarten | `.env` ontbreekt of de variabele is leeg |
| 401 van de leverancier | Verkeerde headernaam — pas `LUSHA_HEADER` of `COMPANYINFO_HEADER` aan |
| 403 van de leverancier | Sleutel klopt, maar mag dit eindpunt niet — vraag je leverancier |
| `Kon ... niet bereiken` | Netwerk, VPN of bedrijfsproxy blokkeert de verbinding |

## Let op

Alles staat in het geheugen. Sluit je de pagina, dan is je klantenlijst weg en
begin je schoon. Er wordt niets opgeslagen — geen database, geen bestanden, geen
browseropslag.
