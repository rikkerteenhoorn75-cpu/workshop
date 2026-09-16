#!/usr/bin/env node
/* Prospect Kompas - lokale server
 *
 * Draait alleen op je eigen machine (127.0.0.1). Houdt de API-sleutels vast en
 * geeft aanroepen door aan Company.info en Lusha, zodat de sleutels nooit in de
 * browser terechtkomen. Company.info schrijft dat zelf voor:
 * "Never expose them in client-side applications."
 *
 * Geen afhankelijkheden - alleen wat Node zelf meebrengt.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PUBLIEK = path.join(HIER, "public");
const POORT = Number(process.env.PORT || 4321);

/* ---------- .env inlezen (geen dotenv nodig) ---------- */
function leesEnv(){
  const bestand = path.join(HIER, ".env");
  if(!fs.existsSync(bestand)) return {};
  const uit = {};
  for(const regel of fs.readFileSync(bestand, "utf8").split(/\r?\n/)){
    const schoon = regel.trim();
    if(!schoon || schoon.startsWith("#")) continue;
    const i = schoon.indexOf("=");
    if(i < 0) continue;
    uit[schoon.slice(0, i).trim()] = schoon.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return uit;
}
const env = { ...leesEnv(), ...process.env };

const BRONNEN = {
  companyinfo: {
    naam: "Company.info",
    basis: env.COMPANYINFO_BASE || "https://api.company.info",
    sleutel: env.COMPANYINFO_API_KEY || "",
    header: env.COMPANYINFO_HEADER || "X-API-Key",
    accept: "application/vnd.api+json"
  },
  lusha: {
    naam: "Lusha",
    basis: env.LUSHA_BASE || "https://api.lusha.com",
    sleutel: env.LUSHA_API_KEY || "",
    header: env.LUSHA_HEADER || "api_key",
    accept: "application/json"
  }
};

/* ---------- hulpjes ---------- */
const TYPES = {".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8",
  ".svg":"image/svg+xml", ".png":"image/png", ".ico":"image/x-icon"};

function json(res, code, data){
  const body = JSON.stringify(data, null, 2);
  res.writeHead(code, {"content-type":"application/json; charset=utf-8",
    "content-length":Buffer.byteLength(body), "cache-control":"no-store"});
  res.end(body);
}

function leesBody(req){
  return new Promise((klaar, fout) => {
    const stukken = [];
    let lengte = 0;
    req.on("data", d => {
      lengte += d.length;
      if(lengte > 1_000_000){ fout(new Error("Verzoek te groot")); req.destroy(); return; }
      stukken.push(d);
    });
    req.on("end", () => klaar(Buffer.concat(stukken).toString("utf8")));
    req.on("error", fout);
  });
}

/* Alleen paden onder de vaste basis-URL. Voorkomt dat de browser deze server
   met jouw sleutel naar een willekeurige host laat praten. */
function veiligPad(ruw){
  const p = decodeURIComponent(ruw || "");
  if(!p || p.includes("://") || p.startsWith("//") || p.includes("..")) return null;
  return p.replace(/^\/+/, "");
}

/* ---------- doorgeefluik ---------- */
async function doorgeven(bronId, restPad, req, res){
  const bron = BRONNEN[bronId];
  if(!bron) return json(res, 404, {fout:"Onbekende bron: " + bronId});
  if(!bron.sleutel){
    return json(res, 503, {
      fout: bron.naam + "-sleutel ontbreekt",
      oplossing: "Zet " + bronId.toUpperCase() + "_API_KEY in lokaal/.env en herstart de server."
    });
  }
  const pad = veiligPad(restPad);
  if(pad === null) return json(res, 400, {fout:"Ongeldig pad"});

  const url = new URL(bron.basis.replace(/\/+$/, "") + "/" + pad);
  const vraag = new URL(req.url, "http://localhost");
  vraag.searchParams.forEach((v, k) => url.searchParams.append(k, v));

  const body = ["GET","HEAD"].includes(req.method) ? undefined : await leesBody(req);
  const koppen = {[bron.header]: bron.sleutel, "accept": bron.accept};
  if(body) koppen["content-type"] = "application/json";

  const afbreker = AbortSignal.timeout(Number(env.TIMEOUT_MS || 20000));
  const begin = Date.now();
  try{
    const antwoord = await fetch(url, {method:req.method, headers:koppen, body, signal:afbreker});
    const tekst = await antwoord.text();
    const duur = Date.now() - begin;
    /* let op: url zonder sleutel loggen - de sleutel zit in een header, niet in de url */
    console.log(`  ${req.method} ${bron.naam} /${pad} -> ${antwoord.status} (${duur}ms)`);
    res.writeHead(antwoord.status, {
      "content-type": antwoord.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "no-store"
    });
    res.end(tekst);
  }catch(e){
    const duur = Date.now() - begin;
    console.log(`  ${req.method} ${bron.naam} /${pad} -> MISLUKT (${duur}ms): ${e.message}`);
    json(res, 502, {
      fout: "Kon " + bron.naam + " niet bereiken",
      detail: e.message,
      hint: e.name === "TimeoutError"
        ? "Time-out. Zit je achter een bedrijfsproxy of VPN?"
        : "Controleer je internetverbinding en of " + url.host + " bereikbaar is vanaf deze machine."
    });
  }
}

/* ---------- statische bestanden ---------- */
function statisch(req, res, pad){
  const doel = path.join(PUBLIEK, pad === "/" ? "index.html" : pad);
  if(!doel.startsWith(PUBLIEK)) { res.writeHead(403); return res.end("Verboden"); }
  fs.readFile(doel, (e, data) => {
    if(e){ res.writeHead(404, {"content-type":"text/plain; charset=utf-8"}); return res.end("Niet gevonden"); }
    res.writeHead(200, {"content-type": TYPES[path.extname(doel)] || "application/octet-stream",
      "cache-control":"no-store"});
    res.end(data);
  });
}

/* ---------- server ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const pad = url.pathname;

  if(pad === "/api/health"){
    return json(res, 200, {
      status: "ok",
      bronnen: Object.fromEntries(Object.entries(BRONNEN).map(([k, b]) => [k, {
        naam: b.naam, basis: b.basis, header: b.header,
        sleutelIngesteld: Boolean(b.sleutel),
        /* nooit de sleutel zelf teruggeven - alleen of hij er is en hoe lang */
        sleutelLengte: b.sleutel ? b.sleutel.length : 0
      }]))
    });
  }
  const m = pad.match(/^\/api\/(companyinfo|lusha)\/(.*)$/);
  if(m) return doorgeven(m[1], m[2], req, res);
  if(pad.startsWith("/api/")) return json(res, 404, {fout:"Onbekend eindpunt"});
  return statisch(req, res, pad);
});

/* Bewust alleen 127.0.0.1: niet bereikbaar vanaf het netwerk. */
server.listen(POORT, "127.0.0.1", () => {
  console.log("\n  Prospect Kompas draait op http://127.0.0.1:" + POORT);
  for(const [k, b] of Object.entries(BRONNEN)){
    console.log("  " + (b.sleutel ? "✓" : "✗") + " " + b.naam.padEnd(13) +
      (b.sleutel ? "sleutel ingesteld (" + b.sleutel.length + " tekens)" : "geen sleutel - zet " + k.toUpperCase() + "_API_KEY in .env"));
  }
  console.log("  Stoppen: Ctrl+C\n");
});
