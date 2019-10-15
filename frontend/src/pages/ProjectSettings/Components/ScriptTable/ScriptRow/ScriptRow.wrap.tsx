import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getScript } from 'redux/entities/scripts/selectors';
import { RootState } from 'redux/types';
import { OwnProps, ScriptRow } from './ScriptRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  script: getScript(state, props.scriptId || ""),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ScriptRow));
