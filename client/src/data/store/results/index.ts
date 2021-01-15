import produce from 'immer';

import { OMDbMovie } from 'data/repository/omdbRepository';
import { MovieNominationResult } from 'data/repository/firebaseRepository';
import { AppAction } from '../index';
import {
    RESULTS_ACTION_CLEAR_SUBMISSION,
    RESULTS_ACTION_FETCH_RESULTS,
    RESULTS_ACTION_FETCH_SUBMISSION,
    RESULTS_ACTION_RECEIVE_RESULTS,
    RESULTS_ACTION_RECEIVE_SUBMISSION
} from './actions';

export type ResultsState = {
    hasSubmission: boolean
    submission?: OMDbMovie[],
    results?: MovieNominationResult[],
    error?: string
}

const initialState: ResultsState = {
    hasSubmission: false
};

const resultsReducer = (state = initialState, action: AppAction) => {
    switch (action.type) {
        case RESULTS_ACTION_FETCH_SUBMISSION:
            return produce(state, draft => {
                draft.hasSubmission = true;
                draft.submission = undefined;
            });
        case RESULTS_ACTION_RECEIVE_SUBMISSION:
            return produce(state, draft => {
                draft.error = action.error;
                draft.submission = action.submission ?? [];
            });
        case RESULTS_ACTION_CLEAR_SUBMISSION:
            return produce(state, draft => {
                draft.error = undefined;
                draft.submission = undefined;
                draft.hasSubmission = false;
            });
        case RESULTS_ACTION_FETCH_RESULTS:
            return produce(state, draft => {
                draft.results = undefined;
            });
        case RESULTS_ACTION_RECEIVE_RESULTS:
            return produce(state, draft => {
                draft.results = action.results;
                draft.error = action.error;
            });
        default:
            return state;
    }
};

export default resultsReducer;