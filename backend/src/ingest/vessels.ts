import WebSocket from "ws";
import { upsertVesselsBatch } from "../db/vessels";
import { type Message, messageSchema, type Vessel } from "../schemas";

const defaultBoundingBox = [
  [-90, -180],
  [90, 180],
];

// Parse and convert AIS message
function parsePositionReport(msg: Message): Vessel {
  const parsed = messageSchema.parse(msg);

  return {
    mmsi: parsed.Message.PositionReport.UserID,
    position: [
      parsed.Message.PositionReport.Longitude,
      parsed.Message.PositionReport.Latitude,
    ] as [number, number],
    heading: parsed.Message.PositionReport.TrueHeading,
    updated_at: new Date(),
  };
}

// Subscribe to AIS stream
function createSubscriptionMessage(apiKey: string) {
  return {
    Apikey: apiKey,
    BoundingBoxes: [defaultBoundingBox],
    FilterMessageTypes: ["PositionReport"],
  };
}

// WebSocket connection logic
function setupWebSocket(
  apiKey: string,
  onVessel: (v: ReturnType<typeof parsePositionReport>) => Promise<void>
) {
  const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");

  ws.on("open", () => {
    ws.send(JSON.stringify(createSubscriptionMessage(apiKey)));
  });

  ws.on("message", async (data) => {
    try {
      const msg: Message = JSON.parse(data.toString());
      if (msg.MessageType !== "PositionReport") return;

      const vessel = parsePositionReport(msg);
      await onVessel(vessel);
    } catch (err) {
      console.error(
        `[AIS Ingest] (${new Date().toISOString()}) - Error handling message:`,
        err
      );
    }
  });

  ws.on("close", () => {
    console.warn(
      `[AIS Ingest] (${new Date().toISOString()}) - WebSocket closed, reconnecting...`
    );
    setTimeout(() => setupWebSocket(apiKey, onVessel), 1000);
  });

  ws.on("error", (err) => {
    console.error(
      `[AIS Ingest] (${new Date().toISOString()}) - WebSocket error:`,
      err
    );
    ws.close();
  });

  return ws;
}

// Main Ingestion Entry Point
export function ingestVesselsData() {
  const API_KEY = process.env.AIS_API_KEY;
  if (!API_KEY) throw new Error("AIS_API_KEY is not set in environment");

  let receivedPerSec = 0;
  let insertedPerSec = 0;

  // --- Batch buffer ---
  const batch: ReturnType<typeof parsePositionReport>[] = [];
  const BATCH_SIZE = 100; // flush when 100 vessels accumulated
  const FLUSH_INTERVAL = 500; // flush at least every 500ms

  // Function to flush buffer
  const flushBatch = async () => {
    if (batch.length === 0) return;

    const vesselsToInsert = batch.splice(0, batch.length); // copy + clear
    try {
      await upsertVesselsBatch(vesselsToInsert); // <-- modify upsertVessel to accept array
      insertedPerSec += vesselsToInsert.length;
    } catch (err) {
      console.error(
        `[AIS Ingest] (${new Date().toISOString()}) - Failed to flush batch:`,
        err
      );
      // put vessels back in queue if needed
      batch.unshift(...vesselsToInsert);
    }
  };

  // Flush buffer regularly
  setInterval(flushBatch, FLUSH_INTERVAL);

  // Log ingestion rate every second
  setInterval(() => {
    console.log(
      `[AIS Ingest] received=${receivedPerSec}/s inserted=${insertedPerSec}/s`
    );
    receivedPerSec = 0;
    insertedPerSec = 0;
  }, 1000);

  // Handler puts vessel into buffer
  const handleVessel = async (
    vessel: ReturnType<typeof parsePositionReport>
  ) => {
    receivedPerSec++;
    //console.log("Received vessel:====", receivedPerSec);
    batch.push(vessel);
    if (batch.length >= BATCH_SIZE) {
      void flushBatch(); // fire and forget
    }
  };

  const ws = setupWebSocket(API_KEY, handleVessel);

  // Graceful shutdown
  const shutdown = async () => {
    console.log(
      `[AIS Ingest] (${new Date().toISOString()}) - Shutting down AIS ingestion...`
    );
    await flushBatch(); // flush any remaining vessels
    ws.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
