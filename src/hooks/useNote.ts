import { useState } from "react";

export type NoteType = {
  type: string;
  content: string;
}

const useNote = () => {
  const [noteToDisplay, setNoteToDisplay] = useState<NoteType | null>(null);

  const noteType: NoteType[] = [
    {
      type: 'text',
      content: "Text Note Content",
    },
    {
      type: 'image',
      content: "Image Note Content",
    },
    {
      type: 'check',
      content: "Check Note Content",
    },
  ]

  const setNoteToDisplayByType = (type: string) => {
    const note = noteType.find((note) => note.type === type);
    if (note) {
      setNoteToDisplay(note);
    }
  }
  return { noteToDisplay, setNoteToDisplayByType };
}

export default useNote;