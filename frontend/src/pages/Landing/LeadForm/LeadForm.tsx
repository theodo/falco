import { withFormik } from 'formik';
import LeadForm from './LeadForm.form';

import { handleSubmit, mapPropsToValues, validate } from './service';

const LeadFormContainer = withFormik({
  mapPropsToValues,
  validate,
  handleSubmit,
})(LeadForm);

export default LeadFormContainer;
