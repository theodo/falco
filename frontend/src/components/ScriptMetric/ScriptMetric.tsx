import { Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import * as React from 'react';
import { MetricType } from 'redux/auditResults/types';
import { ScriptType } from 'redux/scripts/types';
import Style from './ScriptMetric.style';

const AuditResultsContainer = React.lazy(() => import('./AuditResultsContainer'));

export interface OwnProps {
  scriptId: string;
  metrics: MetricType[];
  defaultIsExpanded: boolean;
}

interface Props extends OwnProps {
  script?: ScriptType;
}

const PageMetric: React.FunctionComponent<Props> = props => {
  const { defaultIsExpanded, script, scriptId, metrics } = props;
  const [isExpanded, setIsExpanded] = React.useState(defaultIsExpanded);

  if (!script) {
    return null;
  }

  return (
    <Style.Container>
      <Style.Title isExpanded={isExpanded}>
        <Typography color="inherit">{script.name}</Typography>
        <Style.TitleExpander>
          {isExpanded ? (
            <KeyboardArrowDownIcon onClick={() => setIsExpanded(!isExpanded)} />
          ) : (
            <KeyboardArrowRightIcon onClick={() => setIsExpanded(!isExpanded)} />
          )}
        </Style.TitleExpander>
      </Style.Title>
      <React.Suspense fallback={null}>
        {isExpanded && <AuditResultsContainer scriptId={scriptId} metrics={metrics} />}
      </React.Suspense>
    </Style.Container>
  );
};

export default PageMetric;
