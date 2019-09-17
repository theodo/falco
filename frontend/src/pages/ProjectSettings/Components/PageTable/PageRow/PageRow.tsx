import * as React from 'react';
import { PageType } from 'redux/entities/pages/types';
import { EditNameInput, EditUrlInput } from '../PageTable.style';

export interface  OwnProps {
  pageId: string,
  projectId: string,
  disabled: boolean,
}

type Props = {
  page?: PageType | null,
  editPageRequest: (projectId: string, page: PageType) => void,  
} & OwnProps;

export const PageRow: React.FunctionComponent<Props> = ({
  page,
  projectId,
  editPageRequest,
  disabled
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
    </React.Fragment>
  )
}
