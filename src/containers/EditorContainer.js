import { connect } from 'react-redux';
import EditorPage from '../pages/EditorPage';
import {
  toggleShowChangesMode,
  setIsModifiedToTrue,
  setIsModifiedToFalse,
  setNewBlocksCandidate,
  removeNewBlocksCandidate,
  setCurrentNoteAndBranch,
  setSharedUsers,
  resetModificationStates,
  setCurrentUser,
  setPreviousNote,
  setBranchList,
  updateBranchList,
} from '../actions';
import requestNote from '../api/requestNote';
import compareNoteChanges from '../utils/compareNoteChanges';

function mapDispatchToProps(dispatch) {
  return {
    async onShowModificationsModeToggle(userId, currentNote) {
      const previousNote = await requestNote(userId, currentNote.previous_version);
      console.log(previousNote);
      console.log(currentNote);

      compareNoteChanges(previousNote, currentNote);

      let comparedNoteValue;
      // dispatch(toggleShowChangesMode(comparedNoteValue));
    },
    onNoteModify(blocks, isModified) {
      dispatch(setNewBlocksCandidate(blocks));
      if (isModified) return;
      dispatch(setIsModifiedToTrue());
    },
    onSave(note, branch) {
      dispatch(setIsModifiedToFalse());
      dispatch(removeNewBlocksCandidate());
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onNoteLoad(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onNoteChange(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onSharedUsersLoad(sharedUsers) {
      dispatch(setSharedUsers(sharedUsers));
    },
    onHomeButtonClick() {
      dispatch(resetModificationStates());
      dispatch(setCurrentNoteAndBranch(null, null));
    },
    onDeleteBranch(user) {
      dispatch(setCurrentUser(user));
      dispatch(setCurrentNoteAndBranch(null, null));
      dispatch(resetModificationStates());
    },
    setPreviousNote(note) {
      if (!note) return;
      dispatch(setPreviousNote(note));
    },
    onSetBranchList(branchList) {
      dispatch(setBranchList(branchList));
    },
    onUpdateBranchList(branchList) {
      dispatch(updateBranchList(branchList));
    },
    onSharedUsersPermissionUpdate(sharedUsers) {
      dispatch(setSharedUsers(sharedUsers));
    }
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentBranch: state.currentBranch,
    currentNote: state.currentNote,
    previousNote: state.previousNote,
    isShowModificationsMode: state.isShowModificationsMode,
    isModified: state.isModified,
    newBlocksCandidate: state.newBlocksCandidate,
    authorName: state.authorName,
    sharedUsers: state.sharedUsers,
    isPrivateMode: state.isPrivateMode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
