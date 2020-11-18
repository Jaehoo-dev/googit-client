import { SET_IS_PRIVATE, INIT_NOTE_LIST } from '../constants';

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

export const initializeNoteList = noteList => ({
  type: INIT_NOTE_LIST,
  payload: noteList
});
