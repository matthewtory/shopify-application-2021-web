import produce from 'immer';

import { OMDbMovie } from 'data/repository/omdbRepository';
import { AppAction } from '../index';
import {
    NOMINATE_ACTION_ADD_NOMINATION,
    NOMINATE_ACTION_CLEAR,
    NOMINATE_ACTION_RECEIVE_QUERY_RESULTS,
    NOMINATE_ACTION_REMOVE_NOMINATION,
    NOMINATE_ACTION_SUBMIT,
    NOMINATE_ACTION_SUBMIT_RESPONSE,
    NOMINATE_ACTION_UPDATE_QUERY
} from './actions';

export type NominateState = {
    query: string,
    results: OMDbMovie[] | null,
    nominations: OMDbMovie[],
    error?: string,
    isSubmitting: boolean,
    submissionId?: string
}

const initialState: NominateState = {
    query: '',
    results: [],
    nominations: [],
    isSubmitting: false
};

export const NOMINATION_COUNT = 5;

const nominateReducer = (state = initialState, action: AppAction) => {
    switch (action.type) {
        case NOMINATE_ACTION_UPDATE_QUERY:
            return produce(state, draft => {
                draft.query = action.query;
                draft.results = null;
            });
        case NOMINATE_ACTION_RECEIVE_QUERY_RESULTS:
            return produce(state, draft => {
                draft.results = action.results;
                draft.error = action.error;
            });
        case NOMINATE_ACTION_ADD_NOMINATION:
            return produce(state, draft => {
                if (draft.nominations.length < NOMINATION_COUNT
                    && !draft.nominations.find(n => n.imdbID === action.nomination.imdbID)) {
                    draft.nominations.push(action.nomination);
                    draft.query = '';
                    draft.results = [];
                }
            });
        case NOMINATE_ACTION_REMOVE_NOMINATION:
            return produce(state, draft => {
                const atIndex = draft.nominations.findIndex(n => n.imdbID === action.nominationId);
                if (atIndex >= 0) {
                    draft.nominations.splice(atIndex, 1);
                }
            });
        case NOMINATE_ACTION_SUBMIT:
            return produce(state, draft => {
                draft.isSubmitting = true;
                draft.submissionId = undefined;
                draft.error = undefined;
            });
        case NOMINATE_ACTION_SUBMIT_RESPONSE:
            return produce(state, draft => {
                draft.isSubmitting = false;
                draft.submissionId = action.submissionId;
                draft.error = action.error;
            });
        case NOMINATE_ACTION_CLEAR:
            return initialState;
        default:
            return state;
    }
};

export default nominateReducer;