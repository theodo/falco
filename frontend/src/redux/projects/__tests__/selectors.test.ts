import { state } from '__fixtures__/state';
import * as selectors from 'redux/selectors';
import { selectAuditParametersAsDict } from '../selectors';

const firstProjectId = '1234';
const firstProjectFirstParametersId = `${firstProjectId}-1234`;
const firstProjectFirstParameters = {
  uuid: firstProjectFirstParametersId,
  location: 'Dulles 1-1',
  browser: 'Firefox 1-1',
  networkShape: 'Cable 1-1',
};
const firstProjectSecondParametersId = `${firstProjectId}-5678`;
const firstProjectSecondParameters = {
  uuid: firstProjectSecondParametersId,
  location: 'Dulles 1-2',
  browser: 'Firefox 1-2',
  networkShape: 'Cable 1-2',
};
const firstProject = {
  uuid: firstProjectId,
  name: 'Project #1',
  pages: [],
  scripts: [],
  auditParametersList: [firstProjectFirstParameters, firstProjectSecondParameters],
  screenshotUrl: 'path/to/screenshot/1',
  latestAuditAt: 'never',
};

const secondProjectId = '5678';
const secondProjectFirstParametersId = `${secondProjectId}-1234`;
const secondProjectFirstParameters = {
  uuid: secondProjectFirstParametersId,
  location: 'Dulles 2-1',
  browser: 'Firefox 2-1',
  networkShape: 'Cable 2-1',
};
const secondProjectSecondParametersId = `${secondProjectId}-5678`;
const secondProjectSecondParameters = {
  uuid: secondProjectSecondParametersId,
  location: 'Dulles 2-2',
  browser: 'Firefox 2-2',
  networkShape: 'Cable 2-2',
};
const secondProject = {
  uuid: secondProjectId,
  name: 'Project #2',
  pages: [],
  scripts: [],
  auditParametersList: [secondProjectFirstParameters, secondProjectSecondParameters],
  screenshotUrl: 'path/to/screenshot/2',
  latestAuditAt: 'never',
};

const initialState = {
  ...state,
  projects: {
    byId: {
      [firstProjectId]: { ...firstProject },
      [secondProjectId]: { ...secondProject },
    },
  },
};

describe('Project selectors', () => {
  describe('selectAuditParametersAsDict function', () => {
    it('Should return the an empty object when the projectId does not exist in the projects store', () => {
      expect(selectAuditParametersAsDict(initialState, 'UnknownProject')).toEqual({});
    });

    it('Should return an object containing all audit parameters for specified projectId', () => {
      expect(selectAuditParametersAsDict(initialState, secondProjectId)).toEqual({
        [secondProjectFirstParametersId]: secondProjectFirstParameters,
        [secondProjectSecondParametersId]: secondProjectSecondParameters,
      });
    });
  });
});
