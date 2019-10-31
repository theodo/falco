import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { PageType } from 'redux/entities/pages/types';
import AddPageRow from './AddPageRow';
import PageRow from './PageRow';
import { ElementContainer, ProjectSettingsBlock } from './PageTable.style';
import PageRowHeader from './PageTableHeader';


type Props = {
    pages: Array<PageType | null> | null | undefined;
    disabled: boolean;
    add: (pageName: string, pageUrl: string) => void;
    edit: (page: PageType) => void;
    del: (pageId: string) => void;
} & InjectedIntlProps;


const PageTable = ({ pages, disabled, add, edit, del }: Props) => (
    <ProjectSettingsBlock>
        <ElementContainer>
            <PageRowHeader />
        </ElementContainer>
        {pages && pages.map((page: PageType | null) => (
            page && <ElementContainer key={page.uuid}>
                <PageRow
                    disabled={disabled}
                    page={page}
                    edit={edit}
                    del={del}
                />
            </ElementContainer>
        ))
        }
        {!disabled && <ElementContainer>
            <AddPageRow
                add={add}
            />
        </ElementContainer>}
    </ProjectSettingsBlock >
)

export default injectIntl(PageTable)