import styled from 'styled-components';

const Style = {
  Container: styled.div`
    border: solid 2px #374894;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  `,
  LinkToWPT: styled.a`
    color: #6175de;
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
      backgroundColor: props.color
    }),
  })`
    max-height: 100%;
    width: 4px;
    margin-right: 3px;
    margin-bottom: 2px;
    border-radius: 5px;
  `,
};

export default Style;
