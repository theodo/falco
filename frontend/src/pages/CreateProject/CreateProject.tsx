import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { AuditParametersTableDisplayType } from 'redux/entities/auditParameters/types';
import { PageType } from 'redux/entities/pages/types';
import { UserState } from 'redux/user/reducer';
import { makePostRequest } from 'services/networking/request';
import ProjectAuditParameterTable from '../../components/AuditParameterTable';
import PageTable from '../../components/PageTable';
import ProjectDetailsInput from '../../components/ProjectDetailsInput';
import Style from './CreateProject.style';

const VALIDATION_STEP = 3;

const CreateProject = ({ user }: { user: UserState }) => {

  const [step, setStep] = React.useState(0);
  const [projectName, setProjectName] = React.useState('');
  const [projectApiKey, setProjectApiKey] = React.useState('');
  const [auditParameters, setAuditParameters] = React.useState<AuditParametersTableDisplayType[]>([]);
  const [projectPages, setProjectPages] = React.useState<PageType[]>([]);

  const nextStep = () => {
    if (step < VALIDATION_STEP) {
      setStep(step + 1);
    }
  }

  const previousStep = () => {
    if (step > 0) { setStep(step - 1); }
  }

  const validate = async () => {
    const response = await makePostRequest(`/api/projects/`, true, {
      name: projectName,
      members: [],
      pages: projectPages.map((page) => ({ name: page.name, url: page.url })),
      scripts: [],
      audit_parameters_list: auditParameters.map((auditParameter) => ({
        name: auditParameter.name,
        network_shape: auditParameter.networkShape,
        configuration: auditParameter.configurationId
      })),
      wpt_api_key: projectApiKey
    });
  }

  // General Settings
  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value)
  }

  const handleApiKeyChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectApiKey(e.currentTarget.value)
  }

  // Page Settings
  const addPage = (pageName: string, pageUrl: string) => {
    setProjectPages([
      ...projectPages,
      { uuid: `index-${projectPages.length}`, name: pageName, url: pageUrl }
    ])
  }
  const editPage = (page: PageType) => {
    setProjectPages(projectPages
      .map((currentPage: PageType) => currentPage.uuid === page.uuid ? page : currentPage)
    )
  }
  const deletePage = (pageId: string) => {
    setProjectPages(projectPages
      .filter((page: PageType) => page.uuid !== pageId)
    )
  }

  // Audit Parameters Settings 
  const addAuditParameterTable = (auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => {
    setAuditParameters([
      ...auditParameters,
      {
        uuid: `index-${auditParameters.length}`,
        name: auditParameterName,
        networkShape: auditParameterNetworkShape,
        configurationId: auditParameterConfigurationId,
      }
    ])
  }

  const editAuditParameterTable = (auditParameter: { name: string; uuid: string; configuration_id: string; network_shape: string; }) => {
    setAuditParameters(auditParameters
      .map((currentAuditParameter) => currentAuditParameter.uuid === auditParameter.uuid ? currentAuditParameter : {
        uuid: auditParameter.uuid,
        name: auditParameter.name,
        networkShape: auditParameter.network_shape,
        configurationId: auditParameter.configuration_id,
      })
    )
  }
  const deleteAuditParameterTable = (auditParameterId: string) => {
    setAuditParameters(auditParameters
      .filter((auditParameter: AuditParametersTableDisplayType) => auditParameter.uuid !== auditParameterId)
    )
  }
  return (
    <Style.Container>
      <Style.PageTitle>
        <FormattedMessage id="CreateProject.title" />
      </Style.PageTitle>

      {(step === 0 || step === VALIDATION_STEP) && (
        <>
          <Style.Title>
            <FormattedMessage id="ProjectSettings.general_settings" />
          </Style.Title>
          <Style.SettingsFieldContainer>
            <ProjectDetailsInput
              label="ProjectSettings.name"
              onChange={handleNameChange}
              onBlur={null}
              value={projectName}
            />
          </Style.SettingsFieldContainer>
          <Style.SettingsFieldContainer>
            <ProjectDetailsInput
              label="ProjectSettings.wpt_key"
              onChange={handleApiKeyChange}
              onBlur={null}
              value={projectApiKey}
            />
          </Style.SettingsFieldContainer>
        </>
      )}

      {(step === 1 || step === VALIDATION_STEP) && (
        <>
          <Style.Title>
            <FormattedMessage id="ProjectSettings.pages" />
          </Style.Title>
          <PageTable
            pages={projectPages}
            disabled={false}
            add={addPage}
            edit={editPage}
            del={deletePage}
          />
        </>
      )}

      {(step === 2 || step === VALIDATION_STEP) && (
        <>
          <Style.Title>
            <FormattedMessage id="ProjectSettings.project_audit_parameters" />
          </Style.Title>
          <ProjectAuditParameterTable
            auditParameters={auditParameters}
            disabled={false}
            add={addAuditParameterTable}
            edit={editAuditParameterTable}
            del={deleteAuditParameterTable}
          />
        </>
      )}

      <Style.NavigationButtonContainer>
        {step > 0 ?
          <Style.PreviousButton onClick={previousStep}>
            <FormattedMessage id="CreateProject.previous" />
          </Style.PreviousButton> : <div />
        }
        {step < VALIDATION_STEP ?
          <Style.NextButton onClick={nextStep}>
            <FormattedMessage id="CreateProject.next" />
          </Style.NextButton>
          : <Style.NextButton onClick={() => validate()}>
            <FormattedMessage id="CreateProject.validate" />
          </Style.NextButton>
        }
      </Style.NavigationButtonContainer>
    </Style.Container >
  );
}

export default CreateProject;
