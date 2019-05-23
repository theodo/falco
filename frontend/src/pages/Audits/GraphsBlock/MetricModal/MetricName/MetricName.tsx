import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import MetricTooltip from 'components/MetricTooltip';
import { MetricType } from 'redux/auditResults/types';
import Style from './MetricName.style';

interface Props {
  metric: MetricType;
  modalRef: React.RefObject<HTMLDivElement>;
}

const MetricName: React.FunctionComponent<Props> = props => {
  const { metric, modalRef } = props;

  const [showMetricTooltip, toggleMetricTooltip] = React.useState(false);

  const displayTooltip = () => {
    toggleMetricTooltip(true);
  };

  const hideTooltip = () => {
    toggleMetricTooltip(false);
  };

  const metricNameRef = React.useRef<HTMLDivElement>(null);

  return (
    <Style.MetricContainer>
      <Style.MetricName
        onMouseEnter={displayTooltip}
        onMouseLeave={hideTooltip}
        ref={metricNameRef}
      >
        <FormattedMessage id={`Metrics.${metric}.name`} />
      </Style.MetricName>
      {showMetricTooltip && (
        <MetricTooltip parentRef={modalRef} initiatorRef={metricNameRef}>
          <FormattedMessage id={`Metrics.${metric}.description`} />
        </MetricTooltip>
      )}
    </Style.MetricContainer>
  );
};

export default MetricName;
