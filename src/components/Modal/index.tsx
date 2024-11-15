import TextForm from "./components/TextForm";
import { useForm } from "react-hook-form";
import { useApiNotes } from "@/hooks/useApiNotes";
import CloseModalButton from "./components/CloseModalButton";

const Modal = ({ isOpen, setIsOpen, noteTypeToDisplay, note, isEditMode = false }: Modal.ModalProps) => {

  const { createNote, updateNote } = useApiNotes();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    reset,
    formState: { errors },
    getValues
  } = useForm<Notes.Types.TextNote>()

  const resetForm = () => {
    toggleModal();
    reset();
  }

  const onSubmit = () => {
    const data = getValues()
    if (isEditMode) {
      updateNote({ ...note, ...data });
    } else {
      createNote({ ...data, type: noteTypeToDisplay?.type || '' });
    }
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
            <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <section className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <CloseModalButton isOpen={isOpen} toggleModal={resetForm} />
              </section>
              <section className="p-4 md:p-5 space-y-4">
                {isEditMode && note && <TextForm register={register} errors={errors} note={note} onSubmit={onSubmit} />}
                {(!isEditMode && noteTypeToDisplay?.type === 'text') && <TextForm register={register} errors={errors} onSubmit={onSubmit} />}
              </section>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;