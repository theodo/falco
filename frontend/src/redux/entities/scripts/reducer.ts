import { ActionType } from "typesafe-actions";
import { ScriptType } from "./types";


export type PagesAction = ActionType<never>;

export type PagesState = Readonly<{
    byId: Readonly<Record<string, ScriptType>> | null;
}>;
