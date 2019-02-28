import * as React from 'react';
import AuditResult from 'components/AuditResult';
import Style from './AuditResultsContainer.style';
import AuditResultsGraph from '../AuditResultsGraph';

export type OwnProps = {
  pageId: string;
};

type Props = {
  sortedAuditResultsIds?: string[];
  fetchAuditResultsRequest: (pageId: string) => void;
} & OwnProps;

const AuditResultsContainer: React.FunctionComponent<Props> = props => {
  const { fetchAuditResultsRequest, sortedAuditResultsIds, pageId } = props;
  React.useEffect(
    () => {
      fetchAuditResultsRequest(pageId);
    },
    [pageId],
  );

  if (!sortedAuditResultsIds || sortedAuditResultsIds.length === 0) return <div>Loading...</div>;
  return (
    <Style.Container>
      <AuditResultsGraph auditResultIds={sortedAuditResultsIds} />
      {sortedAuditResultsIds.map(auditId => (
        <AuditResult key={auditId} auditId={auditId} />
      ))}
    </Style.Container>
  );
};

export default AuditResultsContainer;
