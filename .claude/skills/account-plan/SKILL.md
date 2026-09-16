---
name: account-plan
description: Stel een accountplan op voor één bedrijf of concern in het grootzakelijke new business-domein. Combineert de Company.info-export (concernstructuur), de AM-lijst (wie is verantwoordelijk) en Lusha (contactpersonen) tot één plan met ingangen, gespreksvragen en een aanpak. Gebruik dit wanneer iemand vraagt om een accountplan, een accountvoorbereiding, een plan voor een prospect, of "wat gaan we doen met <bedrijf>".
---

# Accountplan

Maak één plan voor één concern. Geen marktanalyse, geen algemene verkooppraat:
alles in het plan moet herleidbaar zijn tot een waarneming uit de data.

## Wat je nodig hebt

Zoek in deze volgorde, en ga verder met wat je vindt:

1. **Company.info-export** (`.xlsx`) — de concernstructuur. Herkenbaar aan de
   kolommen `KVK/ID`, `Vennootschapsnaam` en `Ultimate Parent`. Vraag de gebruiker
   het bestand te delen als het er niet is; zonder deze bron is er geen structuur
   en dus geen plan.
2. **AM-lijst** (`.xlsx`, twee kolommen: accountmanager, accountnaam) — wie het
   account bezit. Optioneel.
3. **Lusha** — contactpersonen. Alleen als de connector beschikbaar is
   (`mcp__Lusha__*`). Controleer eerst `account_usage`; die kost geen credits.

Gebruik nooit verzonnen bedrijfsgegevens, namen of functies. Ontbreekt iets, dan
staat dat als open punt in het plan.

## Namen koppelen

De twee bestanden schrijven namen verschillend. Volg deze regels; ze zijn op deze
data getest en de afwijkingen kosten precisie:

1. Normaliseer: kleine letters, accenten weg, punten en vraagtekens weg **vóór**
   het splitsen (anders wordt `N.V.` twee losse letters), rechtsvormen eruit.
2. Haal standaardwoorden weg — woorden die in veel namen voorkomen (`stichting`,
   `holding`, `nederland`, `group`, `services`). Zonder die stap lijkt elke
   "Stichting Administratiekantoor X" op elke andere.
3. Vergelijk wat overblijft op tekenniveau (bigrammen), niet per woord. Per woord
   vergelijken maakt van "BP Europa" een match met "Power-Packer Europa".
4. Drempels: identiek = exact, ≥ 0,88 = sterke gelijkenis, ≥ 0,75 = **controleren**,
   daaronder geen koppeling.

Een koppeling onder 0,88 noem je in het plan expliciet "te controleren", met het
percentage en de naam waarmee is gekoppeld. Presenteer zo'n koppeling nooit als feit.

## Lusha gebruiken

Zoek contactpersonen met `prospecting_contact_search` op `companyNames` en
`countries: ["NL"]`. Geldige `senioritiesLabels`: `c-suite`, `vice president`,
`director`, `manager`, `partner`, `founder`, `senior`, `entry`, `intern`,
`non-manager`.

Haal **geen** e-mailadressen en telefoonnummers op. Een zoekopdracht kost 1 credit
per 25 resultaten; een e-mail kost 1 credit per contact en een telefoonnummer 5.
Voor een plan is naam, functie en afdeling genoeg.

Vertaal afdeling en niveau naar de rol die in het gesprek telt:

| Signaal | Rol |
|---|---|
| c-suite, founder, owner | beslisser |
| finance, accounting, controlling | budget |
| purchasing, procurement, inkoop | poortwachter |
| information technology, engineering | beïnvloeder |
| operations, facilitair, logistiek | gebruiker |

## Het plan

Schrijf in het Nederlands, zakelijk, zonder opsmuk. Deze zeven delen:

**1. Kern** — naam, KvK, hoofdvestiging, aantal medewerkers, branche. Drie regels.

**2. Concernstructuur** — rechtspersonen en vestigingen. Let op: meerdere rijen met
dezelfde naam zijn vestigingen van één rechtspersoon, geen aparte bedrijven. Voeg
die samen en noem beide getallen.

**3. Onze positie** — wie is de accountmanager, of niemand. Bij een niet-exacte
koppeling: de zekerheid erbij. Zonder omzetgegevens gaat dit deel over
eigenaarschap en dekking, niet over cijfers.

**4. Ingangen** — de contactpersonen per rol. Wie is beslisser, wie beïnvloedt,
wie bewaakt het budget, wie is poortwachter. Ontbreekt Lusha, dan benoem je welke
rollen je zoekt in plaats van namen te verzinnen.

**5. Gespreksvragen** — acht à tien, elk met de waarneming eronder waar hij uit
volgt. Open vragen die de klant aan het praten krijgen, geen checklist. Leid ze af
uit de structuur: aantal entiteiten, spreiding over plaatsen, buitenlandse moeder,
recent opgerichte of overgenomen entiteit, failliete entiteit, meer geregistreerde
dochters dan zichtbaar. Filterbaar per rol: een CFO krijgt andere vragen dan een
IT-manager.

**6. Conceptmails** — twee of drie mails, klaar om te versturen na een laatste
eigen redactieslag. Zie *Mails schrijven* hieronder.

**7. Aanpak** — wie benader je eerst en waarom, met welke invalshoek, en wat de
logische tweede stap is.

**8. Open punten** — wat je niet weet en waar dat vandaan zou moeten komen. Wees
hier concreet: "geen omzetgegevens in deze bronnen" is bruikbaar, "meer onderzoek
nodig" niet.

## Mails schrijven

Kies **één invalshoek voor het hele plan** en onderbouw die keuze in één zin.
Vier smaken: kostenbesparing en bundeling, groei en schaalbaarheid, continuïteit
en security, verduurzaming. Laat de structuur de keuze maken — bij veel
vestigingen of een tijdkritisch proces is continuïteit geloofwaardiger dan prijs,
bij een versnipperd concern juist bundeling.

Elke mail heeft dezelfde vier delen:

1. **Aanhef** met de voornaam.
2. **Opening**: één waarneming uit de data, geen complimenten en geen inleiding
   over onszelf. "In het handelsregister zag ik dat …" werkt; "Graag stel ik mij
   voor" niet.
3. **Kern**, afgestemd op de rol:

   | Rol | Waar de mail over gaat |
   |---|---|
   | beslisser | wat het op groepsniveau oplevert, in één alinea, zonder techniek |
   | budget | wat het kost en wat er te besparen valt; beheer telt zwaarder dan het abonnement |
   | beïnvloeder | hoe het technisch werkt en wat het aan beheerlast scheelt |
   | gebruiker | wat er in het dagelijks werk verandert |
   | poortwachter | een vraag over het proces, niet over het product |

4. **Afsluiting**: één concrete vraag. Een half uur, een terugbelverzoek, of een
   vraag naar de route. Geen "ik neem contact op".

Schrijf de mails **verschillend**. Krijgen twee mensen dezelfde tekst met een
andere naam erboven, dan is het plan mislukt — dat is precies het handwerk dat
deze skill moet wegnemen.

Ondertekenen met de naam van de accountmanager uit de AM-lijst. Zet er geen
telefoonnummer of e-mailadres van de ontvanger in; die zijn niet opgehaald.

## Opleveren

Lever het plan als **HTML-bestand** dat de gebruiker lokaal in zijn browser opent.
Gebruik `sjabloon.html` uit deze map: neem het over, vul de `{{PLAATSHOUDERS}}` in
en haal de secties weg waarvoor je geen gegevens hebt. De opmaak staat al in het
sjabloon — daar hoef je niets aan te veranderen, zodat elk plan er hetzelfde uitziet.

Het sjabloon werkt in licht en donker thema, op telefoonbreedte, en print netjes.

**Publiceer het plan niet als artifact.** Er staan namen en functies van echte
mensen in en dat zijn persoonsgegevens. Stuur het bestand naar de gebruiker en
commit het niet naar de repo. Wil iemand toch een deelbare versie, laat dan de
contactpersonen eruit.

Lever daarnaast dezelfde inhoud als `.md`-bestand, zodat het in een CRM geplakt
kan worden.

## Grenzen

- Verzin niets. Geen signalen, geen contactpersonen, geen cijfers.
- Beweer nooit dat een account "witte vlek" is op basis van afwezigheid in de
  AM-lijst; dat betekent alleen dat de naam er niet in staat.
- Eén plan per keer. Vraagt iemand om twintig accounts, stel dan voor eerst één te
  maken en die te beoordelen.
