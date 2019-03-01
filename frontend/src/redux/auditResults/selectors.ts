import { RootState } from 'redux/types';
import { MetricType } from './types';

export const selectAuditResultsAsGraphData = (
  state: RootState,
  props: { auditResultIds: string[]; metric: MetricType },
) =>
  props.auditResultIds &&
  props.auditResultIds
    .map(auditResult => {
      return (
        state.auditResults.byAuditId[auditResult] && {
          x: state.auditResults.byAuditId[auditResult].createdAt.toDate(),
          y: state.auditResults.byAuditId[auditResult][props.metric],
        }
      );
    })
    .filter(auditResult => !!auditResult);
