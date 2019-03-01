import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { getLoginError, getUserToken } from 'redux/login';
import { loginUserRequest } from 'redux/login/actions';
import { RootState } from 'redux/types';

import LoginFormContainer from './Login';
import { FormValues } from './service';

const mapStateToProps = (state: RootState) => ({
  loginError: getLoginError(state),
  token: getUserToken(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (values: FormValues) => dispatch(loginUserRequest(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormContainer);
