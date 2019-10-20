import * as React from 'react';
import Style from './Loader.style';

interface Props {
  color?: string;
  margin?: string;
  padding?: string;
  minHeight?: string;
}

const Loader: React.FunctionComponent<Props> = props => {
  const { color, margin, padding, minHeight } = props;
  return (
    <Style.LoaderContainer color={color} margin={margin} padding={padding} minHeight={minHeight}>
      <Style.CircularProgress><div /><div /><div /><div /></Style.CircularProgress>
    </Style.LoaderContainer>
  );
};

export default Loader;
