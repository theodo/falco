import dayjs from 'dayjs';

export interface AuditTypeAndId {
  auditParametersId: string;
  pageOrScriptId: string;
  type: 'page' | 'script';
  fromDate?: dayjs.Dayjs;
  toDate?: dayjs.Dayjs;
}

export interface AuditType {
  uuid: string;
  auditParametersId: string;
  pageId: string | null;
  scriptId: string | null;
}

export interface ApiAuditType {
  uuid: string;
  parameters: string;
  page: string | null;
  script: string | null;
}
