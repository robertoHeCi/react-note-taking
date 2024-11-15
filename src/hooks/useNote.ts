import { useState } from "react";


const useNote = () => {
  const [noteTypeToDisplay, setNoteTypeToDisplay] = useState<Notes.Types.TextNote | null>(null);

  const noteType: Notes.Types.TextNote[] = [
    {
      type: 'text',
      title: "Text Note Title",
      content: "Text Note Content",
      updatedAt: new Date().toISOString(),
    },
    {
      type: 'image',
      title: "Image Note Title",
      content: "Image Note Content",
      updatedAt: new Date().toISOString(),
    },
    {
      type: 'check',
      title: "Check Note Title",
      content: "Check Note Content",
      updatedAt: new Date().toISOString(),
    },
  ]

  const setNoteTypeToDisplayByType = (type: string) => {
    const note = noteType.find((note) => note.type === type);
    if (note) {
      setNoteTypeToDisplay(note);
    }
  }
  return { noteTypeToDisplay, setNoteTypeToDisplayByType };
}

export default useNote;