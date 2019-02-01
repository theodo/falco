// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Input from '..';

describe('<Input>', () => {
  it('should render correctly', () => {
    const props = {
      name: 'Passphrase',
      label: 'French atomic bomb passphrase',
      type: 'password',
      field: {
        value: 'La barbe de la femme à Georges Moustaki',
        onChange: value => null,
      }
    };
    const tree = shallow(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an error provided', () => {
    const props = {
      name: 'Passphrase',
      label: 'French atomic bomb passphrase',
      type: 'password',
      error: 'Password seems too long to be true',
      field: {
        value: 'La barbe de la femme à Georges Moustaki',
        onChange: value => null,
      }
    };
    const tree = shallow(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
