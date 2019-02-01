import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import intlShape from '__mocks__/intlShape';
import Avatar, { Props } from '../Avatar';

describe('<Avatar />', () => {
  let wrapper: ShallowWrapper<Props, {}, Avatar>;

  const props = {
    username: 'Juste Leblanc',
    userAvatarUrl: 'url',
    intl: intlShape,
    fetchUser: jest.fn(),
    updateUsername: jest.fn(),
    push: jest.fn(),
  };

  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<Avatar {...props} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call onInputChange when writing in the text input', () => {
      const input = wrapper.find(TextField);
      // $FlowFixMe
      expect(input.prop('onChange')).toBe(wrapper.instance().onInputChange);
    });

    it('should call fetchUser when clicking on button', () => {
      const button = wrapper.find(Button).last();
      // $FlowFixMe
      expect(button.prop('onClick')).toBe(wrapper.instance().fetchUser);
    });

    it('should display an image if userAvatarUrl is set', () => {
      const image = wrapper.find('img');
      expect(image).toHaveLength(1);
      expect(image.prop('src')).toBe('url');
    });

    it('should not display an image if userAvatarUrl is not set', () => {
      wrapper.setProps({ userAvatarUrl: null });
      const image = wrapper.find('img');
      expect(image).toHaveLength(0);
    });
  });

  describe('onInputChange', () => {
    it('should call updateUsername with the event value', () => {
      const avatar = new Avatar(props);
      expect(props.updateUsername).toHaveBeenCalledTimes(0);
      // @ts-ignore
      avatar.onInputChange({ target: { value: 'value' } });
      expect(props.updateUsername).toHaveBeenCalledTimes(1);
      expect(props.updateUsername).toHaveBeenCalledWith('value');
    });
  });

  describe('fetchUser', () => {
    it('should call fetchUser with the user id prop', () => {
      const avatar = new Avatar(props);

      expect(props.fetchUser).toHaveBeenCalledTimes(0);
      avatar.fetchUser();
      expect(props.fetchUser).toHaveBeenCalledTimes(1);
      expect(props.fetchUser).toHaveBeenCalledWith(props.username);
    });
  });

  describe('navigateTo', () => {
    it('should redirect to specified path', () => {
      const avatar = new Avatar(props);

      expect(props.push).toHaveBeenCalledTimes(0);
      avatar.navigateTo('/path')();
      expect(props.push).toHaveBeenCalledTimes(1);
      expect(props.push).toHaveBeenCalledWith('/path');
    });
  });
});
