import TextNoteSummary from "../TextNoteSummary";
import TodoListNoteSummary from "../TodoListNoteSummary";

type NoteType = Notes.Types.TextNote | Notes.Types.TodoListNote;

const RenderNoteByType = ({ note, onClick }: { note: NoteType, onClick: (note: NoteType) => void }) => {

  type NoteTypeProps = {
    note: NoteType,
    onClick: (note: NoteType) => void
  }

  const noteTypeProps: { [key: string]: { component: React.ElementType, props: NoteTypeProps } } = {
    "text": {
      component: TextNoteSummary,
      props: { note: note as Notes.Types.TextNote, onClick: () => onClick(note as Notes.Types.TextNote) },
    },
    "todo": {
      component: TodoListNoteSummary,
      props: { note: note as Notes.Types.TodoListNote, onClick: () => onClick(note as Notes.Types.TodoListNote) },
    }
  }

  const { component: NoteComponent, props } = noteTypeProps[note.type];


  return <NoteComponent {...props} />;
}

export default RenderNoteByType;