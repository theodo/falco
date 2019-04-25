import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    border: solid 2px ${colorUsage.auditResultContainer};
    border-radius: ${getSpacing(1)};
    margin: ${getSpacing(2)} 0;
    padding: ${getSpacing(1)};
    display: flex;
    justify-content: space-between;
  `,
  LinkToWPT: styled.a`
    color: ${colorUsage.auditResultLink};
    text-decoration: underline;
  `,
  TypographyContainer: styled.div`
    flex-direction: column;
  `,
  AuditResultValue: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ColorReminder: styled.div.attrs({
    style: (props: any) => ({
      backgroundColor: props.color,
    }),
  })`
    max-height: 100%;
    width: 4px;
    margin-right: ${getSpacing(1)};
    margin-bottom: 2px;
    border-radius: ${getSpacing(1)};
  `,
};

export default Style;
