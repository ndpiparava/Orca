import Mapbox from '@rnmapbox/maps';
import styled from 'styled-components/native';

export const MapContainer = styled.View`
  height: 100%;
  width: 100%;
`;

export const MapView = styled(Mapbox.MapView)`
  flex: 1;
`;
