import { ActionType } from "typesafe-actions";
import { PageType } from "./types";


export type PagesAction = ActionType<never>;

export type PagesState = Readonly<{
    byId: Readonly<Record<string, PageType>> | null;
}>;