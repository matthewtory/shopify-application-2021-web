import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { debounceTime, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import omdbRepository from 'data/repository/omdbRepository';
import firebaseRepository from 'data/repository/firebaseRepository';
import { AppState } from '../index';
import {
    NominateActionUpdateQuery,
    NOMINATE_ACTION_UPDATE_QUERY,
    receiveQueryResults,
    NOMINATE_ACTION_SUBMIT_RESPONSE,
    NOMINATE_ACTION_SUBMIT,
    NominateActionSubmit,
    submitNominationsResponse,
    NominateActionSubmitResponse,
    clearSubmission
} from './actions';

const updateQueryEpic: Epic<Action, Action, AppState> = (action$, state$) => action$.pipe(
    ofType<Action, NominateActionUpdateQuery>(NOMINATE_ACTION_UPDATE_QUERY),
    debounceTime(200),
    switchMap(async action => {
        try {
            const results = await omdbRepository.queryMovies(action.query);

            return receiveQueryResults(results);
        } catch (e) {
            return receiveQueryResults([], e.message);
        }
    })
);

const submitNominationsEpic: Epic<Action, Action, AppState> = (action$, state$) => action$.pipe(
    ofType<Action, NominateActionSubmit>(NOMINATE_ACTION_SUBMIT),
    withLatestFrom(state$),
    filter(([_, s]) => s.nominate.isSubmitting),
    switchMap(async ([_, state]) => {
        try {
            const submissionId = await firebaseRepository.submitNominations(state.nominate.nominations);

            return submitNominationsResponse(submissionId);
        } catch (e) {
            return submitNominationsResponse(undefined, e.message);
        }
    })
);

const clearSubmissionEpic: Epic<Action, Action, AppState> = (action$, state$) => action$.pipe(
    ofType<Action, NominateActionSubmitResponse>(NOMINATE_ACTION_SUBMIT_RESPONSE),
    withLatestFrom(state$),
    filter(([_, state]) => !!state.nominate.submissionId),
    map(() => clearSubmission())
);


export default [
    updateQueryEpic,
    submitNominationsEpic,
    clearSubmissionEpic
];