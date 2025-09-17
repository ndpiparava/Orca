import React, {memo} from 'react';
import styled from 'styled-components/native';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  if (!message) return null;

  return <ErrorWrapper>{message}</ErrorWrapper>;
};

export default memo(ErrorMessage);

const ErrorWrapper = styled.Text`
  padding: 8px 12px;
  background-color: #ffe6e6;
  color: #d8000c;
  border: 1px solid #d8000c;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px 0;
  min-width: 100%;
  min-height: 40px;
`;
