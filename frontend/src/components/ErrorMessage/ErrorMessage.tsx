import React, { ReactNode } from 'react';
import Style from './ErrorMessage.style';

interface Props {
  children?: ReactNode;
  color?: string;
  backgroundColor?: string;
  margin?: string;
  padding?: string;
}

const ErrorMessage: React.FunctionComponent<Props> = props => {
  const { children, color, backgroundColor, margin, padding } = props;
  return (
    <Style.ErrorMessageContainer
      color={color}
      backgroundColor={backgroundColor}
      margin={margin}
      padding={padding}
    >
      {children}
    </Style.ErrorMessageContainer>
  );
};

export default ErrorMessage;
