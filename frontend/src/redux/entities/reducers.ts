import { combineReducers } from 'redux';
import { reducer as pages } from './pages';
import { reducer as projects } from './projects';
import { reducer as scripts } from './scripts';


export default combineReducers({
    projects,
    pages,
    scripts,
});
