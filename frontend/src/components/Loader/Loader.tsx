import CircularProgress from '@material-ui/core/CircularProgress';
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
      <CircularProgress color={'inherit'} />
    </Style.LoaderContainer>
  );
};

export default Loader;
