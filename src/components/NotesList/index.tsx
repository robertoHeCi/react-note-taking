import TextNoteSummary from "@/components/NotesList/components/TextNoteSummary";
import { useApiNotes } from "@/hooks/useApiNotes";
import { isValidJson } from "@/utils/isValidJSON";
import { parseNote } from "@/utils/parseNote";
import ErrorMessage from "../ErrorMessage";
import { LoadingIcon } from "../Icons";
import TodoListNoteSummary from "@/components/NotesList/components/TodoListNoteSummary";
interface NotesListProps {
  onNoteClick: (note: Notes.Types.TextNote) => void;
}

export const NotesList = ({ onNoteClick }: NotesListProps) => {
  const { notes, error, isLoading } = useApiNotes();

  const parsedNotes = notes?.filter(isValidJson)?.map(parseNote);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {parsedNotes?.map((note: Notes.Types.TextNote | Notes.Types.TodoListNote) => (
          note.type === 'text' ? <TextNoteSummary 
            key={note.id}
            note={note as Notes.Types.TextNote}
            onClick={() => onNoteClick(note as Notes.Types.TextNote)}
          /> : note.type === 'todo' ? <TodoListNoteSummary
            key={note.id}
            note={note as Notes.Types.TodoListNote}
          /> : null
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {error && <ErrorMessage error={error?.message} />}
        {isLoading && <div className="flex items-center justify-center ">
          <LoadingIcon /> <p className="ml-2">Loading notes...</p>
        </div>}
      </div>
    </>
  );
};
