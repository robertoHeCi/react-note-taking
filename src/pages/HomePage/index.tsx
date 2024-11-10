import Modal from "@/components/Modal";
import Toolbar from "@/components/Toolbar";
import { useModal } from "@/hooks/useModal";
import useNote from "@/hooks/useNote";

const HomePage = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { noteToDisplay, setNoteToDisplayByType } = useNote();

  const handleClick = (type: string) => {
    setNoteToDisplayByType(type);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
      <Toolbar handleClick={handleClick} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} noteToDisplay={noteToDisplay} />
    </div>
  )
}

export default HomePage;

