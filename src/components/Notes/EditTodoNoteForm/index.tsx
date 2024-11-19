import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import TodoItem from "./components/TodoItem";

const EditTodoNoteForm = ({ onSubmit, note }: { onSubmit: () => void, note: Notes.Types.TodoListNote   }) => {
  const { register, setValue } = useFormContext();

  const [items, setItems] = useState<{ title: string, completed: boolean }[]>(note.content);

  const handleAddItem = () => {
    setItems([...items, { title: '', completed: false }]);
  }

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit
  }); 

  const updateItem = (index: number, updates: Partial<{ title: string, completed: boolean }>) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
    
    Object.entries(updates).forEach(([key, value]) => {
      setValue(`content.${index}.${key}`, value);
    });
    
    debouncedCallback();
  };

  const handleChangeItem = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(index, { completed: e.target.checked });
  }

  const handleInputChange: (index: number) => (e: React.FormEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => void = (index) => (e) => {
    updateItem(index, { title: e.currentTarget.value });
  }

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          placeholder="Note title"
          {...register("title", { required: 'Title is required' })}
          defaultValue={note.title}
          onChange={debouncedCallback}
        />
      </li>
      <li>
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              index={index}
              onChangeItem={handleChangeItem}
              onInputChange={handleInputChange}
            />
          ))}
          <li className="flex items-center">
            <button onClick={handleAddItem} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"> + Add item</button>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default EditTodoNoteForm;
