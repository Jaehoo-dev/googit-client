import { connect } from 'react-redux';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivateMode, setNoteListEntryInfos, setCurrentNoteAndBranch, updateNoteListEntryInfos } from '../actions';

import App from '../components/App';

function mapDispatchToProps(dispatch) {
  return {
    onLogin(user) {
      dispatch(setHasToken());
      dispatch(setCurrentUser(user));
    },
    onLogout() {
      dispatch(initializeStore());
    },
    onCreateBranch(user) {
      dispatch(setCurrentUser(user));
    },
    togglePrivateMode() {
      dispatch(setIsPrivateMode());
    },
    onSetNoteList(noteListEntryInfos) {
      console.log('set');
      dispatch(setNoteListEntryInfos(noteListEntryInfos));
    },
    onUpdateNoteList(noteListEntryInfos) {
      console.log('update');
      dispatch(updateNoteListEntryInfos(noteListEntryInfos));
    },
    onNoteListEntryClick(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivateMode: state.isPrivateMode,
    noteListEntryInfos: state.noteListEntryInfos,
    currentNote: state.currentNote,
    isModified: state.isModified,
    sharedUsers: state.sharedUsers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
