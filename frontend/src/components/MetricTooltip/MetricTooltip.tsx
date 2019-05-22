import React, { ReactNode } from 'react';

import Style from './MetricTooltip.style';

export interface Props {
  children?: ReactNode;
  top?: string;
  left?: string | null;
}

const MetricTooltip: React.FunctionComponent<Props> = props => {
  const { children, top, left } = props;
  return <Style.Container {...{ top, left }}>{children}</Style.Container>;
};

export default MetricTooltip;
