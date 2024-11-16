import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const useModal = ({ setNoteTypeToDisplayByType }: { setNoteTypeToDisplayByType: (type: string) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [noteToDisplay, setNoteToDisplay] = useState<Notes.Types.TextNote>();
  const { reset } = useFormContext<Notes.Types.TextNote>();


  const openCreateMode = (type: string) => {
    setIsEditMode(false);
    setNoteTypeToDisplayByType(type);
    setIsModalOpen(!isModalOpen);
  }

  const openEditMode = (note: Notes.Types.TextNote) => {
    setIsEditMode(true);
    setNoteToDisplay(note);
    setIsModalOpen(!isModalOpen);
  }

  const onCloseModal = async (onSubmit: () => Promise<void>) => {
    await onSubmit();
    setIsModalOpen(false);
    reset();
  }

  return { isModalOpen, setIsModalOpen, isEditMode, openCreateMode, openEditMode, noteToDisplay, onCloseModal };
};