import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { PageType } from 'redux/entities/pages/types';
import { ProjectType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import AddPageRow from './AddPageRow';
import PageRow from './PageRow';
import { ElementContainer, ProjectSettingsBlock } from './PageTable.style';
import PageRowHeader from './PageTableHeader';


type Props = {
    currentUser: UserState,
    project: ProjectType;
    add: (projectId: string, pageName: string, pageUrl: string) => void;
    edit: (projectId: string, page: PageType) => void;
    del: (projectId: string, pageId: string) => void;
} & InjectedIntlProps;


const PageTable = ({ currentUser, project, add, edit, del }: Props) => (
    <ProjectSettingsBlock>
        <ElementContainer>
            <PageRowHeader />
        </ElementContainer>
        {project.pagesIds.map((pageId: string) => (
            <ElementContainer key={pageId}>
                <PageRow
                    disabled={!isUserAdminOfProject(currentUser, project)}
                    projectId={project.uuid}
                    pageId={pageId}
                    edit={edit}
                    del={del}
                />
            </ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <ElementContainer>
            <AddPageRow
                projectId={project.uuid}
                add={add}
            />
        </ElementContainer>}
    </ProjectSettingsBlock >
)

export default injectIntl(PageTable)