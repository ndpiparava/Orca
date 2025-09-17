import { useToastStore } from '@Orca/stores/useToastStore';
import React, { memo } from 'react';
import styled from 'styled-components/native';



const Toast = () => {
  const visible = useToastStore((s) => s.visible);

  if (!visible) return null;

  return (
    <ToastContainer>
      <ToastText>{visible.message}</ToastText>
    </ToastContainer>
  );
};

export default memo(Toast);

const ToastContainer = styled.View`
  position: absolute;
  bottom: 50px;
  align-self: center;
  background-color: #ff4444;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 90%;
  elevation: 4;
`;

const ToastText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  text-align: center;
`;
