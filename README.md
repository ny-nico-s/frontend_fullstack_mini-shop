# MiniShop Light – Frontend

Frontend für den MiniShop: React + TypeScript mit Vite, ohne weitere Bibliotheken.
Es zeigt die Produkte des Backends an, legt neue an und löscht bestehende.

## Voraussetzungen

- Node.js 20 oder neuer
- Das Backend (Spring Boot + PostgreSQL in Docker) muss laufen

## Backend zuerst starten

Im Backend-Projekt, in dieser Reihenfolge:

```bash
docker compose up -d
./gradlew bootRun
```

Das Backend läuft danach auf `http://localhost:8080`. Ohne Docker startet es nicht,
und das Frontend zeigt dann seine Fehlermeldung an.

## Frontend starten

In einem zweiten Terminal:

```bash
cd frontend
npm install
npm run dev
```

Die Seite läuft auf `http://localhost:5173`.

`npm install` ist nur beim ersten Mal nötig.

## Der Port 5173 ist Pflicht

Das Backend erlaubt CORS nur für `http://localhost:5173`. Darum ist der Port in
`vite.config.ts` mit `strictPort: true` festgenagelt: Ist er belegt, bricht Vite ab,
statt auf einen anderen Port auszuweichen und CORS-Fehler zu produzieren.

## Weitere Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver auf Port 5173 |
| `npm run build` | Produktions-Build nach `frontend/dist` |
| `npm run preview` | Den gebauten Stand lokal anschauen |
| `npm run lint` | Code prüfen |

## Aufbau

```
frontend/src
├── api/
│   ├── client.ts          Basis-URL und Fehlerbehandlung für alle Anfragen
│   ├── products.ts        Produkte laden, anlegen, löschen
│   └── categories.ts      Kategorien laden
├── components/
│   ├── ProductForm.tsx    Formular für neue Produkte
│   └── ProductList.tsx    Produktliste als Karten
├── types.ts               Category, Product, NewProduct
└── App.tsx                Lädt die Daten und verteilt sie an die Komponenten
```

Die Anfragen an das Backend stehen ausschliesslich in `src/api`, die Komponenten
kümmern sich nur um die Darstellung.

## Zustände der Oberfläche

- Während des Ladens: `Wird geladen…`
- Backend nicht erreichbar: Hinweis mit der Backend-Adresse statt einer weissen Seite
- Keine Produkte vorhanden: `Noch keine Produkte erfasst`
