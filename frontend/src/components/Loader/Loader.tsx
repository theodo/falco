import * as React from 'react';
import { CircularProgress, LoaderContainer } from './Loader.style';

interface Props {
  color?: string;
  margin?: string;
  padding?: string;
  minHeight?: string;
}

const Loader: React.FunctionComponent<Props> = (props) => {
  const { color, margin, padding, minHeight } = props;

  return (
    <LoaderContainer color={color} margin={margin} padding={padding} minHeight={minHeight}>
      <CircularProgress>
        <div />
        <div />
        <div />
        <div />
      </CircularProgress>
    </LoaderContainer>
  );
};

export default Loader;
