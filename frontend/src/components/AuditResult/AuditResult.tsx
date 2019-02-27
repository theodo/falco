import * as React from 'react';
import { AuditResultType } from 'redux/auditResults/types';
import { FormattedHTMLMessage } from 'react-intl';
import Style from './AuditResult.style';

export type OwnProps = {
  auditId: string;
};

type Props = {
  auditResult?: AuditResultType;
} & OwnProps;

const STANDARD_TIME = 3000;

const AuditResult: React.FunctionComponent<Props> = props => {
  const { auditResult } = props;
  if (!auditResult) return null;
  return (
    <Style.Container isOk={auditResult.wptMetricRepeatViewTti < STANDARD_TIME}>
      <FormattedHTMLMessage
        id="components.AuditResult.tti"
        values={{
          date: auditResult.createdAt.format('DD/MM/YYYY'),
          time: auditResult.wptMetricRepeatViewTti / 1000,
        }}
      />
    </Style.Container>
  );
};

export default AuditResult;
