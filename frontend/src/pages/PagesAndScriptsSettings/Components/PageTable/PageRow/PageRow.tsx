import Close from 'icons/Close';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { PageType } from 'redux/entities/pages/types';
import { colorUsage } from 'stylesheet';
import { EditNameInput, EditUrlInput, PageButton, PageDeleteContainer } from '../PageTable.style';

export interface OwnProps {
  pageId: string,
  projectId: string,
  disabled: boolean,
}

type Props = {
  page?: PageType | null,
  editPageRequest: (projectId: string, page: PageType) => void,
  deletePageOfProjectRequest: (projectId: string, pageId: string) => void;
} & OwnProps & InjectedIntlProps;

export const PageRow: React.FunctionComponent<Props> = ({
  pageId,
  page,
  projectId,
  editPageRequest,
  disabled,
  deletePageOfProjectRequest,
  intl
}) => {
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('')

  React.useEffect(
    () => {
      if (page) {
        setPageName(page.name);
        setPageUrl(page.url)
      }
    },
    [page],
  );

  const handleBlur = () => {
    if (page && (pageName !== page.name || pageUrl !== page.url)) {
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

  const handlePageDeletion = (currentProjectId: string, targetPageId: string) => {
    toastr.confirm(intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_page_confirm_question' }),
      {
        onOk: () => deletePageOfProjectRequest(currentProjectId, targetPageId)
      })
  }

  if (null === page || undefined === page) {
    return (null);
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
        <PageButton onClick={() => handlePageDeletion(projectId, pageId)}>
          <Close
            color={colorUsage.projectSettingsIconColor}
            width="13px"
            strokeWidth="20"
          />
        </PageButton>
      </PageDeleteContainer >
    </React.Fragment>
  )
}
