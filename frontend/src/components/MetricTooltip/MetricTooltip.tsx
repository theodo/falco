import React, { ReactNode } from 'react';

import { Container } from './MetricTooltip.style';

export interface Props {
  children?: ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
  initiatorRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLDivElement>;
}

const MetricTooltip: React.FunctionComponent<Props> = ({ children, parentRef, initiatorRef }) => {
  const [leftPosition, setLeftPosition] = React.useState('');
  const [topPosition, setTopPosition] = React.useState('');

  React.useEffect(
    () => {
      if (parentRef.current && initiatorRef.current) {
        setLeftPosition(
          `${Math.floor(
            initiatorRef.current.getBoundingClientRect().right -
              parentRef.current.getBoundingClientRect().left +
              30,
          )}px`,
        );
        setTopPosition(`
          ${Math.floor(
            initiatorRef.current.getBoundingClientRect().top -
              parentRef.current.getBoundingClientRect().top -
              5,
          )}px`);
      }
    },
    [parentRef, initiatorRef],
  );

  if (!(topPosition && leftPosition)) {
    return <div />;
  }
  return (
    <Container left={leftPosition} top={topPosition}>
      {children}
    </Container>
  );
};

export default MetricTooltip;
