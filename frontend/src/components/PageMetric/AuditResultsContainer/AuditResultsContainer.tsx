import * as React from 'react';

import { MetricType } from 'redux/auditResults/types';

import AuditResult from './AuditResult';
import AuditResultsGraph from './AuditResultsGraph';

import Style from './AuditResultsContainer.style';

export interface OwnProps {
  pageId: string;
  metrics: MetricType[];
}

interface Props extends OwnProps {
  sortedAuditResultsIds?: string[];
  fetchAuditResultsRequest: (pageId: string) => void;
}

const AuditResultsContainer: React.FunctionComponent<Props> = props => {
  const { fetchAuditResultsRequest, sortedAuditResultsIds, pageId, metrics } = props;
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
      <AuditResultsGraph auditResultIds={sortedAuditResultsIds} metrics={metrics} />
      {sortedAuditResultsIds.slice(0, 3).map(auditId => (
        <AuditResult key={auditId} auditId={auditId} metrics={metrics} />
      ))}
    </Style.Container>
  );
};

export default AuditResultsContainer;
