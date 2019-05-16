import { RootState } from 'redux/types';

export const getLeadSubmissionStatus = (store: RootState) => store.lead.leadSubmission;
