import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editPageRequest } from 'redux/entities/pages';
import { getPage } from 'redux/entities/pages/selectors';
import { PageType } from 'redux/entities/pages/types';
import { deletePageOfProjectRequest } from 'redux/entities/projects';
import { RootState } from 'redux/types';
import { OwnProps, PageRow } from './PageRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  page: getPage(state, props.pageId || ''),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editPageRequest: (projectId: string, page: PageType) =>
    dispatch(editPageRequest({ projectId, page })),
  deletePageOfProjectRequest: (projectId: string, pageId: string) =>
    dispatch(deletePageOfProjectRequest({ projectId, pageId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageRow);
