import { connect } from 'react-redux';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivateMode, setBranchList } from '../actions';
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
    onCreateBranch(updatedUser) {
      dispatch(setCurrentUser(updatedUser));
    },
    togglePrivateMode() {
      dispatch(setIsPrivateMode());
    },
    onFetchBranchList(branchList) {
      dispatch(setBranchList(branchList));
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivateMode: state.isPrivateMode,
    branchList: state.branchList,
    currentNote: state.currentNote,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
