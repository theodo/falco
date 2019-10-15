import Edit from 'icons/Edit/Edit';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ScriptType } from 'redux/entities/scripts/types';
import { NameHeader, Script } from '../ScriptTable.style';

export interface OwnProps {
  scriptId: string;
}

type Props = {
  script: ScriptType | null | undefined
}  & InjectedIntlProps & OwnProps;

export const ScriptRow: React.FunctionComponent<Props> = ({
  scriptId,
  script,
  intl
  }) => {

  if(null === script || undefined === script) {
    return(null);
  };

  return (
    <React.Fragment>
      <NameHeader>
        {script.name}
      </NameHeader>
      <Script>
          {script.script}
      </Script>
      <Edit
        color="black"
        width="1rem"
        height="1rem"
      />
    </React.Fragment>
  )
}
