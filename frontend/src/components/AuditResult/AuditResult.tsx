import * as React from 'react';
import { AuditResultType } from 'redux/auditResults/types';

export type OwnProps = {
  auditId: string;
};

type Props = {
  auditResult?: AuditResultType;
} & OwnProps;

const AuditResult: React.FunctionComponent<Props> = props => {
  const { auditResult } = props;
  if (!auditResult) return null;
  return (
    <React.Fragment>
      <div>TTI: {auditResult.wptMetricRepeatViewTti}</div>
    </React.Fragment>
  );
};

export default AuditResult;
