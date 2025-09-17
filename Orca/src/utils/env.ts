/* eslint-disable import/no-unresolved */
import {ORCA_MAPBOX_ACCESS_TOKEN, ORCA_VESSEL_API_URL, ORCA_ENV} from '@env';
import {z} from 'zod';

const environmentSchema = z.object({
  ORCA_MAPBOX_ACCESS_TOKEN: z.string().trim().min(1),
  ORCA_VESSEL_API_URL: z.string().trim().min(1),
  ORCA_ENV: z.string().trim().min(1),
});

export const env = environmentSchema.parse({
  ORCA_MAPBOX_ACCESS_TOKEN,
  ORCA_VESSEL_API_URL,
  ORCA_ENV,
});

export const isProdEnv = env.ORCA_ENV === 'production';
export const isIntEnv = env.ORCA_ENV === 'integration';
export const isDevEnv = env.ORCA_ENV === 'development';
