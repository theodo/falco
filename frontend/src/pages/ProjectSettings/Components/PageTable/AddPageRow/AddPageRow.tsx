import * as React from 'react';
import { AddNameInput, AddUrlInput } from '../PageTable.style';

export interface  OwnProps {
  projectId: string,
}

type Props = {
  addPageToProjectRequest: (projectId: string, pageName: string, pageUrl: string) => void,  
} & OwnProps;

export const AddPageRow: React.FunctionComponent<Props> = ({
  projectId,
  addPageToProjectRequest,
  }) => {
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('')

  const handleBlur = () => {
    if(pageName && pageUrl) {
      addPageToProjectRequest(
        projectId,
        pageName,
        pageUrl
      );

      setPageName('');
      setPageUrl('');
    }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageName(e.currentTarget.value)
  }

  const handleUrlChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageUrl(e.currentTarget.value)
  }

  return (
    <React.Fragment>
      <AddNameInput
        isAdding={true}
        value={pageName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <AddUrlInput
        isAdding={true}
        value={pageUrl}
        onChange={handleUrlChange}
        onBlur={handleBlur}
      />
    </React.Fragment>
  )
}
