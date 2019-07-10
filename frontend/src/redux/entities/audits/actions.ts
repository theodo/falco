import { createAsyncAction } from "typesafe-actions";
import { AuditTypeAndId } from "./types";

export const launchAuditAction = createAsyncAction(
    'auditResults/LAUNCH_AUDIT_REQUEST',
    'auditResults/LAUNCH_AUDIT_SUCCESS',
    'auditResults/LAUNCH_AUDIT_FAILURE',
)<
    { projectId: string; },
    { audits: AuditTypeAndId[]; },
    { errorMessage: string; }
>();

export default {
    launchAuditAction,
}
