import { NoteType } from "@/hooks/useNote";
import TextForm from "./components/TextForm";
import { useForm } from "react-hook-form";
import { useApiNotes } from "@/hooks/useApiNotes";
import CloseModalButton from "./components/CloseModalButton";
import { ModalHandlerButtons } from "./components/ModalHandlerButtons";

const Modal = ({ isOpen, setIsOpen, noteToDisplay }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, noteToDisplay: NoteType | null }) => {

  const { createNote } = useApiNotes();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Notes.Types.TextNote>()

  const resetForm = () => {
    toggleModal();
    reset();
  }

  const onSubmit = (data: Notes.Types.TextNote) => {
    createNote({ ...data, type: noteToDisplay?.type || '' });
    resetForm()
  };

  return (
    <>
      {isOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div className="relative p- w-11/12 max-h-full animate-slide-up">
            <form className="relative bg-white rounded-lg shadow dark:bg-gray-700" onSubmit={handleSubmit(onSubmit)}>
              <section className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <CloseModalButton isOpen={isOpen} toggleModal={toggleModal} />
              </section>
              <section className="p-4 md:p-5 space-y-4">
                {noteToDisplay?.type === 'text' && <TextForm register={register} errors={errors} />}
              </section>
              <section className="flex items-end justify-end gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <ModalHandlerButtons resetForm={resetForm} />
              </section>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;