import dayjs from 'dayjs';
import { RootState } from 'redux/types';

export const getLastUpdateOfWhatsNew = (store: RootState) => store.content.lastUpdateOfWhatsNew;

export const getLastClickOnWhatsNew = (store: RootState) => store.content.lastClickOnWhatsNew;

export const getShouldDisplayWhatsNewNotification = (store: RootState) => {
    const lastClickOnWhatsNew = getLastClickOnWhatsNew(store);
    const lastUpdateOfWhatsNew = getLastUpdateOfWhatsNew(store);
    if (!lastClickOnWhatsNew) {
        // display notification to the user if he has never clicked on the link
        return true;
    }
    if (!lastUpdateOfWhatsNew) {
        return false;
    }
    return dayjs(lastClickOnWhatsNew).isBefore(dayjs(lastUpdateOfWhatsNew));
};
