import * as React from 'react';
import { PageType } from 'redux/pages/types';
import AuditResult from 'components/AuditResult';

export type OwnProps = {
  pageId: string;
};

type Props = {
  page?: PageType;
  fetchAuditResultsRequest: (pageId: string) => void;
} & OwnProps;

class PageMetric extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchAuditResultsRequest(this.props.pageId);
  }

  render() {
    const { page } = this.props;
    if (!page) return null;
    return (
      <React.Fragment>
        <div>
          {page.name}{' '}
          <a href={page.url} target="_blank">
            Link
          </a>
        </div>
        {page.audits.map(auditId => (
          <AuditResult key={auditId} auditId={auditId} />
        ))}
      </React.Fragment>
    );
  }
}

export default PageMetric;
