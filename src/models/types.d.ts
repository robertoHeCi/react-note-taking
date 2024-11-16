declare namespace Notes.Types {
  type TextNote = {
    id?: string;
    title: string;
    content: string;
    updatedAt?: string;
    type: string;
  };

  type NewTextNote = {
    type: string;
  };
}

declare namespace Api {
  type Note = {
    id: number;
    body: string;
  };
}