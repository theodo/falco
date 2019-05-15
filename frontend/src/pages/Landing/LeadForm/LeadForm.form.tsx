import { InjectedFormikProps } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';

import Input from 'components/Input';
import Style from './LeadForm.style';
import { FormValues } from './service';

interface LeadFormProps {
  errors: {
    email?: string;
  };
  touched: {
    email?: boolean;
  };
}

const LeadForm: React.FunctionComponent<
  InjectedFormikProps<LeadFormProps & RouteComponentProps, FormValues>
> = props => {
  const { errors, touched } = props;

  return (
    <Style.Container>
      <Style.LeadForm>
        <Style.EmailField
          type="email"
          name="email"
          label={'Landing.first_block.leadForm.email_label'}
          component={Input}
          error={touched.email && errors.email}
        />
        <Style.SubmitButton type="submit">
          <FormattedMessage id={'Landing.first_block.leadForm.submit_button'} />
        </Style.SubmitButton>
      </Style.LeadForm>
    </Style.Container>
  );
};

export default LeadForm;
