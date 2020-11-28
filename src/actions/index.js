import {
  SET_IS_PRIVATE_MODE,
  UPDATE_NOTE_LIST_ENTRY_INFOS,
  SET_NOTE_LIST_ENTRY_INFOS,
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

export const toggleShowModificationsMode = () => ({
  type: 'toggleShowModificationsMode',
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

export const updateNoteListEntryInfos = noteListEntryInfos => ({
  type: UPDATE_NOTE_LIST_ENTRY_INFOS,
  payload: noteListEntryInfos
});

export const setNoteListEntryInfos = noteListEntryInfos => ({
  type: SET_NOTE_LIST_ENTRY_INFOS,
  payload: noteListEntryInfos
});

export const setSharedUsers = sharedUsers => ({
  type: SET_SHARED_USERS,
  sharedUsers,
});

export const resetModificationStates = () => ({
  type: 'resetModificationStates',
});
