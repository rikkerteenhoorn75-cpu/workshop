# Prospect Kompas — lokaal draaien

Deze map bevat de app plus een kleine server die je **op je eigen machine** draait.
De server houdt de API-sleutels vast en geeft aanroepen door aan Company.info en Lusha.
De sleutels komen daardoor nooit in de browser — Company.info schrijft dat zelf voor:

> Never expose them in client-side applications, public repositories, logs, or other
> publicly accessible locations.

## Wat je nodig hebt

Node 18 of nieuwer. Verder niets: geen `npm install`, geen afhankelijkheden.

## Starten

**Dubbelklik de starter in deze map:**

| Jouw computer | Bestand |
|---|---|
| Mac of Linux | `Start Prospect Kompas.command` |
| Windows | `Start Prospect Kompas.bat` |

De starter controleert of Node aanwezig is, maakt bij de eerste keer je `.env`
aan, start de server en opent je browser. Meer hoef je niet te doen.

> Op een Mac kan de eerste keer een waarschuwing verschijnen omdat het bestand
> van internet komt. Rechtsklik → Openen → Openen, dan onthoudt hij het.

Liever vanaf de opdrachtregel:

```bash
cd lokaal
cp .env.example .env
node server.mjs
```

Open dan **http://127.0.0.1:4321**.

De server luistert bewust alleen op `127.0.0.1`. Hij is dus niet bereikbaar vanaf
je netwerk, ook niet voor collega's op hetzelfde wifi.

## Als app installeren

Open http://127.0.0.1:4321 in Chrome of Edge en klik op het installatie-icoon in
de adresbalk (of menu → Installeren). Prospect Kompas komt dan in je dock of
taakbalk te staan en opent in een eigen venster, zonder adresbalk en tabbladen.

De starter moet wel draaien: het blijft een lokale app, geen website.

Afsluiten doe je door het startervenster te sluiten.

## Sleutels

**De starter vraagt je Lusha-sleutel de eerste keer zelf.** Plakken, Enter, klaar.
Hij slaat hem op in `lokaal/.env` met rechten 600 en vraagt er daarna niet meer om.
Laat je het veld leeg, dan werkt de app gewoon zonder contactpersonen.

Handmatig kan ook: zet ze in `lokaal/.env`. Dat bestand staat in `.gitignore` en
komt nooit in de repo.

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
| Company.info-export inlezen: concerns, structuur, afgeleide vragen | werkt, ook zonder server |
| Contactpersonen ophalen bij Lusha | alleen lokaal, met `LUSHA_API_KEY` |
| Concernstructuur en signalen live uit Company.info | **nog niet** — zie hieronder |

## Contactpersonen ophalen

Open een concern uit je Company.info-export en klik **Haal contactpersonen op**.
De server bevraagt Lusha (`POST /v3/contacts/prospecting`) en vertaalt de uitkomst
naar de rollen die in het gesprek tellen: beslisser, budget, beïnvloeder,
gebruiker, poortwachter. Daarna kun je direct mails opstellen.

Kosten: 1 credit per 25 resultaten. E-mailadressen en telefoonnummers worden
**niet** opgehaald — die kosten 1 respectievelijk 5 credits per contact.

Getest tegen een nagebouwde Lusha-respons, niet tegen de echte API. De
verzoekstructuur en de geldige seniority-waarden komen uit een echte foutmelding
van Lusha. Werkt het niet, dan staat de ruwe respons in het antwoord onder `ruw`.

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
