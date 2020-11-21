import { connect } from 'react-redux';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivate, initializeBranchList } from '../../actions';
import App from '../../components/App';

function mapDispatchToProps(dispatch) {
  return {
    onLogin(user) {
      dispatch(setHasToken());
      dispatch(setCurrentUser(user));
    },
    onLogout() {
      dispatch(initializeStore());
    },
    onCreateBranch(updatedUser) {
      dispatch(setCurrentUser(updatedUser));
    },
    togglePrivateMode() {
      dispatch(setIsPrivate());
    },
    getBranchList(branchList) {
      dispatch(initializeBranchList(branchList)); //naming
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivate: state.isPrivate,
    noteList: state.noteList,
    currentNote: state.currentNote,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
