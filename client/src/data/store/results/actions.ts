import { OMDbMovie } from 'data/repository/omdbRepository';
import { MovieNominationResult } from 'data/repository/firebaseRepository';

export const RESULTS_ACTION_FETCH_SUBMISSION = 'resultsFetchSubmission';
export const RESULTS_ACTION_RECEIVE_SUBMISSION = 'resultsReceiveSubmission';
export const RESULTS_ACTION_CLEAR_SUBMISSION = 'resultsClearSubmission';
export const RESULTS_ACTION_FETCH_RESULTS = 'resultsFetchResults';
export const RESULTS_ACTION_RECEIVE_RESULTS = 'resultsReceiveResults';


export type ResultsActionFetchSubmission = {
    type: typeof RESULTS_ACTION_FETCH_SUBMISSION,
    submissionId: string
}

export type ResultsActionClearSubmission = {
    type: typeof RESULTS_ACTION_CLEAR_SUBMISSION,
}

export type ResultsActionReceiveSubmission = {
    type: typeof RESULTS_ACTION_RECEIVE_SUBMISSION,
    submission?: OMDbMovie[],
    error?: string
}

export type ResultsActionFetchResults = {
    type: typeof RESULTS_ACTION_FETCH_RESULTS
}

export type ResultsActionReceiveResults = {
    type: typeof RESULTS_ACTION_RECEIVE_RESULTS,
    results?: MovieNominationResult[],
    error?: string
}

export type ResultsActionTypes = ResultsActionFetchResults
    | ResultsActionReceiveResults
    | ResultsActionFetchSubmission
    | ResultsActionReceiveSubmission
    | ResultsActionClearSubmission

export const fetchSubmission = (submissionId: string) => ({
    type: RESULTS_ACTION_FETCH_SUBMISSION,
    submissionId
});

export const clearSubmission = () => ({
    type: RESULTS_ACTION_CLEAR_SUBMISSION
});


export const receiveSubmission = (submission?: OMDbMovie[], error?: string) => ({
    type: RESULTS_ACTION_RECEIVE_SUBMISSION,
    submission,
    error
});

export const fetchResults = () => ({
    type: RESULTS_ACTION_FETCH_RESULTS
});

export const receiveResults = (results?: MovieNominationResult[], error?: string) => ({
    type: RESULTS_ACTION_RECEIVE_RESULTS,
    results
});