import Mapbox, {MapState} from '@rnmapbox/maps';
import {useCallback, useRef} from 'react';

type PropsType = {
  onMapDidChangeRegion: (mapState: Mapbox.MapState) => void;
};

export const defaultZoomLevel = 12;
export const defaultCenter: [number, number] = [
  4.430519926837164, 51.8919721787007,
]; // Rotterdam

const useMap = ({onMapDidChangeRegion}: PropsType) => {
  const cameraRef = useRef<Mapbox.Camera>(null);

  const handleMapIdle = useCallback(async (mapState: MapState) => {
    onMapDidChangeRegion && onMapDidChangeRegion(mapState);
  }, []);

  return {cameraRef, handleMapIdle};
};

export default useMap;
