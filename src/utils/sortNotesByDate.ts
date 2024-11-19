const sortNotesByDate = (notes: (Notes.Types.TextNote | Notes.Types.TodoListNote)[]) => {
  return notes?.sort((a, b) => {
    const dateA = new Date(a?.updatedAt || '');
    const dateB = new Date(b?.updatedAt || '');
    return dateB.getTime() - dateA.getTime();
  }) || [];
};

export default sortNotesByDate;