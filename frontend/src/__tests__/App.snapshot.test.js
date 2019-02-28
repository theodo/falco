import React from 'react';
import { shallow } from 'enzyme';

import historyMock from '__mocks__/history';
import App from '../App';

describe('<App>', () => {
  it('should render correctly', () => {
    const props = {
      history: historyMock,
      persistor: {},
      store: {
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: jest.fn(),
        replaceReducer: jest.fn(),
      },
    };

    const tree = shallow(<App {...props} />);
    expect(tree).toMatchSnapshot();
  });

  describe('<Route>', () => {
    it('should render the Root component', () => {
      const props = {
        history: historyMock,
        persistor: {},
        store: {
          subscribe: jest.fn(),
          dispatch: jest.fn(),
          getState: jest.fn(),
          replaceReducer: jest.fn(),
        },
      };

      const tree = shallow(<App {...props} />);
      const route = tree.find('Route');
      expect(route.prop('component')()).toMatchSnapshot();
    });
  });
});
