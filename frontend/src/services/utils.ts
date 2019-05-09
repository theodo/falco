import { AuditResultType } from 'redux/auditResults/types';

export const getWPTAuditId = (audit: AuditResultType) => {
  const auditUrl = new URL(audit.WPTResultsJsonUrl);
  return auditUrl.searchParams.get('test');
};
