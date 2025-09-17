import React, {memo} from 'react';
import styled from 'styled-components/native';

type Props = {
  zoomLevel: number;
};

const MapZoomLevel: React.FC<Props> = ({zoomLevel}) => {
  return (
    <Overlay>
      <ZoomText>{zoomLevel.toFixed(2)}</ZoomText>
    </Overlay>
  );
};

export default memo(MapZoomLevel);

const Overlay = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px 10px;
  border-radius: 4px;
`;

const ZoomText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
