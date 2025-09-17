import z from 'zod';

const vesselDTO = z.object({
  mmsi: z.number(),
  position: z.tuple([z.number(), z.number()]),
  heading: z.number().nullable(),
  updated_at: z.string(),
});

export const bboxQueryDTO = z.object({
  west: z.coerce.number(),
  south: z.coerce.number(),
  east: z.coerce.number(),
  north: z.coerce.number(),
});

export type lat = number;
export type lon = number;
export type Coordinates = [lon, lat];
export const vesselArrayDTO = z.array(vesselDTO);
export type VesselDTO = z.infer<typeof vesselDTO>;
export type BoundingBox = z.infer<typeof bboxQueryDTO>;
