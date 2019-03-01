import * as React from 'react';

import AuditResult from 'components/AuditResult';
import { MetricType } from 'redux/auditResults/types';

import AuditResultsGraph from '../AuditResultsGraph';
import Style from './AuditResultsContainer.style';

export type OwnProps = {
  pageId: string;
  metric: MetricType;
};

type Props = {
  sortedAuditResultsIds?: string[];
  fetchAuditResultsRequest: (pageId: string) => void;
} & OwnProps;

const AuditResultsContainer: React.FunctionComponent<Props> = props => {
  const { fetchAuditResultsRequest, sortedAuditResultsIds, pageId, metric } = props;
  React.useEffect(
    () => {
      fetchAuditResultsRequest(pageId);
    },
    [pageId],
  );

  if (!sortedAuditResultsIds || sortedAuditResultsIds.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <Style.Container>
      <AuditResultsGraph auditResultIds={sortedAuditResultsIds} metric={metric} />
      {sortedAuditResultsIds.slice(0, 3).map(auditId => (
        <AuditResult key={auditId} auditId={auditId} metric={metric} />
      ))}
    </Style.Container>
  );
};

export default AuditResultsContainer;
