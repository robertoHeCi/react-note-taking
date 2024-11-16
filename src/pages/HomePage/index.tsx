import Modal from "@/components/Modal";
import { NotesList } from "@/components/NotesList";
import CreateForm from "@/components/NoteTextForm/components/CreateForm";
import EditForm from "@/components/NoteTextForm/components/EditForm";
import Toolbar from "@/components/Toolbar";
import { useApiNotes } from "@/hooks/useApiNotes";
import { useModal } from "@/hooks/useModal";
import { SubmitHandler, useFormContext } from "react-hook-form";

const HomePage = () => {
  const { isModalOpen, isEditMode, openCreateMode, openEditMode, noteToDisplay, onCloseModal } = useModal({ setNoteTypeToDisplayByType: () => { } });
  const { createNote, updateNote } = useApiNotes();
  const { handleSubmit } = useFormContext<Notes.Types.TextNote>();


  const onCreateSubmit: SubmitHandler<Notes.Types.TextNote> = (data: Notes.Types.TextNote) => {
    if (data.title || data.content) {
      createNote({ ...data, type: 'text' });
    }
  }

  const onEditSubmit: SubmitHandler<Notes.Types.TextNote> = (data: Notes.Types.TextNote) => {
    updateNote({ ...noteToDisplay, ...data });
  }


  const onSubmit = async () => {
    if (!isEditMode) {
      await handleSubmit(onCreateSubmit)();
    } else {
      await handleSubmit(onEditSubmit)();
    }
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
      <Toolbar handleClick={openCreateMode} />
      <Modal
        isOpen={isModalOpen}
        onCloseModal={() => onCloseModal(onSubmit)}
      >
        {!isEditMode && <CreateForm />}
        {isEditMode && <EditForm onSubmit={handleSubmit(onSubmit)} note={noteToDisplay as Notes.Types.TextNote} />}
      </Modal>
      <NotesList onNoteClick={openEditMode} />
    </div >
  )
}

export default HomePage;
