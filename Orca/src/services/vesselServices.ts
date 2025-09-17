import {
  bboxQueryDTO,
  BoundingBox,
  vesselArrayDTO,
  VesselDTO,
} from '@Orca/types/types';

import {env} from '@Orca/utils/env';

export async function fetchVesselsInBoundingBox(
  bbox: BoundingBox,
): Promise<VesselDTO[]> {
  try {
    const parsedBbox = bboxQueryDTO.parse(bbox);
    const { west, south, east, north } = parsedBbox;
    const url = `${env.ORCA_VESSEL_API_URL}/api/vessels?south=${south}&west=${west}&north=${north}&east=${east}`;
    console.log('fetchVesselsInBoundingBox url:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    //console.log('fetchVesselsInBoundingBox response:', response);
    if (!response.ok) throw new Error('Failed to fetch vessels');
    const json = await response.json();
    const parsedVessels = vesselArrayDTO.parse(json);
    console.log('fetchVesselsInBoundingBox parsedVessels==', parsedVessels.length);
    return parsedVessels;
  } catch (error) {
    //TODO:track with Sentry
    console.error('fetchVesselsInBoundingBox:', error);
    throw error;
  }
}
