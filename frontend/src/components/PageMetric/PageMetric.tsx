import * as React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { PageType } from 'redux/pages/types';
import Style from './PageMetric.style';

const AuditResultsContainer = React.lazy(() => import('./AuditResultsContainer'));

export type OwnProps = {
  pageId: string;
};

type Props = {
  page?: PageType;
} & OwnProps;

const PageMetric: React.FunctionComponent<Props> = ({ page, pageId }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  if (!page) return null;
  return (
    <Style.Container>
      <Style.Title isExpanded={isExpanded}>
        {page.name}
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
        {isExpanded && <AuditResultsContainer pageId={pageId} />}
      </React.Suspense>
    </Style.Container>
  );
};

export default PageMetric;
