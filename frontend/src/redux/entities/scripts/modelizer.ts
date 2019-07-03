import { modelizeAuditStatusHistory } from "redux/auditResults/modelizer";
import { ApiScriptType, ScriptType } from "./types";


export const modelizeScript = (apiScript: ApiScriptType): ScriptType => ({
    uuid: apiScript.uuid,
    name: apiScript.name,
    latestAuditStatusHistories: apiScript.latest_audit_status_histories.map(modelizeAuditStatusHistory),
})

export const modelizeScriptsToById = (scripts: ScriptType[]): Record<string, ScriptType> => {
    return scripts.reduce((scriptsById, script) => {
        return {
            ...scriptsById,
            [script.uuid]: {
                uuid: script.uuid,
                name: script.name,
            },
        };
    }, {});
};
