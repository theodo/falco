import { RouteComponentProps } from 'react-router';
import { validateEmail } from 'services/utils';

export interface FormValues {
  email: string;
}

interface LeadServiceDispatchProps {
  createLead: (values: FormValues) => void;
  leadSubmissionStatus: string | null;
}

export type LeadFormServiceProps = LeadServiceDispatchProps & RouteComponentProps;

export const validate = (values: FormValues) => {
  const errors: { email?: string } = {};
  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Landing.first_block.leadForm.error_email_valid';
  }
  if (!values.email) {
    errors.email = 'Landing.first_block.leadForm.error_email_required';
  }
  return errors;
};

export const mapPropsToValues = () => ({
  email: '',
});

export const handleSubmit = (values: FormValues, { props }: { props: LeadFormServiceProps }) => {
  if (props.leadSubmissionStatus === null || props.leadSubmissionStatus === 'failed') {
    props.createLead(values);
  }
};
