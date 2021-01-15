import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AppState } from '../index';
import {
    receiveResults,
    receiveSubmission,
    RESULTS_ACTION_FETCH_RESULTS,
    RESULTS_ACTION_FETCH_SUBMISSION, ResultsActionFetchResults,
    ResultsActionFetchSubmission
} from './actions';
import firebaseRepository from 'data/repository/firebaseRepository';

const fetchSubmissionEpic: Epic<Action, Action, AppState> = (action$, state$) => action$.pipe(
    ofType<Action, ResultsActionFetchSubmission>(RESULTS_ACTION_FETCH_SUBMISSION),
    switchMap((action) => firebaseRepository.getSubmission(action.submissionId).pipe(
        map(submission => receiveSubmission(submission)),
        catchError(e => of(receiveSubmission(undefined, e.message)))
    ))
);

const fetchResultsEpic: Epic<Action, Action, AppState> = (action$, state$) => action$.pipe(
    ofType<Action, ResultsActionFetchResults>(RESULTS_ACTION_FETCH_RESULTS),
    switchMap(() => firebaseRepository.getResults().pipe(
        map(submission => receiveResults(submission)),
        catchError(e => of(receiveResults(undefined, e.message)))
    ))
);

export default [
    fetchSubmissionEpic,
    fetchResultsEpic
];