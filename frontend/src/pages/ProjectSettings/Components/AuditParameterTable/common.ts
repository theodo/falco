import * as React from 'react';
import { makeGetRequest } from 'services/networking/request';

export interface ApiAvailableAuditParameters {
  uuid: string,
  browser: string,
  location_label: string,
  location_group: string,
}

export const availableNetworkShape = [
  { label: "Cable", value: "CABLE" },
  { label: "DSL", value: "DSL" },
  { label: "3GSlow", value: "THREE_G_SLOW" },
  { label: "3G", value: "THREE_G" },
  { label: "3GFast", value: "THREE_G_FAST" },
  { label: "4G", value: "FOUR_G" },
  { label: "LTE", value: "LTE" },
  { label: "Edge", value: "EDGE" },
  { label: "2G", value: "TWO_G" },
  { label: "Dial", value: "DIAL" },
  { label: "FIOS", value: "FIOS" },
  { label: "Native", value: "NATIVE" },
  { label: "custom", value: "CUSTOM" },
];

export const modelizeAvailableAuditParameters = (apiAvailableAuditParameters: ApiAvailableAuditParameters) => ({
  label: `${apiAvailableAuditParameters.location_label}. ${apiAvailableAuditParameters.browser}`,
  uuid: apiAvailableAuditParameters.uuid,
});

export const useAvailableAuditParameters = () => {
  const [availableAuditParameters, setAvailableAuditParameters] = React.useState<Array<{label: string, uuid: string}>>([])
  React.useEffect(
    () => {
      const request = makeGetRequest('/api/projects/available_audit_parameters', true);
      request
      .then((response) => {
        if(response) {
          setAvailableAuditParameters(response.body.map((apiAvailableAuditParameters: ApiAvailableAuditParameters) => modelizeAvailableAuditParameters(apiAvailableAuditParameters)));
        }
      })
    },
    [],
  );
  return availableAuditParameters;
}
