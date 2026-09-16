# Prospect Kompas

Een gespreksvoorbereidingstool voor new business in het grootzakelijke telecomdomein (Nederland).

De strategie staat in [STRATEGY.md](STRATEGY.md). Dit document werkt fase 1 uit en is leidend
voor de bouw.

## Waarom

De gebruiker is accountmanager grootzakelijk bij VodafoneZiggo en richt zich op new business:
accounts die nu geen of nauwelijks omzet doen. Klantstructuren zijn ondoorzichtig en de informatie
ligt verspreid over meerdere tools (Company.info, Lusha, de eigen klantenlijst).

**De winst is inhoudelijk, niet temporeel.** Het doel is niet sneller voorbereiden maar *verder
komen in het gesprek*: met betere vragen binnenkomen, die laten merken dat je de organisatie
doorgrondt. Tijdwinst is bijvangst.

Gebruik gebeurt in een **wekelijks voorbereidingsblok**: meerdere accounts achter elkaar. Diepte
en doorklikken mogen; het hoeft niet in vijf seconden te landen.

Eerst voor de gebruiker zelf, later mogelijk voor het team, en uiteindelijk moet de prospect er
ook profijt van hebben in de vorm van scherpere inzichten.

## Bouwfases

| Fase | Wat | Status |
|---|---|---|
| **1** | **Klikbare front-endmockup met fictieve data** — het hele verhaal doorlopen zonder één regel backend | in aanbouw |
| 2 | Witte Vlek Radar als voorportaal: kaart van NL met potentieelscores en filters, die prospects áán het dossier levert | later |
| 3 | Echte data, read-only: koppelingen met Company.info, Lusha en de klantenlijst; de bronlabels uit fase 1 worden echte endpoints | later |
| 4 | Eigen status vasthouden: shortlist, verstuurd-status en opvolgtaken die blijven staan — dus opslag en inlog | later |
| 5 | Teamversie: gedeelde shortlist, zichtbaarheid wie welk account al benadert, overzicht richting management | later |
| 6 | Waarde terug naar de klant: inzichten uit het dossier gebundeld tot iets dat met een prospect gedeeld kan worden | later |

Fases 2 t/m 6 staan bewust op hoofdlijnen. Ze worden pas uitgewerkt als fase 1 staat en duidelijk
is wat er in de praktijk van gebruikt wordt.

---

# Fase 1 — klikbare front-endmockup

## Resultaat

Eén gepubliceerde webpagina met een deelbare link, te openen op laptop en telefoon. De hele flow
is klikbaar en voelt als een werkend product, maar er zit niets achter.

De demo is een **eerlijke eigen proef**, geen verkooppraatje: hij moet standhouden op een account
dat de gebruiker volgende week echt belt.

## Kaders — wat er expliciet NIET in zit

- Geen backend, API of database.
- Geen echte bedrijfs- of persoonsgegevens. Alles fictief, en zichtbaar als zodanig gemarkeerd.
- Geen inlog, accounts of betalingen.
- **Geen blijvende opslag, ook geen `localStorage` of `sessionStorage`.** Alle status (shortlist,
  selecties, verstuurd-markeringen, bewerkte mailteksten) leeft in het geheugen van de pagina en
  is weg na een verversing. Voor een mockup is dat precies goed: elke demo begint schoon.
- Geen echte mail versturen. "Markeer als verstuurd" verandert alleen de weergave; "Kopieer mail"
  zet tekst op het klembord.

## Gebruikersflow

Zoeken → dossier → vragenset → contactpersonen → mail.

## Schermen en onderdelen

**1. Startscherm — zoeken**
- Zoekbalk over bedrijfsnaam, plaats, KvK-nummer en branche, met live resultatenlijst.
- Vier volledig uitgewerkte dossiers als kaarten, met status (witte vlek / deels klant / klant),
  omvang en een regel waarom dit account interessant is.
- Een reeks "beperkte" accounts in de zoekresultaten, zodat zoeken echt aanvoelt; herkenbaar
  gelabeld, zonder dood spoor.
- Shortlist-sectie (binnen de sessie).

**2. Dossier**
- **Kop:** naam, KvK, plaats, medewerkers, SBI-code, statusbadge, en de acties Shortlist /
  Vragenset / Stel mails op.
- **Concernstructuur:** uitklapbare boom van holding → werkmaatschappijen → vestigingen, met per
  entiteit een statuskleur. Klikken op een dochteronderneming laadt het dossier voor die entiteit,
  met een kruimelpad terug. Dit is het stuk dat vandaag drie tools kost.
- **Onze positie:** ARR, aantal actieve entiteiten van het totaal, contractregel met afloopdatum,
  en een gesegmenteerde dekkingsbalk met legenda (klant / deels / witte vlek).
- **Haakjes & signalen:** tijdlijn met vacatures, uitbreidingen, overnames, aanbestedingen en
  directiewissels — elk met datum en bronvermelding. Dit is de voedingsbodem voor de vragenset.
- **Bronlabels** bij elk blok (Company.info · Lusha · Klantenlijst · TenderNed · CRM) die
  markeren waar in fase 3 de echte koppeling inprikt.

**3. Vragenset — het hart**
- Acht à tien **scherpe gespreksvragen** per account: munitie om mee binnen te komen, geen
  stellingen om voor te lezen. Ze moeten de klant aan het praten krijgen en laten merken dat je je
  hebt verdiept.
- Elke vraag toont de **aanleiding** waar hij uit voortkomt — een signaal uit de tijdlijn of een
  gat in de concernstructuur — zodat duidelijk is wáárom je hem stelt.
- **Filter op rol** (beslisser / beïnvloeder / gebruiker / poortwachter): je stelt een CFO andere
  vragen dan een IT-manager.
- Te kopiëren als platte tekst voor notitieblok of CRM, samen met de kerngegevens van het account.
  Dit vervangt de eerdere "briefing met vijf gesprekspunten".

**4. DMU & Outreach Studio**
- Contactpersonen met rol, label (beslisser / beïnvloeder / gebruiker / poortwachter), mail,
  telefoon, een kenmerkende notitie en een statusbolletje.
- Vink personen aan en stel in één keer mails op.
- Vier invalshoeken: kostenbesparing & bundeling, groei & schaalbaarheid, continuïteit & security,
  verduurzaming.
- Per ontvanger een eigen tab met onderwerp en body, afgestemd op de rol: de financieel
  verantwoordelijke leest over TCO, de IT-manager over uitrol en beheer, inkoop over het proces.
- Onderwerp en tekst ter plekke bewerkbaar; knoppen: Kopieer mail, Markeer als verstuurd, Herstel
  voorbeeldtekst. Markeren als verstuurd laat het statusbolletje in het dossier omspringen en zet
  een opvolgtaak neer.
- Een afzenderveld, zodat de ondertekening klopt tijdens een demo.

## Demo-data

Vier volledig uitgewerkte prospects, één per sector, elk met concernstructuur, omzetpositie,
signalen, contactpersonen en **vragenset**:

- **Van Oordt Logistics Group** (logistiek, Tilburg, 1.430 mdw) — deels klant, 12 entiteiten,
  complexe structuur, aflopend mobiel contract.
- **Helder Zorggroep** (zorg, Utrecht, 3.200 mdw) — volledig witte vlek, aanbesteding op komst.
- **Nordkamp Retail Holding** (retail, Zwolle, 890 mdw) — concurrentcontract loopt af.
- **Ravenstein Techniek Groep** (industrie, Apeldoorn, 1.150 mdw) — witte vlek, 280
  buitendienstmonteurs, recente netwerkstoring.

Plus ongeveer achttien accounts die alleen in de zoekresultaten verschijnen.

Alle bedrijven, personen, contactgegevens en cijfers zijn **fictief**.

## Techniek

Eén HTML-bestand, gepubliceerd als Artifact. IBM Plex Sans / Serif / Mono, tokengebaseerd
kleurenschema dat in licht en donker werkt, geen externe libraries. Alle status in één
`state`-object in het geheugen. Werkt vanaf ongeveer 390px breedte zonder horizontaal scrollen.

## Hoe we beoordelen of fase 1 werkt

**De doorlooptest — vijf minuten, zonder uitleg vooraf.** Fase 1 is geslaagd als dit in één keer
lukt zonder vast te lopen:

1. Zoek op "Ravenstein" en open het dossier.
2. Lees in tien seconden af: hoeveel entiteiten, hoeveel daarvan klant, welk signaal het meest
   urgent is.
3. Klik een dochteronderneming in de boom aan en ga via het kruimelpad terug naar de holding.
4. Open de vragenset, filter op één rol, en kopieer de vragen.
5. Vink twee personen met verschillende rollen aan en open de Outreach Studio.
6. Wissel van invalshoek en zie de tekst veranderen; wissel van persoon en zie dat de toon
   verschilt.
7. Markeer één mail als verstuurd, sluit de studio, en zie het statusbolletje en de opvolgtaak in
   het dossier.

**Inhoudelijke criteria** (deze wegen het zwaarst — de winst is inhoudelijk)
- De vragen zijn goed genoeg om daadwerkelijk te stellen: ze klinken niet als een checklist en
  laten merken dat je je hebt verdiept.
- Bij elke vraag is duidelijk waar hij vandaan komt, zodat je hem kunt onderbouwen als de klant
  doorvraagt.
- De concernstructuur geeft sneller antwoord op "wie hoort bij wie en wat doen we daar al" dan de
  huidige werkwijze met meerdere tools.
- De mails zijn zonder herschrijven herkenbaar als iets dat je zelf zou versturen.
- Het verschil tussen de mail aan een financieel verantwoordelijke en die aan een IT-manager is in
  één oogopslag zichtbaar.

**Technische criteria**
- Geen console- of pageerrors.
- Geen horizontale overflow op 390px breedte.
- Na een harde verversing is de pagina schoon: geen shortlist, geen selecties, geen
  verstuurd-markeringen. Dat bewijst dat er niets wordt opgeslagen.
- Leesbaar in zowel licht als donker thema.

## Stand van zaken

Gebouwd en gepubliceerd: startscherm, dossier (structuur, positie, signalen) en DMU & Outreach
Studio. Nog te bouwen: de **vragenset** — per demo-account acht à tien vragen, elk gekoppeld aan
een aanleiding en een rol, plus het scherm en het rolfilter. De bestaande briefing met vijf
gesprekspunten wordt daardoor vervangen.
