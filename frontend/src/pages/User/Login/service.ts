import { RouteComponentProps } from 'react-router-dom';

export interface FormValues {
  username: string;
  password: string;
}

interface LoginServiceStateProps {
  loginError: string | null;
  isUserAuthenticated: boolean;
  isSubmittingFromStore: boolean;
}

interface LoginServiceDispatchProps {
  login: (values: FormValues, originLocation: string | undefined) => void;
}

export type LoginServiceProps = LoginServiceStateProps &
  LoginServiceDispatchProps &
  RouteComponentProps;

export const validateForm = (values: FormValues) => {
  const errors: { password?: string; username?: string } = {};
  if (!values.username) {
    errors.username = 'Login.error_username_required';
  }
  if (!values.password) {
    errors.password = 'Login.error_password_required';
  }

  return errors;
};

export const mapPropsToValues = () => ({
  username: '',
  password: '',
});

export const handleSubmit = (values: FormValues, { props }: { props: LoginServiceProps }) => {
  if (!props.isSubmittingFromStore) {
    // TODO improve this
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.login(values, props.location.state ? props.location.state.from : undefined);
  }
};
