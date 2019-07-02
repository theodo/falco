import { PagesAction, PagesState } from './pages/reducer';
import { ProjectsAction, ProjectsState } from './projects';

export type EntitiesState = Readonly<{
    projects: ProjectsState;
    pages: PagesState;
}>;

export type EntitiesAction = ProjectsAction | PagesAction;
