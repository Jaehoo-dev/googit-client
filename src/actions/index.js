import {
  SET_IS_PRIVATE_MODE,
  SET_BRANCH_LIST,
  UPDATE_BRANCH_LIST,
  SET_SHARED_USERS,
} from '../constants/actionTypes';

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

export const toggleShowChangesMode = comparedNoteValue => ({
  type: 'toggleShowChangesMode',
  comparedNoteValue,
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

export const setCurrentNoteAndBranch = (note, branch) => {
  return ({
    type: 'setCurrentNoteAndBranch',
    note,
    branch,
  });
};

export const updateBranchList = branchList => ({
  type: UPDATE_BRANCH_LIST,
  payload: branchList
});

export const setBranchList = branchList => ({
  type: SET_BRANCH_LIST,
  payload: branchList
});

export const setSharedUsers = sharedUsers => ({
  type: SET_SHARED_USERS,
  sharedUsers,
});

export const resetModificationStates = () => ({
  type: 'resetModificationStates',
});

export const setPreviousNote = note => ({
  type: 'setPreviousNote',
  note,
});
