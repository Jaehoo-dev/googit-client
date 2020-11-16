import { combineReducers } from 'redux';

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

const appReducer = combineReducers({
  hasToken,
  currentUser,
});

export default function rootReducer(state, action) {
  if (action.type === 'initializeStore') {
    state = undefined;
  }

  return appReducer(state, action);
}
