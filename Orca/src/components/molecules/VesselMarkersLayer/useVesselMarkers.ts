import {VesselDTO} from '@Orca/types/types';
import {useMemo} from 'react';

export function useVesselMarkers(vessels: VesselDTO[]) {
  const geojson = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: vessels.map(vessel => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: vessel.position,
        },
        properties: {
          mmsi: vessel.mmsi,
          heading: vessel.heading,
        },
      })),
    };
  }, [vessels]);

  return {geojson};
}
