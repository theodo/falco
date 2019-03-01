import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import PageMetric from 'components/PageMetric';
import Style from './Front.style';
import { MetricType } from 'redux/auditResults/types';
import { METRICS } from 'redux/auditResults/constants';
import { FormattedMessage } from 'react-intl';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectRequest: (projectId: string) => void;
  project?: ProjectType;
} & OwnProps;

const Front: React.FunctionComponent<Props> = props => {
  const { fetchProjectRequest, project, match } = props;
  React.useEffect(
    () => {
      fetchProjectRequest(match.params.projectId);
    },
    [match.params.projectId],
  );
  const [metric, setMetric] = React.useState<MetricType>('WPTMetricRepeatViewTTI');

  if (!project) return <div>Loading...</div>;
  return (
    <Style.Container>
      <Style.ProjectTitle>
        <Typography variant="h4">{project.name}</Typography>
      </Style.ProjectTitle>
      <select value={metric} onChange={event => setMetric(event.target.value as MetricType)}>
        {Object.keys(METRICS).map(METRIC => (
          <FormattedMessage id={`Front.${METRIC}`} key={METRIC}>
            {text => (
              <option value={METRIC} key={METRIC}>
                {text}
              </option>
            )}
          </FormattedMessage>
        ))}
      </select>
      {project.pages.map(pageId => (
        <PageMetric key={pageId} pageId={pageId} metric={metric} />
      ))}
    </Style.Container>
  );
};

export default Front;
