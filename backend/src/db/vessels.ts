import { sql } from "drizzle-orm";

import type { BoundingBox, Vessel } from "./../schemas";
import { db } from "./connector";
import { vessels } from "./tables";

/*
Upsert a batch of vessels into the database.
*/
export async function upsertVesselsBatch(data: Vessel[] | Vessel) {
  const batch = Array.isArray(data) ? data : [data];
  const validBatch = batch.filter((v) =>
    v.position.every((n) => typeof n === "number")
  );
  if (validBatch.length === 0) return;

  const uniqueBatch = Object.values(
    validBatch.reduce(
      (acc, v) => {
        acc[v.mmsi] = v; // overwrite with latest occurrence
        return acc;
      },
      {} as Record<number, Vessel>
    )
  );

  await db
    .insert(vessels)
    .values(
      uniqueBatch.map((v) => ({
        mmsi: v.mmsi,
        position: v.position,
        heading: v.heading,
        updated_at: new Date(),
      }))
    )
    .onConflictDoUpdate({
      target: vessels.mmsi,
      set: {
        position: sql`EXCLUDED.position`,
        heading: sql`EXCLUDED.heading`,
        updated_at: sql`EXCLUDED.updated_at`,
      },
    });
}

/*
 Query all vessels within a bounding box and updated in the last 2 minutes.
 */
export async function getVesselsInBoundingBox(
  bbox: BoundingBox
): Promise<Vessel[]> {
  const { west, south, east, north } = bbox;

  const result: Vessel[] = await db
    .select()
    .from(vessels)
    .where(
      sql`
        ${vessels.updated_at} > NOW() - INTERVAL '2 minutes'
        AND ${vessels.position} && ST_MakeEnvelope(${west}, ${south}, ${east}, ${north}, 4326)
      `
    );

  return result;
}
