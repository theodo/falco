import * as React from 'react';

import { MetricType } from 'redux/auditResults/types';

import AuditResult from './AuditResult';
import AuditResultsGraph from './AuditResultsGraph';

import Style from './AuditResultsContainer.style';

export interface OwnProps {
  scriptId: string;
  metrics: MetricType[];
}

interface Props extends OwnProps {
  sortedAuditResultsIds?: {[key: string]: string[]};
  fetchAuditResultsRequest: (scriptId: string) => void;
}

const StepComponent: React.FunctionComponent<any> = props => {
  const { sortedAuditResultsIds, stepNumber, metrics } = props
  return (
    <>
    <AuditResultsGraph auditResultIds={sortedAuditResultsIds[stepNumber]} metrics={metrics} />
    {
      sortedAuditResultsIds[stepNumber].slice(0, 3).map((auditId: string) => (
        <AuditResult key={auditId} auditId={auditId} metrics={metrics} />
      ))
    }
    </>
  )
}

const AuditResultsContainer: React.FunctionComponent<Props> = props => {
  const { fetchAuditResultsRequest, sortedAuditResultsIds, scriptId, metrics } = props;
  React.useEffect(
    () => {
      fetchAuditResultsRequest(scriptId);
    },
    [scriptId],
  );


  if (!sortedAuditResultsIds || Object.keys(sortedAuditResultsIds).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <Style.Container>
      {Object.keys(sortedAuditResultsIds).map(stepNumber => (
        <StepComponent
          sortedAuditResultsIds={sortedAuditResultsIds}
          metrics={metrics}
          stepNumber={stepNumber}
          key={stepNumber}
        />
      ))}
    </Style.Container>
  );
};

export default AuditResultsContainer;
