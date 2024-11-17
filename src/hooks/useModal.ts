import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [noteTypeToDisplay, setNoteTypeToDisplay] = useState<string>('');
  const [noteToDisplay, setNoteToDisplay] = useState<Notes.Types.TextNote | Notes.Types.TodoListNote>();
  const { reset } = useFormContext<Notes.Types.TextNote>();


  const openCreateMode = (type: string) => {
    setIsEditMode(false);
    setNoteTypeToDisplay(type);
    setIsModalOpen(!isModalOpen);
  }

  const openEditMode = (note: Notes.Types.TextNote | Notes.Types.TodoListNote) => {
    setIsEditMode(true);
    setNoteToDisplay(note);
    setIsModalOpen(!isModalOpen);
  }

  const onCloseModal = async (onSubmit: () => Promise<void>) => {
    await onSubmit();
    setIsModalOpen(false);
    reset();
  }

  return { isModalOpen, setIsModalOpen, isEditMode, openCreateMode, openEditMode, noteTypeToDisplay, noteToDisplay, onCloseModal };
};