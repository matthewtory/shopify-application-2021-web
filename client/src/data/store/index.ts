import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth, { initializeAuth } from './auth';
import nominate from './nominate';
import results from './results';
import nominateEpics from './nominate/epics';
import resultsEpics from './results/epics';
import { AuthActionTypes } from './auth/actions';
import { ResultsActionTypes } from './results/actions';
import { NominateActionTypes } from './nominate/actions';


export type AppState = ReturnType<typeof rootReducer>
export type AppAction = AuthActionTypes | NominateActionTypes | ResultsActionTypes

const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();
const rootEpic = combineEpics(...[
    ...nominateEpics,
    ...resultsEpics
]);

const rootReducer = combineReducers({
    auth,
    nominate,
    results
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
);

initializeAuth(store);

epicMiddleware.run(rootEpic);

export default store;