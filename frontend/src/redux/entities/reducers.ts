import { combineReducers } from 'redux';
import { reducer as projects } from './projects';
import { EntitiesAction, EntitiesState } from './types';

export default function createReducer() {
    return combineReducers<EntitiesState, EntitiesAction>({
        projects,
    });
}
