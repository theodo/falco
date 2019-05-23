import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Style from './Footer.style';

interface Props {
  backgroundColor?: string;
}

const Footer: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  return (
    <LandingBlock backgroundColor={backgroundColor}>
      <Style.FooterContainer>
        <FormattedMessage
          id="Landing.footer.created_by"
          values={{
            theodoLink: (
              <Style.TheodoLink href="https://www.theodo.fr" target="_blank">
                Theodo
              </Style.TheodoLink>
            ),
          }}
        />
      </Style.FooterContainer>
    </LandingBlock>
  );
};

export default Footer;
