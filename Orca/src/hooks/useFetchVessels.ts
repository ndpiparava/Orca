import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {fetchVesselsInBoundingBox} from '@Orca/services/vesselServices';
import {BoundingBox, VesselDTO} from '@Orca/types/types';

const VESSEL_STALE_TIME = 120_000; // 2 minutes

export function useFetchVessels(bbox: BoundingBox | null) {
  return useQuery<VesselDTO[]>({
    queryKey: ['vessels', bbox?.west, bbox?.south, bbox?.east, bbox?.north],
    queryFn: () =>
      bbox ? fetchVesselsInBoundingBox(bbox) : Promise.resolve([]),
    enabled: !!bbox,
    retry: 3,
    staleTime: VESSEL_STALE_TIME,
    gcTime: VESSEL_STALE_TIME * 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    placeholderData: keepPreviousData,
  });
}
