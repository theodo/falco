import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Route } from 'react-router';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Root from './components/Root';
import Routes from './routes';

interface Props {
  history: History;
  persistor: Persistor;
  store: Store;
}

const RootComponentWithRoutes: React.FunctionComponent<any> = props => (
  <Root>
    <Routes store={props.store} />
  </Root>
);

const App: React.FunctionComponent<Props> = ({ history, persistor, store }) => (
  <Provider store={store}>
    <>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Route path="/" render={() => <RootComponentWithRoutes store={store.getState()} />} />
        </ConnectedRouter>
      </PersistGate>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </>
  </Provider>
);

export default App;
