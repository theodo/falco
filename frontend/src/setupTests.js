// @flow
/* eslint-disable */
import raf from 'tempPolyfills';

/*
* This code is run before every jest test
* See https://github.com/facebookincubator/create-react-app/issues/3206
*/
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
