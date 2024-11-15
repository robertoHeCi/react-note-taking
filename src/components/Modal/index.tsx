import TextForm from "./components/TextForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useApiNotes } from "@/hooks/useApiNotes";

const Modal = ({ isOpen, setIsOpen, noteTypeToDisplay, note, isEditMode = false }: Modal.ModalProps) => {

  const { createNote, updateNote } = useApiNotes();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    reset,
    handleSubmit
  } = useForm<Notes.Types.TextNote>()

  const resetForm = () => {
    toggleModal();
    reset();
  }

  const onSubmit: SubmitHandler<Notes.Types.TextNote> = (data: Notes.Types.TextNote) => {
    if (isEditMode) {
      updateNote({ ...note, ...data });
    } else {
      if (data.title || data.content) {
        createNote({ ...data, type: noteTypeToDisplay?.type || '' });
      }
    }
  }

  const onCreateSubmit = async () => {
    await handleSubmit(onSubmit)()
    resetForm();
  }

  return (
    <>
      {isOpen && (
        <div
          id="text-note-modal"
          aria-hidden="true"
          className="overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 bg-black bg-opacity-50"
        >
          <form className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-11/12 max-h-full animate-slide-up" onSubmit={onCreateSubmit}>
            <section className="p-4 md:p-5 space-y-4">
              {isEditMode && note && <TextForm register={register} note={note} onSubmit={handleSubmit(onSubmit)} isEditMode={isEditMode} />}
              {(!isEditMode && noteTypeToDisplay?.type === 'text') && <TextForm register={register} onSubmit={handleSubmit(onSubmit)} isEditMode={isEditMode} />}
            </section>
            <section className="flex justify-end p-4 md:p-5">
              <button
                data-modal-hide="text-note-modal"
                type="submit"
                className="bg-transparent dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-300 hover:bg-opacity-20 dark:hover:bg-gray-300 dark:hover:bg-opacity-20 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300"
              >
                Close
              </button>
            </section>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;