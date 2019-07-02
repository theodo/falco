import { ProjectsAction, ProjectsState } from './projects';

export type EntitiesState = Readonly<{
    projectsEntity: ProjectsState;
}>;

export type EntitiesAction = ProjectsAction;
