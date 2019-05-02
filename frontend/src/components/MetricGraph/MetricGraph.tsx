import * as React from 'react';

import dayjs from 'dayjs';
import { InjectedIntlProps } from 'react-intl';
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { METRICS } from 'redux/auditResults/constants';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { colorUsage, fontFamily, fontSize } from 'stylesheet';
import Style from './MetricGraph.style';

export interface OwnProps {
  auditResults: AuditResultsAsGraphData;
  metrics: MetricType[];
}

type Props = OwnProps & InjectedIntlProps;

const MetricGraph: React.FunctionComponent<Props> = props => {
  const { auditResults, intl, metrics } = props;

  const renderLegend = (props: { payload: Array<{ value: MetricType }> }) => {
    const { payload } = props;
    return payload.map((entry, index) => (
      <Style.Legend key={index}>{intl.formatMessage({ id: `Front.${entry.value}` })}</Style.Legend>
    ));
  };

  const getFormattedValue = (dataType: 'number' | 'percent' | 'time', value: number) => {
    switch (dataType) {
      case 'time':
        return `${(value / 1000).toFixed(2)}s`;
      case 'percent':
        return `${value}%`;
      case 'number':
        return `${value}`;
    }
  };

  const renderTooltip = (props: {
    label: number;
    payload: Array<{ value: number; dataKey: MetricType }>;
  }) => {
    const { payload, label } = props;
    return payload.map((entry, index) => {
      const dataType = METRICS[entry.dataKey].type;
      return (
        <Style.Tooltip key={index}>
          <Style.TooltipValue>{getFormattedValue(dataType, entry.value)}</Style.TooltipValue>
          <Style.TooltipDate>{dayjs(label).format('Le DD/MM à HH:mm')}</Style.TooltipDate>
        </Style.Tooltip>
      );
    });
  };

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <AreaChart data={auditResults}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colorUsage.graphLine} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colorUsage.graphLine} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Legend verticalAlign="top" align="left" iconSize={0} content={renderLegend} />
        <YAxis hide={true} type="number" domain={[0, 'dataMax + 1000']} />
        <XAxis
          width={30}
          dataKey="date"
          tickFormatter={tickItem => dayjs(tickItem).format('DD/MM')}
          tick={{
            color: `${colorUsage.smallText}`,
            fontFamily: `${fontFamily.mainSans}`,
            fontSize: `${fontSize.smallText}`,
          }}
          axisLine={false}
          tickLine={false}
          minTickGap={50}
          interval={'preserveStart'}
          mirror={false}
        />
        <Tooltip content={renderTooltip} cursor={{ stroke: colorUsage.tooltipCursor }} />
        {metrics.map(metric => (
          <Area
            key={metric}
            type="monotone"
            dataKey={metric}
            stroke={colorUsage.graphLine}
            fillOpacity={1}
            fill="url(#areaGradient)"
            activeDot={{
              fill: colorUsage.tooltipActiveDot,
              stroke: colorUsage.tooltipActiveDotBorder,
              strokeWidth: 4,
              r: 10,
            }}
            dot={false}
            strokeWidth={5}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MetricGraph;
