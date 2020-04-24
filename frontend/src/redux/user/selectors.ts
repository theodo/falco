import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';

const getUser = (store: RootState) => store.user;

export const useCurrentUser = () => useSelector(getUser);
