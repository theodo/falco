import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactNode } from 'react';
import Style from './LandingBlock.style';

interface Props {
  children?: ReactNode;
  backgroundColor?: string;
}

const Loader: React.FunctionComponent<Props> = props => {
  const { backgroundColor, children } = props;
  return (
    <Style.LoaderContainer backgroundColor={backgroundColor}>{children}</Style.LoaderContainer>
  );
};

export default Loader;
