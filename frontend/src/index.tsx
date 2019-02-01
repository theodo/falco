import 'babel-polyfill';
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './redux/store';
import { register } from './serviceWorker';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const rootEl = document.getElementById('root');

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
