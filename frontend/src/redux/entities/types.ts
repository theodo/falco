import { PagesState } from './pages/reducer';
import { ProjectsAction, ProjectsState } from './projects';

export type EntitiesState = Readonly<{
    projects: ProjectsState;
}>;

export type EntitiesAction = ProjectsAction;
