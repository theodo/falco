import { ApiAuditStatusHistoryType } from '../auditStatusHistories/types';

export interface ScriptType {
  uuid: string;
  name: string;
  script: string;
}

export interface ApiScriptType {
  uuid: string;
  name: string;
  latest_audit_status_histories: ApiAuditStatusHistoryType[];
  script: string;
}
