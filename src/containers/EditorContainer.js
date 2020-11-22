import { connect } from 'react-redux';
import EditorPage from '../pages/EditorPage';
import {
  toggleShowChangesMode,
  setIsChangedToTrue,
  setIsChangedToFalse,
  setNewBlocksCandidate,
  removeNewBlocksCandidate,
  setCurrentNote,
} from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onShowChangesModeToggle() {
      dispatch(toggleShowChangesMode());
    },
    onNoteChange(blocks, isChanged) {
      dispatch(setNewBlocksCandidate(blocks));
      if (isChanged) return;
      dispatch(setIsChangedToTrue());
    },
    onSave(note) {
      dispatch(setIsChangedToFalse());
      dispatch(removeNewBlocksCandidate());
      dispatch(setCurrentNote(note));
    },
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentNote: state.currentNote,
    isShowChangesMode: state.isShowChangesMode,
    isChanged: state.isChanged,
    newBlocksCandidate: state.newBlocksCandidate,
    authorName: state.authorName,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
