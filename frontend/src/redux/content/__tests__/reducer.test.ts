import { fetchLastUpdateOfWhatsNew } from '../actions';
import reducer, { ContentState } from '../reducer';

describe('Content reducers', () => {
    describe('FETCH_LAST_UPDATE_WHATSNEW_SUCCESS case', () => {
        const initialState: ContentState = {
            lastUpdateOfWhatsNew: null,
        }

        it('should properly update the store with the value from the api', () => {
            const action = fetchLastUpdateOfWhatsNew.success({
                lastUpdateNewsLetter: "2019-06-20T09:38:36Z",
            });

            expect(reducer(initialState, action)).toEqual({
                lastUpdateOfWhatsNew: "2019-06-20T09:38:36Z",
            })
        });
    });
});