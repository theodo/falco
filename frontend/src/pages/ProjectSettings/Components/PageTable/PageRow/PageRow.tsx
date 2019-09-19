import Close from 'icons/Close';
import * as React from 'react';
import { PageType } from 'redux/entities/pages/types';
import { colorUsage } from 'stylesheet';
import { EditNameInput, EditUrlInput, PageDeleteButton, PageDeleteContainer } from '../PageTable.style';

export interface  OwnProps {
  pageId: string,
  projectId: string,
  disabled: boolean,
}

type Props = {
  page?: PageType | null,
  editPageRequest: (projectId: string, page: PageType) => void,
  deletePageOfProjectRequest: (projectId: string, pageId: string) => void;
} & OwnProps;

export const PageRow: React.FunctionComponent<Props> = ({
  pageId,
  page,
  projectId,
  editPageRequest,
  disabled,
  deletePageOfProjectRequest
  }) => {
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('')

  React.useEffect(
    () => {
      if(page) {
        setPageName(page.name);
        setPageUrl(page.url)
      }
    },
    [page],
    );

  const handleBlur = () => {
    if(page && (pageName !== page.name || pageUrl !== page.url)) {
      editPageRequest(
        projectId,
        {
          uuid: page.uuid,
          name: pageName,
          url: pageUrl
        })
      }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageName(e.currentTarget.value)
  }

  const handleUrlChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageUrl(e.currentTarget.value)
  }

  if(null === page || undefined === page) {
    return(null);
  };

  return (
    <React.Fragment>
      <EditNameInput
        disabled={disabled}
        value={pageName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <EditUrlInput
        disabled={disabled}
        value={pageUrl}
        onChange={handleUrlChange}
        onBlur={handleBlur}
      />
      <PageDeleteContainer>
        <PageDeleteButton onClick={() => deletePageOfProjectRequest(projectId, pageId)}>
          <Close
            color={colorUsage.projectSettingsIconColor}
            width="13px"
            strokeWidth="20"
          />
        </PageDeleteButton>
      </PageDeleteContainer >
    </React.Fragment>
  )
}
