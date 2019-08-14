import { withFormik } from 'formik';
import InnerSignUpForm from './SignUp.form';

import { handleSubmit, mapPropsToValues, validateForm } from './service';

const SignUpFormContainer = withFormik({
  mapPropsToValues,
  validate: validateForm,
  handleSubmit,
})(InnerSignUpForm);

export default SignUpFormContainer;
