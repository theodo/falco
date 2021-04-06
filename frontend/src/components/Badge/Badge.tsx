import * as React from 'react';
import Style from './Badge.style';

interface Props {
  backgroundColor: string;
  color: string;
  margin?: string;
  text: string;
}

const Badge: React.FunctionComponent<Props> = (props) => {
  const { backgroundColor, color, margin, text } = props;

  return (
    <Style.Badge backgroundColor={backgroundColor} color={color} margin={margin}>
      {text}
    </Style.Badge>
  );
};

export default Badge;
