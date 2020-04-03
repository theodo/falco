import { PersistState } from 'redux-persist/es/types';
import { RootState } from "redux/types";

export const state: RootState = {
  login: {
    isAuthenticated: false,
    loginError: 'some login error message',
    isSubmitting: false,
    _persist: {} as PersistState
  },
  signUp: {
    signUpError: 'some sign up error message',
    isSubmitting: false,
  },
  parameters: {
    currentAuditParametersId: null,
    currentPageId: null,
    currentScriptId: null,
    currentScriptStepId: null,
    currentDisplayedMetrics: {},
    _persist: {} as PersistState
  },
  entities: {
    projects: {
      byId: null,
      toastrDisplay: ''
    },
    pages: {
      byId: null,
    },
    scripts: {
      byId: null,
    },
    audits: {
      runningAuditByPageOrScriptId: {}
    },
    auditParameters: {
      byId: null,
    },
    auditStatusHistories: {
      byPageOrScriptIdAndAuditParametersId: null,
    },
  },
  auditResults: {
    isLoading: false,
    byAuditId: {},
    sortedByPageId: {},
    sortedByScriptId: {},
  },
  user: null,
  toastr: {
    toastrs: []
  },
};
