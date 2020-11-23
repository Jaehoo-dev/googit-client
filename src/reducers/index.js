import { combineReducers } from 'redux';
import { SET_IS_PRIVATE_MODE, SET_IS_EDITOR_PAGE_TO_FALSE, SET_IS_EDITOR_PAGE_TO_TRUE, INIT_BRANCH_LIST, UPDATE_BRANCH_LIST } from '../constants/actionTypes';

const hasToken = (
  state = !!localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN),
  action,
) => {
  switch (action.type) {
    case 'setHasToken':
      return !!localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN);
    default:
      return state;
  }
};

const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'setCurrentUser':
      return action.user;
    default:
      return state;
  }
};

const isPrivateMode = (state = false, action) => {
  switch (action.type) {
    case SET_IS_PRIVATE_MODE:
      return !state;
    default:
      return state;
  }
};

const branchList = (state = [], action) => {
  switch (action.type) {
    case INIT_BRANCH_LIST:
      return action.payload;
    case UPDATE_BRANCH_LIST:
      console.log(action.payload, 'in reducer');
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const isShowModificationsMode = (state = false, action) => {
  switch (action.type) {
    case 'toggleShowChangesMode':
      return !state;
    default:
      return state;
  }
};

const isModified = (state = false, action) => {
  switch (action.type) {
    case 'setIsModifiedToTrue':
      return true;
    case 'setIsModifiedToFalse':
      return false;
    default:
      return state;
  }
};

const newBlocksCandidate = (state = null, action) => {
  switch (action.type) {
    case 'setNewBlocksCandidate':
      return action.newNote;
    case 'removeNewBlocksCandidate':
      return null;
    default:
      return state;
  }
};

const currentNote = (state = null, action) => {
  switch (action.type) {
    case 'setCurrentNoteAndBranch':
      return action.note;
    default:
      return state;
  }
};

const currentBranch = (state = null, action) => {
  switch (action.type) {
    case 'setCurrentNoteAndBranch':
      return action.branch;
    default:
      return state;
  }
};

const isEditorPage = (state = false, action) => {
  switch (action.type) {
    case SET_IS_EDITOR_PAGE_TO_TRUE:
      return true;
    case SET_IS_EDITOR_PAGE_TO_FALSE:
      return false;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  hasToken,
  currentUser,
  isPrivateMode,
  branchList,
  isShowModificationsMode,
  isModified,
  newBlocksCandidate,
  currentNote,
  currentBranch,
  isEditorPage,
});

export default function rootReducer(state, action) {
  if (action.type === 'initializeStore') {
    state = undefined;
  }

  return appReducer(state, action);
}
