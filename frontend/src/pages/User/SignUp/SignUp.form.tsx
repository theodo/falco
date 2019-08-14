import { InjectedFormikProps } from 'formik';
import React from 'react';

import Input from 'components/Input';
import { FormattedMessage } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router';
import { routeDefinitions } from 'routes';
import { getSpacing } from 'stylesheet';

import MessagePill from 'components/MessagePill';
import Styles from '../Form.style';
import { FormValues } from './service';

interface InnerSignUpFormProps {
  errors: {
    username?: string;
    email?: string;
    password?: string;
  };
  isUserAuthenticated: boolean;
  isSubmittingFromStore: boolean;
  /*
    isSubmittingFromStore:
    ----------------------
      This prop is used to know if SignUp form is currently being submitted to backend, and make
      connect button disabled/enabled according to this "submitting" state.
      This prop needs to be injected from store, and can not be managed internally in component,
      because we need to wait for SignUp API call response before making connect button enabled
      again, call which is managed in SignUp saga.
      This prop can not be simply named isSubmitting because this name is already used internally
      by Formik component.
  */
  touched: {
    username?: boolean;
    email?: string;
    password?: boolean;
  };
  SignUp: (values: FormValues, originLocation: string | undefined) => void;
  SignUpError: string | null;
}

const InnerSignUpForm: React.FunctionComponent<
  InjectedFormikProps<InnerSignUpFormProps & RouteComponentProps, FormValues>
> = props => {
  const { errors, touched, isUserAuthenticated, isSubmittingFromStore, SignUpError } = props;

  if (isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  const getSubmitButtonParameters = () => {
    if (isSubmittingFromStore) {
      return {
        className: 'submittingRequest',
        translationKey: 'SignUp.connect_button_running',
      };
    } else {
      return {
        className: 'normal',
        translationKey: 'SignUp.connect_button',
      };
    }
  };

  const submitButtonParameters = getSubmitButtonParameters();

  return (
    <Styles.Container>
      <Styles.Form>
        <Styles.InputFieldContainer margin={`0 0 ${getSpacing(5)} 0`}>
          <Styles.InputField
            type="text"
            name="username"
            label={'SignUp.username_label'}
            component={Input}
            error={touched.username && errors.username}
            disabled={isSubmittingFromStore}
          />
        </Styles.InputFieldContainer>
        <Styles.InputFieldContainer margin={`0 0 ${getSpacing(5)} 0`}>
          <Styles.InputField
            type="email"
            name="email"
            label={'SignUp.email_label'}
            component={Input}
            error={touched.email && errors.email}
            disabled={isSubmittingFromStore}
          />
        </Styles.InputFieldContainer>
        <Styles.InputFieldContainer margin={`0 0 ${getSpacing(5)} 0`}>
          <Styles.InputField
            type="password"
            name="password"
            label={'SignUp.password_label'}
            component={Input}
            error={touched.password && errors.password}
            disabled={isSubmittingFromStore}
          />
        </Styles.InputFieldContainer>
        {SignUpError && (
          <MessagePill messageType="error" margin={`0 0 ${getSpacing(5)} 0`} padding={`${getSpacing(3)}`}>
            <FormattedMessage id="SignUp.sign_up_error" />
          </MessagePill>
        )}
        <Styles.ConnectButton type="submit" className={submitButtonParameters.className}>
          <Styles.ConnectButtonContent>
            {isSubmittingFromStore && <Styles.Loader />}
            <FormattedMessage id={submitButtonParameters.translationKey} />
          </Styles.ConnectButtonContent>
        </Styles.ConnectButton>
      </Styles.Form>
    </Styles.Container>
  );
};

export default InnerSignUpForm;
