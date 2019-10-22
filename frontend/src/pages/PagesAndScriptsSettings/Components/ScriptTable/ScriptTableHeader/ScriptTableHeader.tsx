import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { NameHeader, ScriptHeader } from '../ScriptTable.style';

export const ScriptTableHeader: React.FunctionComponent<InjectedIntlProps> = ({
    intl
}) => {

  return (
    <React.Fragment>
      <NameHeader>
        {intl.formatMessage({ id: "ProjectSettings.script_name"})}
      </NameHeader>
      <ScriptHeader>
        {intl.formatMessage({ id: "ProjectSettings.script"})}
      </ScriptHeader>
    </React.Fragment>
  )
}
