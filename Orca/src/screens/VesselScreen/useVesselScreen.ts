import {MapState} from '@rnmapbox/maps';
import {useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {useFetchVessels} from '@Orca/hooks/useFetchVessels';
import {BoundingBox} from '@Orca/types/types';
import useMapSettingsStore from '@Orca/stores/useMapSettingsStore';

export function useVesselScreen() {
  const minZoom = useMapSettingsStore(state => state.minZoom);
  const [bbox, setBbox] = useState<BoundingBox | null>(null);
  const onMapDidChangeRegion = useDebouncedCallback((mapState: MapState) => {
    const {
      properties: {bounds, zoom},
    } = mapState;

    if (zoom < minZoom) {
      return;
    }

    const [east, north] = bounds.ne ?? [];
    const [west, south] = bounds.sw ?? [];
    if (
      east !== undefined &&
      north !== undefined &&
      west !== undefined &&
      south !== undefined
    ) {
      setBbox({west, south, east, north});
    }
  }, 50);

  const {data: vessels = [], isFetching, error} = useFetchVessels(bbox);

  return {vessels, isFetching, error, bbox, onMapDidChangeRegion};
}
