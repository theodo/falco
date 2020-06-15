import { connect } from 'react-redux';
import { getCurrentURL } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { OwnProps, ProjectSettingsMenuContent } from './ProjectSettingsMenuContent';

const mapStateToProps = (state: RootStateWithRouter, props: OwnProps) => ({
  currentURL: getCurrentURL(state),
});

export default connect(mapStateToProps)(ProjectSettingsMenuContent);
