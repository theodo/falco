import 'core-js/stable';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import createBrowserHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './redux/store';
import { register } from './serviceWorker';

export const history = createBrowserHistory();
export const { store, persistor } = configureStore(history);

const rootEl = document.getElementById('root');

dayjs.locale('fr');
dayjs.extend(relativeTime);

if (rootEl) {
  ReactDOM.render(<App history={history} store={store} persistor={persistor} />, rootEl);
  register();
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    if (rootEl) {
      ReactDOM.render(<NextApp history={history} store={store} />, rootEl);
    }
  });
}
