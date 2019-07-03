import { state } from '__fixtures__/state';
import { getProjectAuditParametersById } from 'redux/entities/auditParameters/selectors';

const firstProjectId = '1234';
const firstProjectFirstParametersId = `${firstProjectId}-1234`;
const firstProjectFirstParameters = {
  uuid: firstProjectFirstParametersId,
  name: 'Project Parameters 1-1',
  location: 'Dulles 1-1',
  browser: 'Firefox 1-1',
  networkShape: 'Cable 1-1',
};
const firstProjectSecondParametersId = `${firstProjectId}-5678`;
const firstProjectSecondParameters = {
  uuid: firstProjectSecondParametersId,
  name: 'Project Parameters 1-2',
  location: 'Dulles 1-2',
  browser: 'Firefox 1-2',
  networkShape: 'Cable 1-2',
};
const firstProject = {
  uuid: firstProjectId,
  name: 'Project #1',
  pagesIds: [],
  scripts: [],
  auditParametersList: [firstProjectFirstParameters, firstProjectSecondParameters],
  screenshotUrl: 'path/to/screenshot/1',
  latestAuditAt: 'never',
};

const secondProjectId = '5678';
const secondProjectFirstParametersId = `${secondProjectId}-1234`;
const secondProjectFirstParameters = {
  uuid: secondProjectFirstParametersId,
  name: 'Project Parameters 2-1',
  location: 'Dulles 2-1',
  browser: 'Firefox 2-1',
  networkShape: 'Cable 2-1',
};
const secondProjectSecondParametersId = `${secondProjectId}-5678`;
const secondProjectSecondParameters = {
  uuid: secondProjectSecondParametersId,
  name: 'Project Parameters 2-2',
  location: 'Dulles 2-2',
  browser: 'Firefox 2-2',
  networkShape: 'Cable 2-2',
};
const secondProject = {
  uuid: secondProjectId,
  name: 'Project #2',
  pagesIds: [],
  scripts: [],
  auditParametersList: [secondProjectFirstParameters, secondProjectSecondParameters],
  screenshotUrl: 'path/to/screenshot/2',
  latestAuditAt: 'never',
};

const initialState = {
  ...state,
  entities: {
    projects: {
      byId: {
        [firstProjectId]: { ...firstProject },
        [secondProjectId]: { ...secondProject },
      },
    },
  }
};

describe('Project selectors', () => {
  describe('getProjectAuditParametersById function', () => {
    it('Should return the an empty object when the projectId does not exist in the projects store', () => {
      expect(getProjectAuditParametersById(initialState, 'UnknownProject')).toEqual({});
    });

    it('Should return an object containing all audit parameters for specified projectId', () => {
      expect(getProjectAuditParametersById(initialState, secondProjectId)).toEqual({
        [secondProjectFirstParametersId]: secondProjectFirstParameters,
        [secondProjectSecondParametersId]: secondProjectSecondParameters,
      });
    });
  });
});
