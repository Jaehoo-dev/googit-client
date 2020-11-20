import { combineReducers } from 'redux';
import { SET_IS_PRIVATE, INIT_BRANCH_LIST } from '../constants';

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
};

const branchList = (state = [], action) => {
  switch (action.type) {
    case INIT_BRANCH_LIST:
      return action.payload;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  hasToken,
  currentUser,
  isPrivate,
  branchList
});

export default function rootReducer(state, action) {
  if (action.type === 'initializeStore') {
    state = undefined;
  }

  return appReducer(state, action);
}
