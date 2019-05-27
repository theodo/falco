import { InjectedFormikProps } from 'formik';
import React from 'react';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import { FormattedMessage } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router';
import { routeDefinitions } from 'routes';
import { getSpacing } from 'stylesheet';

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
  login: (values: FormValues, originLocation: string | undefined) => void;
  loginError: string | null;
}

const InnerLoginForm: React.FunctionComponent<
  InjectedFormikProps<InnerLoginFormProps & RouteComponentProps, FormValues>
> = props => {
  const { errors, touched, isUserAuthenticated, isSubmittingFromStore, loginError } = props;

  if (isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  const getSubmitButtonParameters = () => {
    if (isSubmittingFromStore) {
      return {
        className: 'submittingRequest',
        translationKey: 'Login.connect_button_running',
      };
    } else {
      return {
        className: 'normal',
        translationKey: 'Login.connect_button',
      };
    }
  };

  const submitButtonParameters = getSubmitButtonParameters();

  return (
    <Styles.Container>
      <Styles.LoginForm>
        <Styles.InputFieldContainer margin={`0 0 ${getSpacing(5)} 0`}>
          <Styles.InputField
            type="text"
            name="username"
            label={'Login.username_label'}
            component={Input}
            error={touched.username && errors.username}
            disabled={isSubmittingFromStore}
          />
        </Styles.InputFieldContainer>
        <Styles.InputFieldContainer margin={`0 0 ${getSpacing(5)} 0`}>
          <Styles.InputField
            type="password"
            name="password"
            label={'Login.password_label'}
            component={Input}
            error={touched.password && errors.password}
            disabled={isSubmittingFromStore}
          />
        </Styles.InputFieldContainer>
        {loginError && (
          <ErrorMessage margin={`0 0 ${getSpacing(5)} 0`} padding={`${getSpacing(3)}`}>
            <FormattedMessage id="Login.login_error" />
          </ErrorMessage>
        )}
        <Styles.ConnectButton type="submit" className={submitButtonParameters.className}>
          <Styles.ConnectButtonContent>
            {isSubmittingFromStore && <Styles.Loader />}
            <FormattedMessage id={submitButtonParameters.translationKey} />
          </Styles.ConnectButtonContent>
        </Styles.ConnectButton>
      </Styles.LoginForm>
    </Styles.Container>
  );
};

export default InnerLoginForm;
