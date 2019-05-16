import React, { ReactNode } from 'react';
import Style from './ErrorMessage.style';

interface Props {
  children?: ReactNode;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
}

const ErrorMessage: React.FunctionComponent<Props> = props => {
  const { children, color, backgroundColor, fontSize, margin, padding } = props;
  return (
    <Style.ErrorMessageContainer
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      margin={margin}
      padding={padding}
    >
      {children}
    </Style.ErrorMessageContainer>
  );
};

export default ErrorMessage;
