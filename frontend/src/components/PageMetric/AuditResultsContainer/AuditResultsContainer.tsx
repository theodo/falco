import * as React from 'react';
import { PageType } from 'redux/pages/types';
import AuditResult from 'components/AuditResult';
import Style from './AuditResultsContainer.style';

export type OwnProps = {
  pageId: string;
};

type Props = {
  page?: PageType;
  fetchAuditResultsRequest: (pageId: string) => void;
} & OwnProps;

const AuditResultsContainer: React.FunctionComponent<Props> = props => {
  const { fetchAuditResultsRequest, page, pageId } = props;
  React.useEffect(
    () => {
      fetchAuditResultsRequest(pageId);
    },
    [pageId],
  );

  if (!page) return <div>Loading...</div>;
  return (
    <Style.Container>
      {page.audits.map(auditId => (
        <AuditResult key={auditId} auditId={auditId} />
      ))}
    </Style.Container>
  );
};

export default AuditResultsContainer;
