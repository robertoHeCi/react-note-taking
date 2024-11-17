declare namespace Notes.Types {
  type TextNote = {
    id?: string;
    title: string;
    content: string;
    updatedAt?: string;
    type: string;
  };

  type TodoItem = {
    title: string;
    completed: boolean;
  }

  type TodoListNote = {
    id?: string;
    title: string;
    content: TodoItem[];
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