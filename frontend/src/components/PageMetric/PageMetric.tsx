import { Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import * as React from 'react';
import { MetricType } from 'redux/auditResults/types';
import { PageType } from 'redux/pages/types';
import Style from './PageMetric.style';

const AuditResultsContainer = React.lazy(() => import('./AuditResultsContainer'));

export interface OwnProps {
  pageId: string;
  metric: MetricType;
}

type Props = {
  page?: PageType;
} & OwnProps;

const PageMetric: React.FunctionComponent<Props> = props => {
  const { page, pageId, metric } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);
  if (!page) {
    return null;
  }
  return (
    <Style.Container>
      <Style.Title isExpanded={isExpanded}>
        <Typography color="inherit">{page.name}</Typography>
        <Style.PageLink href={page.url} target="_blank">
          <OpenInNewIcon />
        </Style.PageLink>
        <Style.TitleExpander>
          {isExpanded ? (
            <KeyboardArrowDownIcon onClick={() => setIsExpanded(!isExpanded)} />
          ) : (
            <KeyboardArrowRightIcon onClick={() => setIsExpanded(!isExpanded)} />
          )}
        </Style.TitleExpander>
      </Style.Title>
      <React.Suspense fallback={null}>
        {isExpanded && <AuditResultsContainer pageId={pageId} metric={metric} />}
      </React.Suspense>
    </Style.Container>
  );
};

export default PageMetric;
