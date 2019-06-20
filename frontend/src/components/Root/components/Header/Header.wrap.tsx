import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RootStateWithRouter } from 'redux/types';

import { getShouldDisplayWhatsNewNotification } from 'redux/content/selectors';
import { getCurrentURL } from 'redux/selectors';
import { Header } from './Header';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentURL: getCurrentURL(state),
  shouldDisplayWhatsNewNotification: getShouldDisplayWhatsNewNotification(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Header));
