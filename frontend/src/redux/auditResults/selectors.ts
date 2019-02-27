import { RootState } from 'redux/types';

export const selectAuditResultsAsGraphData = (
  state: RootState,
  props: { auditResultIds: string[] },
) =>
  props.auditResultIds &&
  props.auditResultIds
    .map(auditResult => {
      return (
        state.auditResults.byAuditId[auditResult] && {
          x: state.auditResults.byAuditId[auditResult].createdAt.toDate(),
          y: state.auditResults.byAuditId[auditResult].wptMetricRepeatViewTti,
        }
      );
    })
    .filter(auditResult => !!auditResult);
