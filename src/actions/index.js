import { SETISPRIVATE } from '../constants';

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
  type: SETISPRIVATE
});
