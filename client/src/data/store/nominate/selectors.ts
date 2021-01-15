import { AppState } from '../index';
import { NOMINATION_COUNT } from './index';

export const getNominationQuery = (state: AppState) => state.nominate.query;
export const getNominationQueryResults = (state: AppState) => state.nominate.results;
export const getNominations = (state: AppState) => state.nominate.nominations;
export const isFinished = (state: AppState) => state.nominate.nominations.length === NOMINATION_COUNT;