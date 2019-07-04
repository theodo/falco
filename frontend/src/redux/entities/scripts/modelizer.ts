import { modelizeAuditStatusHistory } from "../auditStatusHistories/modelizer";
import { ApiScriptType, ScriptType } from "./types";


const modelizeScript = (apiScript: ApiScriptType): ScriptType => ({
    uuid: apiScript.uuid,
    name: apiScript.name,
    latestAuditStatusHistories: apiScript.latest_audit_status_histories.map(modelizeAuditStatusHistory),
})

export const modelizeApiScriptsToById = (scripts: ApiScriptType[]): Record<string, ScriptType> => {
    return scripts.reduce((scriptsById, script) => {
        return {
            ...scriptsById,
            [script.uuid]: modelizeScript(script),
        };
    }, {});
};
