import ErrorMessage from "@/components/ErrorMessage";
import { LoadingIcon } from "@/components/Icons";
import Modal from "@/components/Modal";
import TextNote from "@/components/TextNote";
import Toolbar from "@/components/Toolbar";
import { useApiNotes } from "@/hooks/useApiNotes";
import { useModal } from "@/hooks/useModal";
import useNote from "@/hooks/useNote";
import { isValidJson } from "@/utils/isValidJSON";
import { parseNote } from "@/utils/parseNote";
import { useState } from "react";

const HomePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { isModalOpen, setIsModalOpen } = useModal();
  const { noteTypeToDisplay, setNoteTypeToDisplayByType } = useNote();
  const [noteToDisplay, setNoteToDisplay] = useState<Notes.Types.TextNote>();
  const { notes, error, isLoading } = useApiNotes();

  const parsedNotes = notes?.filter(isValidJson)?.map(parseNote);


  const handleCreateClick = (type: string) => {
    setIsEditMode(false);
    setNoteTypeToDisplayByType(type);
    setIsModalOpen(!isModalOpen);
  }

  const handleEditClick = (note: Notes.Types.TextNote) => {
    setIsEditMode(true);
    setNoteToDisplay(note);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
      <Toolbar handleClick={handleCreateClick} />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isEditMode={isEditMode}
        {...noteTypeToDisplay && { noteTypeToDisplay }}
        {...noteToDisplay && { note: noteToDisplay }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {parsedNotes?.map((note: Notes.Types.TextNote) => (
          <TextNote key={note.id} note={note} onClick={handleEditClick} />
        ))}
      </div>
      {error && <ErrorMessage error={error.message} />}
      {isLoading && <div className="flex items-center justify-center">
        <LoadingIcon /> <p className="ml-2">Loading notes...</p>
      </div>}
    </div>
  )
}

export default HomePage;

