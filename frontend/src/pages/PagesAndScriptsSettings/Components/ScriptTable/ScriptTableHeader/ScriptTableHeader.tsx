import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { NameHeader, ScriptHeader } from '../ScriptTable.style';

export const ScriptTableHeader: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NameHeader>
        <FormattedMessage id="ProjectSettings.script_name" />
      </NameHeader>
      <ScriptHeader>
        <FormattedMessage id="ProjectSettings.script" />
      </ScriptHeader>
    </React.Fragment>
  );
};
