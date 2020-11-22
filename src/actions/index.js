import { SET_IS_PRIVATE_MODE, INIT_BRANCH_LIST } from '../constants/actionTypes';

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

export const setIsPrivateMode = () => ({
  type: SET_IS_PRIVATE_MODE,
});

export const initializeBranchList = noteList => ({
  type: INIT_BRANCH_LIST,
  payload: noteList
});

export const toggleShowChangesMode = () => ({
  type: 'toggleShowChangesMode',
});

export const setIsModifiedToTrue = () => ({
  type: 'setIsModifiedToTrue',
});

export const setIsModifiedToFalse = () => ({
  type: 'setIsModifiedToFalse',
});

export const setNewBlocksCandidate = newNote => ({
  type: 'setNewBlocksCandidate',
  newNote,
});

export const removeNewBlocksCandidate = () => ({
  type: 'removeNewBlocksCandidate',
});

export const setCurrentNoteAndBranch = (note, branch) => ({
  type: 'setCurrentNoteAndBranch',
  note,
  branch,
});
