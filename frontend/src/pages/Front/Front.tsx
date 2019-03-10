import * as colors from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import Select from 'react-select';

import PageMetric from 'components/PageMetric';
import { METRICS } from 'redux/auditResults/constants';
import { MetricConstantForGraph, MetricType } from 'redux/auditResults/types';
import { ProjectType } from 'redux/projects/types';

import Style from './Front.style';

interface MetricOption {
  value: string;
  label: string;
}

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectRequest: (projectId: string) => void;
  project?: ProjectType;
} & OwnProps &
  InjectedIntlProps;

const selectStyles = {
  multiValueLabel: (styles: any, { data }: { data: MetricConstantForGraph }) => ({
    ...styles,
    color: data.colorDark,
  }),
  multiValue: (styles: any, { data }: { data: MetricConstantForGraph }) => ({
    ...styles,
    backgroundColor: data.colorLight,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: data.colorDark,
    borderRadius: 5,
  }),
  multiValueRemove: (styles: any, { data }: { data: MetricConstantForGraph }) => ({
    ...styles,
    color: data.colorDark,
  }),
};

const Front: React.FunctionComponent<Props> = props => {
  const { fetchProjectRequest, project, match, intl } = props;
  React.useEffect(
    () => {
      fetchProjectRequest(match.params.projectId);
    },
    [match.params.projectId],
  );
  const defaultMetric = 'WPTMetricFirstViewSpeedIndex';
  const [metrics, setMetrics] = React.useState<MetricType[]>([defaultMetric]);

  const allMetrics = Object.keys(METRICS) as MetricType[];

  const options = allMetrics.map(metric => ({
    value: metric,
    label: intl.formatMessage({ id: `Front.${metric}` }),
    colorDark: METRICS[metric].colorDark,
    colorLight: METRICS[metric].colorLight,
  }));

  const selectedOptionIndex = options.findIndex(
    metricOption => metricOption.value === defaultMetric,
  );

  const firstViewOptions = options.filter(option => option.value.includes('FirstView'));
  const repeatViewOptions = options.filter(option => option.value.includes('RepeatView'));

  const groupedOptions = [
    {
      label: 'First View',
      options: firstViewOptions,
    },
    {
      label: 'Repeat View',
      options: repeatViewOptions,
    },
  ];

  if (!project) {
    return <div>Loading...</div>;
  }

  // react-select has a particular type for onChange method
  // see https://github.com/JedWatson/react-select/issues/2902#issuecomment-463128093
  const handleMetricSelectChange = (
    selectedMetricOptions: MetricOption[] | MetricOption | null | undefined,
  ) => {
    if (!Array.isArray(selectedMetricOptions)) {
      throw new Error('Unexpected type passed to ReactSelect onChange handler');
    }

    setMetrics(selectedMetricOptions.map(option => option.value) as MetricType[]);
  };

  return (
    <Style.Container>
      <Style.ProjectTitle>
        <Typography variant="h4">{project.name}</Typography>
      </Style.ProjectTitle>
      <Style.SelectWrapper>
        <Select
          isMulti
          styles={selectStyles}
          options={groupedOptions}
          defaultValue={[options[selectedOptionIndex]]}
          onChange={handleMetricSelectChange}
        />
      </Style.SelectWrapper>
      {project.pages.map(pageId => (
        <PageMetric key={pageId} pageId={pageId} metrics={metrics} />
      ))}
    </Style.Container>
  );
};

export default Front;
