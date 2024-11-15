declare namespace Notes.Types {
  type TextNote = {
    id?: string;
    title: string;
    content: string;
    updatedAt?: string;
    type: string;
  }
}

declare namespace Api {
  type Note = {
    id: string;
    body: string;
  }
}

declare namespace Modal {
  type ModalProps  = {
    isOpen: boolean;
    noteTypeToDisplay?: { type: string, content: string };
    note?: Notes.Types.TextNote;
    isEditMode: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }
}