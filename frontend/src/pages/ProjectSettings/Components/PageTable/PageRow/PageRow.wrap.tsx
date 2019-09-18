import { connect } from 'react-redux';
import { RootState } from 'redux/types';

import { Dispatch } from 'redux';
import { editPageRequest } from 'redux/entities/pages';
import { getPage } from 'redux/entities/pages/selectors';
import { PageType } from 'redux/entities/pages/types';
import { OwnProps, PageRow } from './PageRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  page: getPage(state, props.pageId || ""),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editPageRequest: (projectId: string, page: PageType) => dispatch(editPageRequest({ projectId, page}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageRow);
