import Edit from 'icons/Edit/Edit';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ScriptType } from 'redux/entities/scripts/types';
import { ScriptModal } from '../ScriptModal';
import { EditIconContainer, NameHeader, Script } from '../ScriptTable.style';

export interface OwnProps {
  scriptId: string;
  projectId: string;
}

type Props = {
  script: ScriptType | null | undefined
}  & InjectedIntlProps & OwnProps;

export const ScriptRow: React.FunctionComponent<Props> = ({
  scriptId,
  projectId,
  script,
  intl
  }) => {

  const [displayScriptModal, setDisplayScriptModal] = React.useState(false);

  const openScriptModal = () => {
    setDisplayScriptModal(true);
  };
  const closeScriptModal = () => {
    setDisplayScriptModal(false);
  };

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
      <EditIconContainer onClick={openScriptModal}>
        <Edit
          color="black"
          width="1rem"
          height="1rem"
        />
      </EditIconContainer>
      <ScriptModal
        display={displayScriptModal}
        close={closeScriptModal}
        projectId={projectId}
        scriptId={scriptId}
      />
    </React.Fragment>
  )
}
