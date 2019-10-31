import { default as AddIcon } from 'icons/Add';
import { default as CheckmarkIcon } from 'icons/Checkmark';
import { default as CloseIcon } from 'icons/Close';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { colorUsage } from 'stylesheet';
import {
  AddNameInput, AddPageButtonContainer, AddPageButtonLabel, AddPageButtonsContainer, AddUrlInput, PageButton
} from '../PageTable.style';

type Props = {
  add: (pageName: string, pageUrl: string) => void,
} & InjectedIntlProps;

const useFocus = (isAdding: boolean): React.MutableRefObject<any> => {
  const htmlElRef = React.useRef<HTMLInputElement>(null)
  const previousState = React.useRef(true);

  React.useEffect(() => {
    const prevIsAdding = previousState.current;
    if (isAdding && prevIsAdding !== isAdding && htmlElRef.current) {
      htmlElRef.current.focus()
    }
    previousState.current = isAdding;
  });

  return htmlElRef
}

export const AddPageRow: React.FunctionComponent<Props> = ({
  add,
  intl
}) => {
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('')
  const [isAddingMode, setAddingMode] = React.useState(false);
  const nameInputRef = useFocus(isAddingMode);

  const cancel = () => {
    setPageName('');
    setPageUrl('');
    setAddingMode(false);
  }

  const validate = () => {
    if (pageName && pageUrl) {
      add(
        pageName,
        pageUrl
      );

      setPageName('');
      setPageUrl('');
      setAddingMode(false);
    }
  }

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
        <AddIcon
          color={colorUsage.projectSettingsIconColor}
          width="24px"
          strokeWidth="20"
        />
        <AddPageButtonLabel>
          {intl.formatMessage({ id: 'ProjectSettings.add_page' })}
        </AddPageButtonLabel>
      </AddPageButtonContainer >
      <AddNameInput
        isAdding={isAddingMode}
        value={pageName}
        onChange={handleNameChange}
        ref={nameInputRef}
        placeholder={intl.formatMessage({ id: 'ProjectSettings.page_name_placeholder' })}
      />
      <AddUrlInput
        isAdding={isAddingMode}
        value={pageUrl}
        onChange={handleUrlChange}
        placeholder={intl.formatMessage({ id: 'ProjectSettings.page_url_placeholder' })}
      />

      <AddPageButtonsContainer isAdding={isAddingMode}>
        <PageButton onClick={validate}>
          <CheckmarkIcon
            color={colorUsage.projectSettingsIconColor}
            width="16px"
            strokeWidth="3"
          />
        </PageButton>
        <PageButton onClick={cancel}>
          <CloseIcon
            color={colorUsage.projectSettingsIconColor}
            width="13px"
            strokeWidth="20"
          />
        </PageButton>
      </AddPageButtonsContainer >
    </React.Fragment>
  )
}

export default injectIntl(AddPageRow)