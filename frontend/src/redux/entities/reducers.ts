import { combineReducers } from 'redux';
import { reducer as pages } from './pages';
import { reducer as projects } from './projects';

export default combineReducers({
    projects,
    pages,
});
