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

class AuditResultsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchAuditResultsRequest(this.props.pageId);
  }

  render() {
    const { page } = this.props;
    if (!page) return <div>Loading...</div>;
    return (
      <Style.Container>
        {page.audits.map(auditId => (
          <AuditResult key={auditId} auditId={auditId} />
        ))}
      </Style.Container>
    );
  }
}

export default AuditResultsContainer;
