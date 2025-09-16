import { z } from 'zod';

// Primitive types
const latSchema = z.number().min(-90).max(90);
const lonSchema = z.number().min(-180).max(180);

const coordinatesSchema = z.tuple([lonSchema, latSchema]);

const vesselSchema = z.object({
  mmsi: z.number(),
  position: coordinatesSchema,
  heading: z.number().nullable(),
  updated_at: z.union([z.date(), z.string()]).nullable(),
});

export const bbQuerySchema = z.object({
  west: z.coerce.number(),
  south: z.coerce.number(),
  east: z.coerce.number(),
  north: z.coerce.number(),
});

export const messageSchema = z.object({
  MessageType: z.literal("PositionReport"),
  Message: z.object({
    PositionReport: z.object({
      UserID: z.number(),
      Latitude: z.number(),
      Longitude: z.number(),
      TrueHeading: z.number().nullable(),
    }),
  }),
});


export type Vessel = z.infer<typeof vesselSchema>;
export type Coordinates = z.infer<typeof coordinatesSchema>;
export type BoundingBox = z.infer<typeof bbQuerySchema>;
export type Message = z.infer<typeof messageSchema>;