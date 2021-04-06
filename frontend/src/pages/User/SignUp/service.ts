import { RouteComponentProps } from 'react-router';

export interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface SignUpServiceStateProps {
  signUpError: string | null;
  isUserAuthenticated: boolean;
  isSubmittingFromStore: boolean;
}

interface SignUpServiceDispatchProps {
  signUp: (values: FormValues, originLocation: string | undefined) => void;
}

export type SignUpServiceProps = SignUpServiceStateProps &
  SignUpServiceDispatchProps &
  RouteComponentProps;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateForm = (values: FormValues) => {
  const errors: { password?: string; email?: string; username?: string } = {};
  if (!values.username) {
    errors.username = 'SignUp.error_username_required';
  }
  if (!values.email) {
    errors.email = 'SignUp.error_email_required';
  }
  if (!values.password) {
    errors.password = 'SignUp.error_password_required';
  }

  return errors;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mapPropsToValues = () => ({
  username: '',
  email: '',
  password: '',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleSubmit = (values: FormValues, { props }: { props: SignUpServiceProps }) => {
  if (!props.isSubmittingFromStore) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.signUp(values, props.location.state ? props.location.state.from : undefined);
  }
};
