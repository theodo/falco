import { createAsyncAction } from "typesafe-actions";
import { AuditType } from "./types";

export const launchAuditAction = createAsyncAction(
    'auditResults/LAUNCH_AUDIT_REQUEST',
    'auditResults/LAUNCH_AUDIT_SUCCESS',
    'auditResults/LAUNCH_AUDIT_FAILURE',
)<
    { projectId: string; },
    { audits: AuditType[]; },
    { errorMessage: string; }
>();

export default {
    launchAuditAction,
}
