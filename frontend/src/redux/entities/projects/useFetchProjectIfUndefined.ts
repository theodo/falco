import { useEffect } from "react";
import { ProjectType } from "./types";

export const useFetchProjectIfUndefined = (
    fetchProjectsRequest: (projectId: string) => void,
    projectId: string,
    project?: ProjectType | null,
) => {
    useEffect(() => {
        if (project === undefined) {
            fetchProjectsRequest(projectId);
        }
    }, [fetchProjectsRequest, project, projectId]);
};
