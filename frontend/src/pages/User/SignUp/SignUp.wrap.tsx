import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Dispatch } from 'redux';
import { getIsAuthenticated } from 'redux/login';
import { RootState } from 'redux/types';

import { getIsSubmitting, getSignUpError, signUpUserRequest } from 'redux/sign-up';
import { FormValues } from './service';
import SignUpFormContainer from './SignUp';

const mapStateToProps = (state: RootState) => ({
  signUpError: getSignUpError(state),
  isUserAuthenticated: getIsAuthenticated(state),
  isSubmittingFromStore: getIsSubmitting(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (values: FormValues, originLocation: string | undefined) =>
    dispatch(signUpUserRequest({ ...values, originLocation })),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignUpFormContainer),
);
