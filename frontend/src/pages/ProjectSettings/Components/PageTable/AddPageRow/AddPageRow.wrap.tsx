import { connect } from 'react-redux';

import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { addPageToProjectRequest } from 'redux/entities/projects';
import { AddPageRow } from './AddPageRow';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPageToProjectRequest: (projectId: string, pageName: string, pageUrl: string) => 
    dispatch(addPageToProjectRequest({ projectId, pageName, pageUrl}))
});

export default connect(
  null,
  mapDispatchToProps,
)(injectIntl(AddPageRow));
