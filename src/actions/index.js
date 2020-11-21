import { SET_IS_PRIVATE, INIT_BRANCH_LIST } from '../constants/actionTypes';

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

export const toggleShowChangesMode = () => ({
  type: 'toggleShowChangesMode',
});

export const setIsChangedToTrue = () => ({
  type: 'setIsChangedToTrue',
});

export const setIsChangedToFalse = () => ({
  type: 'setIsChangedToFalse',
});

export const setNewNoteCandidate = newNote => ({
  type: 'setNewNoteCandidate',
  newNote,
});

export const removeNewNoteCandidate = () => ({
  type: 'removeNewNoteCandidate',
});

export const setCurrentNote = note => ({
  type: 'setCurrentNote',
  note,
});
