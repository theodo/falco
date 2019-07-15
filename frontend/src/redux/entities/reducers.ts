import { combineReducers } from 'redux';
import { reducer as auditParameters } from './auditParameters';
import { reducer as audits } from './audits';
import { reducer as auditStatusHistories } from './auditStatusHistories';
import { reducer as pages } from './pages';
import { reducer as projects } from './projects';
import { reducer as scripts } from './scripts';


export default combineReducers({
    projects,
    pages,
    scripts,
    audits,
    auditParameters,
    auditStatusHistories,
});
