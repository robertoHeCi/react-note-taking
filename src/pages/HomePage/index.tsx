import Modal from "@/components/Modal";
import Toolbar from "@/components/Toolbar";
import { useModal } from "@/hooks/useModal";

const HomePage = () => {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
      <Toolbar setIsModalOpen={setIsModalOpen} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}

export default HomePage;

