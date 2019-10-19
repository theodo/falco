import { Add } from 'icons';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { colorUsage } from 'stylesheet';
import { AddNameInput, AddPageButtonContainer, AddPageButtonLabel, AddUrlInput } from '../PageTable.style';

export interface  OwnProps {
  projectId: string,
}

type Props = {
  addPageToProjectRequest: (projectId: string, pageName: string, pageUrl: string) => void,  
} & OwnProps & InjectedIntlProps;

const useFocus = (): [React.MutableRefObject<any>, () => void] => {
  const htmlElRef = React.useRef<HTMLInputElement>(null)
  const setFocus = () => {
    if(htmlElRef.current) {
      htmlElRef.current.focus()
    }
  }

  return [ htmlElRef, setFocus ] 
}

export const AddPageRow: React.FunctionComponent<Props> = ({
  projectId,
  addPageToProjectRequest,
  intl
  }) => {
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('')
  const [isAddingMode, setAddingMode] = React.useState(false);
  const [nameInputRef, setNameInputFocus] = useFocus();

  React.useEffect(
    () => {
      setNameInputFocus();
    },
    [isAddingMode, setNameInputFocus],
  );

  const handleBlur = () => {
    if(!pageName && !pageUrl) {
      setAddingMode(false);
    }

    if(pageName && pageUrl) {
      addPageToProjectRequest(
        projectId,
        pageName,
        pageUrl
      );

      setPageName('');
      setPageUrl('');
      setAddingMode(false);
    }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageName(e.currentTarget.value)
  }

  const handleUrlChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageUrl(e.currentTarget.value)
  }

  const activateAddingMode = () => {
    setAddingMode(true);
  }

  return (
    <React.Fragment>
      <AddPageButtonContainer isAdding={isAddingMode} onClick={activateAddingMode}>
        <Add
          color={colorUsage.projectSettingsIconColor}
          width="24px"
          strokeWidth="20"
        />
        <AddPageButtonLabel>
          {intl.formatMessage({id: 'ProjectSettings.add_page'})}
        </AddPageButtonLabel>
      </AddPageButtonContainer >
      <AddNameInput
        isAdding={isAddingMode}
        value={pageName}
        onChange={handleNameChange}
        onBlur={handleBlur}
        ref={nameInputRef}
        placeholder={intl.formatMessage({id: 'ProjectSettings.page_name_placeholder'})}
      />
      <AddUrlInput
        isAdding={isAddingMode}
        value={pageUrl}
        onChange={handleUrlChange}
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.page_url_placeholder'})}
      />
    </React.Fragment>
  )
}
