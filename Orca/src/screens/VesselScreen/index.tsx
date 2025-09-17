import React from 'react';
import styled from 'styled-components/native';
import OrcaMap from '@Orca/components/organisms/OrcaMap';
import {useVesselScreen} from './useVesselScreen';
import Toast from '@Orca/components/molecules/Toast';

const VesselScreen = () => {
  const {vessels, onMapDidChangeRegion} = useVesselScreen();
  return (
    <StyledSafeArea>
      <Container>
        <MapWrapper>
          <OrcaMap
            vessels={vessels}
            onMapDidChangeRegion={onMapDidChangeRegion}
          />
        </MapWrapper>
        <Toast />
      </Container>
    </StyledSafeArea>
  );
};

export default VesselScreen;

const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const MapWrapper = styled.View`
  flex: 1;
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding: 1px;
`;
