import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import { editPageRequest } from 'redux/entities/pages';
import { getProjectPages } from 'redux/entities/pages/selectors';
import { PageType } from 'redux/entities/pages/types';
import { fetchProjectsRequest, setProjectToastrDisplay } from 'redux/entities/projects';
import { addPageToProjectRequest, deletePageOfProjectRequest } from 'redux/entities/projects';
import { getProject, getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getUser } from 'redux/user/selectors';
import PagesAndScriptsSettings, { OwnProps } from './PagesAndScriptsSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  currentUser: getUser(state),
  project: getProject(state, props.match.params.projectId),
  toastrDisplay: getProjectToastrDisplay(state),
  pages: getProjectPages(state, props.match.params.projectId || ""),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: (projectId: string) => dispatch(fetchProjectsRequest({ currentProjectId: projectId })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => dispatch(setProjectToastrDisplay({ toastrDisplay })),
  addPageToProjectRequest: (projectId: string, pageName: string, pageUrl: string) =>
    dispatch(addPageToProjectRequest({ projectId, pageName, pageUrl })),
  editPageRequest: (projectId: string, page: PageType) => dispatch(editPageRequest({ projectId, page })),
  deletePageOfProjectRequest: (projectId: string, pageId: string) => dispatch(deletePageOfProjectRequest({ projectId, pageId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(PagesAndScriptsSettings));
