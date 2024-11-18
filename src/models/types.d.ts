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
  };

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

  type User = {
    birthdate: number;
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    location: {
      city: string;
      postcode: string | number;
      state: string;
      street: string;
    };
    phone_number: string;
    title: string;
    username: string;
  };
}
