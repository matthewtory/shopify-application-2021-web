import { AppState } from '../index';

export const getResults = (state: AppState) => state.results.results;
export const getError = (state: AppState) => state.results.error;
export const getSubmission = (state: AppState) => state.results.submission;
export const hasSubmission = (state: AppState) => state.results.hasSubmission;