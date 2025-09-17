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
      cluster={true}
      clusterMaxZoomLevel={10}
      shape={{
        type: 'FeatureCollection',
        features: geojson.features,
        
      }}
    >
      <Mapbox.Images
        images={{
          'vessel-icon': require('../../../assets/vessel/vessel.png'),
          'anchored-icon': require('../../../assets/vessel/anchored.png'),
          'cluster-icon': require('../../../assets/vessel/cluster.png'),
        }}
      />
       <Mapbox.SymbolLayer
        id="clusteredVessels"
        filter={['has', 'point_count']}
        style={{
          iconImage: 'cluster-icon',
          iconAllowOverlap: true,
          iconOpacity: 0.5,
        }}
      />
      <Mapbox.SymbolLayer
        id="vesselsWithHeading"
        filter={['all', ['!=', ['get', 'heading'], 511], ['!', ['has', 'point_count']]]}
        style={{
          iconImage: 'vessel-icon',
          iconRotate: ['get', 'heading'],
          iconAllowOverlap: true,
          iconOpacity: 0.5,
        }}
      />
      <Mapbox.SymbolLayer
        id="vesselsWithoutHeading"
        filter={['all', ['==', ['get', 'heading'], 511], ['!', ['has', 'point_count']]]}
        style={{
          iconImage: 'anchored-icon',
          iconAllowOverlap: true,
          iconOpacity: 0.6,
        }}
      />
    </Mapbox.ShapeSource>
  );
};

export default memo(VesselMarkersLayer);
