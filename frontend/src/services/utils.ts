import { AuditResultType } from 'redux/auditResults/types';

export const getWPTAuditId = (audit: AuditResultType) => {
  const auditUrl = new URL(audit.WPTResultsJsonUrl);
  return auditUrl.searchParams.get('test');
};

export const pause = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const validateEmail = (email: string) => {
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexp.test(String(email).toLowerCase());
};
