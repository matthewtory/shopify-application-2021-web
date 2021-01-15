import { OMDbMovie } from 'data/repository/omdbRepository';

export const NOMINATE_ACTION_UPDATE_QUERY = 'updateQuery';
export const NOMINATE_ACTION_RECEIVE_QUERY_RESULTS = 'receiveQueryResults';
export const NOMINATE_ACTION_ADD_NOMINATION = 'addNomination';
export const NOMINATE_ACTION_REMOVE_NOMINATION = 'removeNomination';
export const NOMINATE_ACTION_SUBMIT = 'submitNominations';
export const NOMINATE_ACTION_SUBMIT_RESPONSE = 'submitNominationsResponse';
export const NOMINATE_ACTION_CLEAR = 'clearNomination';

export type NominateActionUpdateQuery = {
    type: typeof NOMINATE_ACTION_UPDATE_QUERY,
    query: string
}

export type NominateActionReceiveQueryResults = {
    type: typeof NOMINATE_ACTION_RECEIVE_QUERY_RESULTS,
    results: OMDbMovie[],
    error?: string
}

export type NominateActionAddNomination = {
    type: typeof NOMINATE_ACTION_ADD_NOMINATION,
    nomination: OMDbMovie
}

export type NominateActionRemoveNomination = {
    type: typeof NOMINATE_ACTION_REMOVE_NOMINATION,
    nominationId: string
}

export type NominateActionSubmit = {
    type: typeof NOMINATE_ACTION_SUBMIT,
}

export type NominateActionSubmitResponse = {
    type: typeof NOMINATE_ACTION_SUBMIT_RESPONSE,
    submissionId?: string,
    error?: string
}

export type NominateActionClear = {
    type: typeof NOMINATE_ACTION_CLEAR
}


export type NominateActionTypes = NominateActionUpdateQuery
    | NominateActionReceiveQueryResults
    | NominateActionAddNomination
    | NominateActionRemoveNomination
    | NominateActionSubmit
    | NominateActionSubmitResponse
    | NominateActionClear

export const updateQuery = (query: string): NominateActionUpdateQuery => ({
    type: NOMINATE_ACTION_UPDATE_QUERY,
    query
});

export const receiveQueryResults = (results: OMDbMovie[], error?: string) => ({
    type: NOMINATE_ACTION_RECEIVE_QUERY_RESULTS,
    results,
    error
});

export const addNomination = (nomination: OMDbMovie) => ({
    type: NOMINATE_ACTION_ADD_NOMINATION,
    nomination
});

export const removeNomination = (nominationId: string) => ({
    type: NOMINATE_ACTION_REMOVE_NOMINATION,
    nominationId
});

export const submitNominations = () => ({
    type: NOMINATE_ACTION_SUBMIT
});

export const submitNominationsResponse = (submissionId?: string, error?: string) => ({
    type: NOMINATE_ACTION_SUBMIT_RESPONSE,
    error,
    submissionId
});

export const clearSubmission = () => ({
    type: NOMINATE_ACTION_CLEAR
});
