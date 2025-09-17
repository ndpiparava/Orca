# Orca AIS Realtime

- BE : custom backend 
- FE : Vessels visualization on map


![Demo video](./assets/orca.gif "demo") ![Marker cluster ](/assets/cluster.gif "demo") ![Mobile app screenshot](/assets/snapshot.png "snapshot")


- AIS (Automatic Identification System) is a mandatory tracking system that broadcasts vessel identity, position, course, and speed to prevent collisions, with signals received by ground stations and satellites to enable global ship tracking.

## Tech Stack
- **Frontend:** React Native, Typescript, Mapbox, Zustand,React-Query and zod
- **Backend:** Docker,Typescript, PostgreSQL + PostGIS extension, Fastify,DrizzleORM



## Project Goals

### Frontend Features

- Supports **30k+ vessels globally** with efficient rendering.  
- Continuously fetches vessel data from the REST API using a **polling mechanism** restricted to the **current map bounding box**.  
- Uses a **GPU-accelerated Mapbox Layer** to render vessels from a **GeoJSON data source**.  
- **Vessels with heading** are shown using a **direction-oriented vessel icon**, while vessels **without heading (value = 511)** are displayed as **circle markers**. 

### Backend Features

- **Collects realtime global AIS vessel data** to PostGIS using websockets from aisstream.io
- Provides a GET /api/vessels REST endpoint (Fastify) to query vessels updated within the last 2 minutes inside a given map bounding box.
- Dockerized backend for one-command deployment with persistent data volumes across restarts or redeploys.

### Configurable map settings
- Define the **minimum zoom level** required before vessel data is fetched.    

###  Common 
- **Clean, production-ready TypeScript** for safer code and easier maintenance  
- **Consistent data validation** with Zod when interacting with external sources (AIS stream, REST API, etc.)  
- **Separation of concerns** through a clear module and folder structure  
- **Environment variable management** for handling sensitive credentials securely 

## Quick Start

### Backend

1. Install dependencies:

```bash
cd backend && npm install
```

2. Create a `backend/.env` file like the template:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
AIS_API_KEY=ais-api-key
```
🔑 Get your `AIS_API_KEY` from [aisstream.io](https://aisstream.io) by connecting it with your GitHub account.


3. Run Docker compose building the current Dockerfile:

```bash
docker compose up --build
```

4. If everything workes fine, you should see logs like:

```bash
api-1   | [AIS Ingest] (2025-08-04T44:44:44.444Z) -  Vessels per second: xxx

```

These logs indicate that this volume of data is being ingested into our PostGIS database, and within a few minutes, there will be 25k+ AIS data points.

4. Fetch in your browser the `GET /api/vessels` REST endpoint from [localhost:3000](http://localhost:3000/api/vessels?south=51.969690688363386&west=4.4884803844547605&north=51.81425366903801&east=4.372559469219567)

### REST API

#### `GET /api/vessels`

Returns a list of vessels that were **updated in the last 2 minutes** and are **currently within the current bounding box**.

**Query parameters:**

- `south` (number, required) – Minimum latitude of the bounding box  
- `west` (number, required) – Minimum longitude of the bounding box  
- `north` (number, required) – Maximum latitude of the bounding box  
- `east` (number, required) – Maximum longitude of the bounding box

_Example request:_

```bash
GET /api/vessels?south=38.17763966&west=-7.9825274&north=35.749605&east=-9.381349
```

_Response:_

```json
[
  {
    "mmsi": 388890043,
    "position": [1.432423, 40.562443],
    "heading": 511,
    "updated_at": "2025-09-04T4:44:44.444Z"
  },
  ...
]
```

_Notes:_

- Only vessels updated within the last 2 minutes are returned in json format.
- Heading with 511 for vessels with no heading available

### Frontend

#### Prerequisites
1. This React Native CLI project requires [prior setup](https://reactnative.dev/docs/getting-started-without-a-framework).
2. [Mapbox setup](https://docs.mapbox.com/ios/search/guides/install/)

2. Install deps:

```bash
cd frontend/mobile/AISViewer && npm install
```

2. Create a `frontend/mobile/AISViewer/.env` file like the template:

```bash
MAPBOX_API_KEY=mapbox-api-key
```

Get the `MAPBOX_API_KEY` from [mapbox.com](https://www.mapbox.com/)

### Environment Variables

Create a `.env` file in the project root with the following content:

```env
# Mapbox access token
ORCA_MAPBOX_ACCESS_TOKEN=xxxxx

# Backend API endpoint
ORCA_VESSEL_API_URL=http://localhost:3000 or https://aisstream.io

# Environment mode
ORCA_ENV=development
3. Run the app:

```bash
cd ios && pod install && cd ..
npm run ios
# or
npm run android
```

## References

- [1] https://globalfishingwatch.org/faqs/what-is-ais
- [2] https://aisstream.io/documentation
- [3] https://docs.mapbox.com/help/troubleshooting/markers-vs-layers/
- [4] https://emsa.europa.eu/cise-documentation/cise-data-model-1.5.3/model/guidelines/687507181.html
