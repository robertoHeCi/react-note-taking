declare namespace Notes.Types {
  type TextNote = {
    id?: string;
    title: string;
    content: string;
    updatedAt?: string;
    type: string;
  };

  type TodoListNote = {
    id?: string;
    title: string;
    content: {
      title: string;  
      completed: boolean;
    }[];
    updatedAt?: string;
    type: string;
  };
}

declare namespace Api {
  type Note = {
    id: number;
    body: string;
  };
}