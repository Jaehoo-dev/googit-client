import { connect } from 'react-redux';
import EditorPage from '../pages/EditorPage';
import { toggleShowChangesMode, setIsChangedToTrue, setIsChangedToFalse, setNewNoteCandidate, removeNewNoteCandidate, setCurrentNote } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onShowChangesModeToggle() {
      dispatch(toggleShowChangesMode());
    },
    onNoteChange(newNote, isChanged) {
      dispatch(setNewNoteCandidate(newNote));
      if (isChanged) return;
      dispatch(setIsChangedToTrue());
    },
    onSave(note) {
      dispatch(setIsChangedToFalse());
      dispatch(removeNewNoteCandidate());
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
    // isLatestNote: state.isLastNote,
    newNoteCandidate: state.newNoteCandidate,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
