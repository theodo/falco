import Button from '@material-ui/core/Button';
import { Field, Form, InjectedFormikProps } from 'formik';
import React from 'react';

import Input from 'components/Input';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';
import { routeDefinitions } from 'routes';

import Styles from './Login.style';
import { FormValues } from './service';

interface InnerLoginFormProps {
  errors: {
    username?: string;
    password?: string;
  };
  isUserAuthenticated: boolean;
  isSubmittingFromStore: boolean;
  /*
    isSubmittingFromStore:
    ----------------------
      This prop is used to know if login form is currently being submitted to backend, and make
      connect button disabled/enabled according to this "submitting" state.
      This prop needs to be injected from store, and can not be managed internally in component,
      because we need to wait for login API call response before making connect button enabled
      again, call which is managed in login saga.
      This prop can not be simply named isSubmitting because this name is already used internally
      by Formik component.
  */
  touched: {
    username?: boolean;
    password?: boolean;
  };
  login: (values: FormValues) => void;
  loginError: string | null;
}

const InnerLoginForm: React.FunctionComponent<
  InjectedFormikProps<InnerLoginFormProps, FormValues>
> = props => {
  const { errors, touched, isUserAuthenticated, isSubmittingFromStore, loginError } = props;

  if (isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  return (
    <Styles.Container>
      {loginError && (
        <Styles.FormError>
          <FormattedMessage id="Login.login_error" />
        </Styles.FormError>
      )}
      <Form>
        <div>
          <Field
            type="text"
            name="username"
            label="Username"
            component={Input}
            error={touched.username && errors.username}
          />
        </div>
        <div>
          <Field
            type="password"
            name="password"
            label="Password"
            component={Input}
            error={touched.password && errors.password}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          size="medium"
          disabled={isSubmittingFromStore}
          variant="outlined"
        >
          Connect
        </Button>
      </Form>
    </Styles.Container>
  );
};

export default InnerLoginForm;
