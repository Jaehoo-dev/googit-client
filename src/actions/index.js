import { SET_IS_PRIVATE_MODE, ADD_BRANCH_LIST } from '../constants/actionTypes';

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

export const addBranchList = branchList => ({
  type: ADD_BRANCH_LIST,
  payload: branchList
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

export const setNewBlocksCandidate = newNote => ({
  type: 'setNewBlocksCandidate',
  newNote,
});

export const removeNewBlocksCandidate = () => ({
  type: 'removeNewBlocksCandidate',
});

export const setCurrentNote = note => ({
  type: 'setCurrentNote',
  note,
});
