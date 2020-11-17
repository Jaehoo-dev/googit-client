import { combineReducers } from 'redux';
import { SET_IS_PRIVATE, INIT_NOTE_LIST } from '../constants';

const hasToken = (
  state = !!localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN),
  action,
) => {
  switch (action.type) {
    case 'setHasToken':
      return (state = !!localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN));
    default:
      return state;
  }
};

const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'setCurrentUser':
      return (state = action.user);
    default:
      return state;
  }
};

const isPrivate = (state = false, action) => {
  switch (action.type) {
    case SET_IS_PRIVATE:
      return !state;
    default:
      return state;
  }
}

const noteList = (state = [], action) => {
  switch (action.type) {
    case INIT_NOTE_LIST:
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  hasToken,
  currentUser,
  isPrivate,
  noteList
});

export default function rootReducer(state, action) {
  if (action.type === 'initializeStore') {
    state = undefined;
  }

  return appReducer(state, action);
}
