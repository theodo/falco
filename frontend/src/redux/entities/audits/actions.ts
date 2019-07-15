import { createAsyncAction } from "typesafe-actions";
import { AuditType } from "./types";

export const launchAuditAction = createAsyncAction(
    'audits/LAUNCH_AUDIT_REQUEST',
    'audits/LAUNCH_AUDIT_SUCCESS',
    'audits/LAUNCH_AUDIT_FAILURE',
)<
    { projectId: string; },
    { audits: AuditType[]; },
    { errorMessage: string; }
>();

export default {
    launchAuditAction,
}
