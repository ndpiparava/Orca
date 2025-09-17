import React, {memo, useState} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import useMapSettingsStore from '@Orca/stores/useMapSettingsStore';
import ZoomIcon from '@Orca/svgs/ZoomIcon';

const MapZoomControl: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const {minZoom, decreaseMinZoomLevel, increaseMinZoomLevel} =
    useMapSettingsStore(state => state);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  return (
    <Container>
      <CollapsedButton onPress={toggleExpanded}>
        <ZoomLevelText>{minZoom}</ZoomLevelText>
         <ZoomIcon />
      </CollapsedButton>

      {expanded && (
        <ExpandedContainer>
          <Button onPress={decreaseMinZoomLevel}>
            <ButtonText>-</ButtonText>
          </Button>
          <ZoomLevelText>{minZoom}</ZoomLevelText>
          <Button onPress={increaseMinZoomLevel}>
            <ButtonText>+</ButtonText>
          </Button>
          <CloseButton onPress={toggleExpanded}>
            <ButtonText>✕</ButtonText>
          </CloseButton>
        </ExpandedContainer>
      )}
    </Container>
  );
};

export default memo(MapZoomControl);

const Container = styled.View`
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: flex-start;
`;

const CollapsedButton = styled(TouchableOpacity)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;



const ExpandedContainer = styled.View`
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 6px;
  flex-direction: row;
  align-items: center;
`;

const Button = styled(TouchableOpacity)`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 0 5px;
`;

const CloseButton = styled(TouchableOpacity)`
  padding: 6px;
  margin-left: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const ZoomLevelText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin: 0 5px;
`;
