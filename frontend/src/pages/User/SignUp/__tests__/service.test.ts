import { handleSubmit, mapPropsToValues, validateForm } from '../service';

describe('Login form service', () => {
  describe('validateForm function', () => {
    it('Should return an error in each empty field', () => {
      const values = {
        username: '',
        email: '',
        password: '',
      };
      const errors = validateForm(values);

      expect(errors.username).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
    });

    it('Should return an empty object if the username is valid', () => {
      const values = {
        username: 'Gandalf',
        email: 'gandalf.leblanc@lacontee.co',
        password: 'azdaz',
      };
      const errors = validateForm(values);

      expect(errors).toEqual({});
    });
  });

  describe('mapPropsToValues function', () => {
    it('Should return an object with empty fields for username, password and email fields', () => {
      const expectedValues = {
        username: '',
        email: '',
        password: '',
      };
      expect(mapPropsToValues()).toEqual(expectedValues);
    });
  });

  describe('handleSubmit function', () => {
    it('Should return a function that calls props.login function with the values we pass to it', () => {
      const values = {
        username: 'Elrond',
        email: 'elrond@rivendel.fr',
        password: 'I wa$ there',
      };
      const props = {
        signUp: jest.fn(),
        location: { state: undefined },
      };
      handleSubmit(values, { props });
      expect(props.signUp).toHaveBeenCalledTimes(1);
      expect(props.signUp).toHaveBeenCalledWith(values, undefined);
    });
  });
});
