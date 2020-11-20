import { SET_IS_PRIVATE, INIT_BRANCH_LIST } from '../constants';

export const setCurrentUser = user => ({
  type: 'setCurrentUser',
  user,
});

export const setHasToken = () => ({
  type: 'setHasToken',
});

export const initializeStore = () => ({
  type: 'initializeStore',
});

export const setIsPrivate = () => ({
  type: SET_IS_PRIVATE,
});

export const initializeBranchList = noteList => ({
  type: INIT_BRANCH_LIST,
  payload: noteList
});
