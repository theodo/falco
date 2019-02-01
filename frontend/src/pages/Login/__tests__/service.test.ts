import { handleSubmit, mapPropsToValues, validateForm } from '../service';

describe('Login form service', () => {
  describe('validateForm function', () => {
    it('Should return an error "Username required" in username field if username field is empty in values', () => {
      const values = {
        username: '',
        password: '',
      };
      const errors = validateForm(values);

      expect(errors.username).toBe('Username required');
      expect(errors.password).not.toBeDefined();
    });

    it('Should return an empty object if the username is valid', () => {
      const values = {
        password: '',
        username: 'gandalf.leblanc@lacontee.co',
      };
      const errors = validateForm(values);

      expect(errors).toEqual({});
    });
  });

  describe('mapPropsToValues function', () => {
    it('Should return an object with empty fields for username and password fields', () => {
      const expectedValues = {
        username: '',
        password: '',
      };
      expect(mapPropsToValues()).toEqual(expectedValues);
    });
  });

  describe('handleSubmit function', () => {
    it('Should return a function that calls props.login function with the values we pass to it', () => {
      const values = {
        username: 'elrond@rivendel.fr',
        password: 'I wa$ there',
      };
      const props = {
        login: jest.fn(),
      };
      handleSubmit(values, { props });
      expect(props.login).toHaveBeenCalledTimes(1);
      expect(props.login).toHaveBeenCalledWith(values);
    });
  });
});
