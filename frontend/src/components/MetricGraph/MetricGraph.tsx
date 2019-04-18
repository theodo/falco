import * as React from 'react';

import dayjs from 'dayjs';
import { InjectedIntlProps } from 'react-intl';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { METRICS } from 'redux/auditResults/constants';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';

export interface OwnProps {
  auditResults: AuditResultsAsGraphData;
  metrics: MetricType[];
}

type Props = OwnProps & InjectedIntlProps;

const MetricGraph: React.FunctionComponent<Props> = props => {
  const { auditResults, intl, metrics } = props;
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={auditResults}>
        <XAxis
          dataKey="date"
          tickFormatter={tickItem => dayjs(tickItem).format('DD/MM')}
          minTickGap={50}
          interval={'preserveStartEnd'}
        />
        <YAxis />
        <Tooltip
          labelFormatter={value => dayjs(value).format('DD/MM/YYYY - HH:mm')}
          formatter={(value, name) => [value, intl.formatMessage({ id: `Front.${name}` })]}
        />
        {metrics.map(metric => (
          <Line
            key={metric}
            type="monotone"
            dataKey={metric}
            stroke={METRICS[metric].colorDark}
            dot={false}
            strokeWidth={3}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricGraph;
