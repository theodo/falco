import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Dispatch } from 'redux';
import { getIsAuthenticated, getIsSubmitting, getLoginError } from 'redux/login';
import { loginUserRequest } from 'redux/login/actions';
import { RootState } from 'redux/types';

import { FormValues } from './service';
import SignUpFormContainer from './SignUp';

const mapStateToProps = (state: RootState) => ({
  SignUpError: getLoginError(state),
  isUserAuthenticated: getIsAuthenticated(state),
  isSubmittingFromStore: getIsSubmitting(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SignUp: (values: FormValues, originLocation: string | undefined) =>
    dispatch(loginUserRequest({ ...values, originLocation })),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignUpFormContainer),
);
