import CreateTodoNoteForm from "@/components/Notes/CreateTodoNoteForm";
import EditTodoNoteForm from "@/components/Notes/EditTodoNoteForm";
import Modal from "@/components/Common/Modal";
import NotesList from "@/components/Notes/NotesList";
import Toolbar from "@/components/Common/Toolbar";
import UpsertTextNoteForm from "@/components/Notes/UpsertTextNoteForm";
import { useApiNotes } from "@/hooks/useApiNotes";
import { useModal } from "@/hooks/useModal";
import { SubmitHandler, useFormContext } from "react-hook-form";

const HomePage = () => {
  const { isModalOpen, isEditMode, openCreateMode, openEditMode, noteToDisplay, onCloseModal, noteTypeToDisplay } = useModal();
  const { createNote, updateNote } = useApiNotes();
  const { handleSubmit } = useFormContext<Notes.Types.TextNote>();


  const onCreateSubmit: SubmitHandler<Notes.Types.TextNote> = (data: Notes.Types.TextNote) => {
    createNote({ ...data, type: noteTypeToDisplay as string });
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
        {(noteToDisplay?.type === 'text' || noteTypeToDisplay === 'text') &&
          <UpsertTextNoteForm
            onSubmit={isEditMode ? () => handleSubmit(onEditSubmit)() : () => { }}
            {...noteToDisplay && { note: noteToDisplay as Notes.Types.TextNote }}
          />}
        {!isEditMode && noteTypeToDisplay === 'todo' && <CreateTodoNoteForm />}
        {isEditMode && noteToDisplay?.type === 'todo' && <EditTodoNoteForm
          onSubmit={handleSubmit(onSubmit)}
          note={noteToDisplay as Notes.Types.TodoListNote}
        />}
      </Modal>
      <NotesList onNoteClick={openEditMode} />
    </div >
  )
}

export default HomePage;
