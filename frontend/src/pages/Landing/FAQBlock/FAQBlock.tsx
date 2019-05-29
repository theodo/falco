import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'stylesheet';
import Style from './FAQBlock.style';

interface Props {
  backgroundColor?: string;
}

const FAQBlock: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  return (
    <LandingBlock backgroundColor={backgroundColor}>
      <Style.FAQBlockContainer>
        <Style.FAQBlockTitle>
          <FormattedMessage id={'Landing.faq_block.title'} />
        </Style.FAQBlockTitle>
        <Style.FAQBlockColumnsContainer>
          <Style.FAQBlockColumn>
            <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
              <Style.FAQQuestion>
                <FormattedMessage id={'Landing.faq_block.1st_question'} />
              </Style.FAQQuestion>
              <Style.FAQAnswer>
                <FormattedMessage id={'Landing.faq_block.1st_answer'} />
              </Style.FAQAnswer>
            </Style.FAQBlock>
            <Style.FAQBlock>
              <Style.FAQQuestion>
                <FormattedMessage id={'Landing.faq_block.2nd_question'} />
              </Style.FAQQuestion>
              <Style.FAQAnswer>
                <FormattedMessage id={'Landing.faq_block.2nd_answer'} />
              </Style.FAQAnswer>
            </Style.FAQBlock>
          </Style.FAQBlockColumn>
          <Style.FAQBlockColumn>
            <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
              <Style.FAQQuestion>
                <FormattedMessage id={'Landing.faq_block.3rd_question'} />
              </Style.FAQQuestion>
              <Style.FAQAnswer>
                <FormattedMessage id={'Landing.faq_block.3rd_answer'} />
              </Style.FAQAnswer>
            </Style.FAQBlock>
            <Style.FAQBlock>
              <Style.FAQQuestion>
                <FormattedMessage id={'Landing.faq_block.4th_question'} />
              </Style.FAQQuestion>
              <Style.FAQAnswer>
                <FormattedMessage
                  id="Landing.faq_block.4th_answer"
                  values={{
                    theodoLink: (
                      <Style.TheodoLink href="https://www.theodo.fr" target="_blank">
                        Theodo
                      </Style.TheodoLink>
                    ),
                  }}
                />
              </Style.FAQAnswer>
            </Style.FAQBlock>
          </Style.FAQBlockColumn>
        </Style.FAQBlockColumnsContainer>
      </Style.FAQBlockContainer>
    </LandingBlock>
  );
};

export default FAQBlock;
