import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import Select from 'react-select';

import PageMetric from 'components/PageMetric';
import { METRICS } from 'redux/auditResults/constants';
import { MetricType } from 'redux/auditResults/types';
import { ProjectType } from 'redux/projects/types';

import Style from './Front.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectRequest: (projectId: string) => void;
  project?: ProjectType;
} & OwnProps &
  InjectedIntlProps;

const Front: React.FunctionComponent<Props> = props => {
  const { fetchProjectRequest, project, match, intl } = props;
  React.useEffect(
    () => {
      fetchProjectRequest(match.params.projectId);
    },
    [match.params.projectId],
  );
  const [metric, setMetric] = React.useState<MetricType>('WPTMetricRepeatViewTTI');

  const options = Object.keys(METRICS).map(METRIC => ({
    value: METRIC,
    label: intl.formatMessage({ id: `Front.${METRIC}` }),
  }));

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

  return (
    <Style.Container>
      <Style.ProjectTitle>
        <Typography variant="h4">{project.name}</Typography>
      </Style.ProjectTitle>
      <Style.SelectWrapper>
        <Select
          options={groupedOptions}
          defaultValue={options[0]}
          onChange={selected => {
            if (Array.isArray(selected) || !selected) {
              throw new Error('Unexpected type passed to ReactSelect onChange handler');
            }
            setMetric(selected.value as MetricType);
          }}
        />
      </Style.SelectWrapper>
      {project.pages.map(pageId => (
        <PageMetric key={pageId} pageId={pageId} metric={metric} />
      ))}
    </Style.Container>
  );
};

export default Front;
