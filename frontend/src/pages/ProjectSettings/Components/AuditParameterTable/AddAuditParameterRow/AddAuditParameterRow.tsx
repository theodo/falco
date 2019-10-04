import { Add } from 'icons';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { NetworkShapeEnum } from 'redux/entities/auditParameters/types';
import { colorUsage } from 'stylesheet';
import Select from '../../../../../components/Select/Select';
import { AddAuditParameterButtonContainer, AddAuditParameterButtonLabel, AddBrowserInput, AddNameInput, AddNetworkShapeInput } from '../AuditParameterTable.style';

export interface  OwnProps {
  projectId: string,
}

type Props = {
  addAuditParameterToProjectRequest: (projectId: string, auditParameterName: string, auditParameterBrowser: string, auditParameterNetworkShape: string) => void,
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

export const AddAuditParameterRow: React.FunctionComponent<Props> = ({
  projectId,
  addAuditParameterToProjectRequest,
  intl
  }) => {
  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterBrowser, setAuditParameterBrowser] = React.useState('')
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('')
  const [isAddingMode, setAddingMode] = React.useState(false);
  const [nameInputRef, setNameInputFocus] = useFocus();

  const availableNetworkShape = [
    { value: NetworkShapeEnum.CABLE, label: NetworkShapeEnum.CABLE },
    { value: NetworkShapeEnum.DSL, label: NetworkShapeEnum.DSL },
    { value: NetworkShapeEnum.THREE_G_SLOW, label: NetworkShapeEnum.THREE_G_SLOW },
    { value: NetworkShapeEnum.THREE_G, label: NetworkShapeEnum.THREE_G },
    { value: NetworkShapeEnum.THREE_G_FAST, label: NetworkShapeEnum.THREE_G_FAST },
    { value: NetworkShapeEnum.FOUR_G, label: NetworkShapeEnum.FOUR_G },
    { value: NetworkShapeEnum.LTE, label: NetworkShapeEnum.LTE },
    { value: NetworkShapeEnum.EDGE, label: NetworkShapeEnum.EDGE },
    { value: NetworkShapeEnum.TWO_G, label: NetworkShapeEnum.TWO_G },
    { value: NetworkShapeEnum.DIAL, label: NetworkShapeEnum.DIAL },
    { value: NetworkShapeEnum.FIOS, label: NetworkShapeEnum.FIOS },
    { value: NetworkShapeEnum.NATIVE, label: NetworkShapeEnum.NATIVE },
    { value: NetworkShapeEnum.CUSTOM, label: NetworkShapeEnum.CUSTOM },
  ]

  React.useEffect(
    () => {
      setNameInputFocus();
    },
    [isAddingMode],
  );

  const handleBlur = () => {
    if(!auditParameterName) {
      setAddingMode(false);
    }

    if(auditParameterName && auditParameterBrowser && auditParameterNetworkShape) {
      addAuditParameterToProjectRequest(
        projectId,
        auditParameterName,
        auditParameterBrowser,
        auditParameterNetworkShape,
      );

      setAuditParameterName('');
      setAuditParameterBrowser('');
      setAuditParameterNetworkShape('');
      setAddingMode(false);
    }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterName(e.currentTarget.value)
  }

  const handleBrowserChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterBrowser(e.currentTarget.value)
  }

  const handleNetworkShapeChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterNetworkShape(e.currentTarget.value)
  }

  const activateAddingMode = () => {
    setAddingMode(true);
  }

  return (
    <React.Fragment>
      <AddAuditParameterButtonContainer isAdding={isAddingMode} onClick={activateAddingMode}>
        <Add
          color={colorUsage.projectSettingsIconColor}
          width="24px"
          strokeWidth="20"
        />
        <AddAuditParameterButtonLabel>
          {intl.formatMessage({id: 'ProjectSettings.add_audit_parameter'})}
        </AddAuditParameterButtonLabel>
      </AddAuditParameterButtonContainer >
      <AddNameInput
        isAdding={isAddingMode}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
        ref={nameInputRef}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_name_placeholder'})}
      />
      <Select
        value={auditParameterBrowser}
        onChange={handleBrowserChange}
        options={[]}
        display={isAddingMode ? 'visible' : 'none'}
        width="40%"
        margin="0 10px 0 0"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_browser_placeholder'})}
      />
      <Select
        value={auditParameterNetworkShape}
        onChange={handleNetworkShapeChange}
        options={availableNetworkShape}
        display={isAddingMode ? 'visible' : 'none'}
        width="20%"
        margin="0 10px 0 0"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_network_shape_placeholder'})}
      />
    </React.Fragment>
  )
}
