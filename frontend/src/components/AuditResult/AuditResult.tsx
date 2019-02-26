import * as React from 'react';
import { AuditResultType } from 'redux/auditResults/types';

export type Props = {
  auditId: string;
  auditResult?: AuditResultType;
};

class AuditResult extends React.Component<Props> {
  render() {
    const { auditResult } = this.props;
    if (!auditResult) return null;
    return (
      <React.Fragment>
        <div>TTI: {auditResult.wptMetricRepeatViewTti}</div>
      </React.Fragment>
    );
  }
}

export default AuditResult;
