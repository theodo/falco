import { Dispatch } from 'redux';
import { LoginAction } from 'redux/login';

export interface FormValues {
  username: string;
  password: string;
}

interface LoginServiceStateProps {
  loginError?: string | null;
}

interface LoginServiceDispatchProps {
  login: (values: FormValues) => void;
}

export type LoginServiceProps = LoginServiceStateProps & LoginServiceDispatchProps;

export const validateForm = (values: FormValues) => {
  const errors: { password?: string; username?: string } = {};
  if (!values.username) {
    errors.username = 'Username required';
  }
  return errors;
};

export const mapPropsToValues = () => ({
  username: '',
  password: '',
});

export const handleSubmit = (values: FormValues, { props }: { props: LoginServiceProps }) => {
  props.login(values);
};
