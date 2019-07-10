import React, { ReactNode } from 'react';
import { InfoMessageContainer } from './InfoMessage.style';

interface Props {
  children?: ReactNode;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
};

const InfoMessage: React.FunctionComponent<Props> = ({ children, color, backgroundColor, fontSize, margin, padding }) => {
  return (
    <InfoMessageContainer
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      margin={margin}
      padding={padding}
    >
      {children}
    </InfoMessageContainer>
  );
};

export default InfoMessage;
