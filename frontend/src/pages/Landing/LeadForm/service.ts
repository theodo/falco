import { RouteComponentProps } from 'react-router';

export interface FormValues {
  email: string;
}

interface LeadServiceDispatchProps {
  createLead: (values: FormValues) => void;
}

export type LeadFormServiceProps = LeadServiceDispatchProps & RouteComponentProps;

export const validate = (values: FormValues) => {
  const errors: { email?: string } = {};
  if (!values.email) {
    errors.email = 'Landing.first_block.leadForm.error_email_required';
  }
  return errors;
};

export const mapPropsToValues = () => ({
  email: '',
});

export const handleSubmit = (values: FormValues, { props }: { props: LeadFormServiceProps }) => {
  props.createLead(values);
};
