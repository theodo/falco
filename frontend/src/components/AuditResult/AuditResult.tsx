import * as React from 'react';
import { AuditResultType } from 'redux/auditResults/types';

export type OwnProps = {
  auditId: string;
};

type Props = {
  auditResult?: AuditResultType;
} & OwnProps;

class AuditResult extends React.PureComponent<Props> {
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
