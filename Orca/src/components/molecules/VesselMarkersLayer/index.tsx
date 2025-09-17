import Mapbox from '@rnmapbox/maps';

import {memo} from 'react';
import {useVesselMarkers} from './useVesselMarkers';
import {VesselDTO} from '@Orca/types/types';

type PropsType = {
  vessels: VesselDTO[];
};
const VesselMarkersLayer = (props: PropsType) => {
  const {vessels} = props;
  const {geojson} = useVesselMarkers(vessels);

  return (
    <Mapbox.ShapeSource
      id="vesselsSource"
      shape={{
        type: 'FeatureCollection',
        features: geojson.features,
      }}
    >
      <Mapbox.Images
        images={{
          'vessel-icon': require('../../../assets/vessel/vessel.png'),
          'anchored-icon': require('../../../assets/vessel/anchored.png'),
        }}
      />
      <Mapbox.SymbolLayer
        id="vesselsWithHeading"
        filter={['!=', ['get', 'heading'], 511]}
        style={{
          iconImage: 'vessel-icon',
          iconRotate: ['get', 'heading'],
          iconAllowOverlap: true,
          iconOpacity: 0.5,
        }}
      />
      <Mapbox.SymbolLayer
        id="vesselsWithoutHeading"
        filter={['==', ['get', 'heading'], 511]}
        style={{
          iconImage: 'anchored-icon',
          iconAllowOverlap: true,
          iconOpacity: 0.8,
        }}
      />
    </Mapbox.ShapeSource>
  );
};

export default memo(VesselMarkersLayer);
