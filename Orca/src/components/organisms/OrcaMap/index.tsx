import Mapbox from '@rnmapbox/maps';
import type React from 'react';
import {memo} from 'react';
import VesselMarkersLayer from '@Orca/components/molecules/VesselMarkersLayer';
import {MapContainer, MapView} from './style';
import {VesselDTO} from '../../../types/types';
import MapZoomControl from '@Orca/components/molecules/MapZoomControl';
import useMap, {defaultCenter, defaultZoomLevel} from './useMap';

type PropsType = {
  mapRef?: React.RefObject<Mapbox.MapView | null>;
  vessels: VesselDTO[];
  onMapDidChangeRegion: (mapState: Mapbox.MapState) => void;
};

const OrcaMap = (props: PropsType) => {
  const {mapRef, vessels = [], onMapDidChangeRegion} = props;
  const {handleMapIdle, cameraRef} = useMap({
    onMapDidChangeRegion,
  });

  return (
    <MapContainer>
      <MapView
        ref={mapRef}
        styleURL={Mapbox.StyleURL.Light}
        rotateEnabled={false}
        attributionEnabled={false}
        compassEnabled
        onMapIdle={handleMapIdle}
      >
        <Mapbox.Camera
          centerCoordinate={defaultCenter}
          zoomLevel={defaultZoomLevel}
          ref={cameraRef}
        />
        <VesselMarkersLayer vessels={vessels} />
      </MapView>
      <MapZoomControl />
    </MapContainer>
  );
};

export default memo(OrcaMap);
