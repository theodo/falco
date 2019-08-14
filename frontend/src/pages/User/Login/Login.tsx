import { withFormik } from 'formik';
import InnerLoginForm from './Login.form';

import { handleSubmit, mapPropsToValues, validateForm } from './service';

const LoginFormContainer = withFormik({
  mapPropsToValues,
  validate: validateForm,
  handleSubmit,
})(InnerLoginForm);

export default LoginFormContainer;
