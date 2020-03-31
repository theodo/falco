import React, { MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import MetricTooltip from 'components/MetricTooltip';
import { MetricType } from 'redux/auditResults/types';
import { MetricContainer, MetricName as MetricNameName } from './MetricName.style';

interface Props {
  metric: MetricType;
  modalRef: React.RefObject<HTMLDivElement>;
  onClick: (event: MouseEvent, value: MetricType) => void;
}

const MetricName: React.FunctionComponent<Props> = ({ metric, modalRef, onClick }) => {
  const [showMetricTooltip, toggleMetricTooltip] = React.useState(false);

  const displayTooltip = () => {
    toggleMetricTooltip(true);
  };

  const hideTooltip = () => {
    toggleMetricTooltip(false);
  };

  const metricNameRef = React.useRef<HTMLDivElement>(null);

  return (
    <MetricContainer>
      <MetricNameName
        onMouseEnter={displayTooltip}
        onMouseLeave={hideTooltip}
        ref={metricNameRef}
        onClick={event => onClick(event, metric)}
      >
        <FormattedMessage id={`Metrics.${metric}.name`} />
      </MetricNameName>
      {showMetricTooltip && (
        <MetricTooltip parentRef={modalRef} initiatorRef={metricNameRef}>
          <FormattedMessage id={`Metrics.${metric}.description`} />
        </MetricTooltip>
      )}
    </MetricContainer>
  );
};

export default MetricName;
