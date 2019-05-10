import React, { ReactNode } from 'react';
import Style from './LandingBlock.style';

interface Props {
  children?: ReactNode;
  backgroundColor?: string;
}

const LandingBlock: React.FunctionComponent<Props> = props => {
  const { backgroundColor, children } = props;
  return (
    <Style.LandingBlockContainer backgroundColor={backgroundColor}>
      {children}
    </Style.LandingBlockContainer>
  );
};

export default LandingBlock;
