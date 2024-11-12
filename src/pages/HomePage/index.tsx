import Modal from "@/components/Modal";
import Note from "@/components/Note";
import Toolbar from "@/components/Toolbar";
import { useApiNotes } from "@/hooks/useApiNotes";
import { useModal } from "@/hooks/useModal";
import useNote from "@/hooks/useNote";

const HomePage = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { noteToDisplay, setNoteToDisplayByType } = useNote();
  const { notes } = useApiNotes();

  const handleClick = (type: string) => {
    setNoteToDisplayByType(type);
    setIsModalOpen(!isModalOpen);
  }
  
  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
      <Toolbar handleClick={handleClick} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} noteToDisplay={noteToDisplay} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {notes?.map((note: { body: string }) => (
          <Note body={note.body} />
        ))}
      </div>
    </div>
  )
}

export default HomePage;

