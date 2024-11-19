import { useApiNotes } from "@/hooks/useApiNotes";
import { isValidJson } from "@/utils/isValidJSON";
import { parseNote } from "@/utils/parseNote";
import ErrorMessage from "../../Common/ErrorMessage";
import { LoadingIcon } from "../../Common/Icons";
import sortNotesByDate from "@/utils/sortNotesByDate";
import RenderNoteByType from "./components/NoteTypeRenderer";
type NotesListProps = {
  onNoteClick: (note: Notes.Types.TextNote | Notes.Types.TodoListNote) => void;
}

const NotesList = ({ onNoteClick }: NotesListProps) => {
  const { notes, error, isLoading } = useApiNotes();
  const parsedNotes = notes?.filter(isValidJson)?.map(parseNote);
  const sortedNotes = sortNotesByDate(parsedNotes);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {sortedNotes?.map((note: Notes.Types.TextNote | Notes.Types.TodoListNote) => (
          <RenderNoteByType key={note.id} note={note} onClick={onNoteClick} />
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

export default NotesList;