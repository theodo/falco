import dayjs from 'dayjs';
import { RootState } from 'redux/types';

export const getLastUpdateOfWhatsNew = (store: RootState) => store.content.lastUpdateOfWhatsNew;

export const getLastClickOnWhatsNew = (store: RootState) => store.content.lastClickOnWhatsNew;

export const getShouldDisplayWhatsNewNotification = (store: RootState) => {
    /**
     * this function allows to select whether the user has cliked on the
     * "what's new" link since the last update (got from the server)
     * 3 use cases :
     * - The user has never clicked on the link => display notification
     * - No update date has been received from the server => don't display notification
     * - Display notification if the date of the last click is before the date of the last update
     */
    const lastClickOnWhatsNew = getLastClickOnWhatsNew(store);
    const lastUpdateOfWhatsNew = getLastUpdateOfWhatsNew(store);
    if (!lastClickOnWhatsNew) {
        return true;
    }
    if (!lastUpdateOfWhatsNew) {
        return false;
    }
    return dayjs(lastClickOnWhatsNew).isBefore(dayjs(lastUpdateOfWhatsNew));
};
