export const parseNote = (note: { id: string, body: string }  ) => {
  return { ...JSON.parse(note.body) as Notes.Types.TextNote, id: note.id };
}