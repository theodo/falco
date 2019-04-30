import { connect } from 'react-redux';
import { RootState } from 'redux/types';

import { injectIntl } from 'react-intl';
import { Audits, OwnProps } from './Audits';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId[props.match.params.projectId],
  page: state.pages.byId[props.match.params.pageOrScriptId],
  script: state.scripts.byId[props.match.params.pageOrScriptId],
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Audits));
