import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckIcon } from "../Icons";
import { useDebounce } from "@/hooks/useDebounce";

const EditTodoNoteForm = ({ onSubmit, note }: { onSubmit: () => void, note: Notes.Types.TodoListNote   }) => {
  const { register } = useFormContext();

  const [items, setItems] = useState<{ title: string, completed: boolean }[]>(note.content);

  const handleAddItem = () => {
    setItems([...items, { title: '', completed: false }]);
  }

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit
  }); 

  const handleChangeItem: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void = (index) => (e) => {
    setItems(items.map((item, i) => i === index ? { ...item, title: e.target.value, completed: e.target.checked } : item));
    debouncedCallback();
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
          onKeyUp={debouncedCallback}
          onPaste={debouncedCallback}
          onInput={debouncedCallback}
        />
      </li>
      <li>
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <label className="flex items-center cursor-pointer relative" htmlFor={`checkbox-${index}`}>
                <input type="checkbox"
                  checked={note.content[index].completed || item.completed}
                  {...register(`content.${index}.completed`)}
                  onChange={(e) => {
                    handleChangeItem(index)(e)
                  }}
                  readOnly
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border dark:border-slate-300 border-slate-300 checked:bg-slate-800 checked:border-slate-800 dark:checked:bg-slate-800 dark:checked:border-slate-300"
                  id={`checkbox-${index}`} />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:border-slate-300">
                  <CheckIcon />
                </span>
              </label>

              <input
                type="text"
                id={`checkbox-${index}`}
                className="pl-3 bg-transparent border-none dark:text-white text-sm rounded-lg focus:outline-none w-full resize-none min-h-10"
                {...register(`content.${index}.title`)}
                placeholder="Write your todo here..."
                autoFocus
                defaultValue={note.content[index].title || item.title}
                onChange={(e) => {
                  handleChangeItem(index)(e)
                }}
              />
            </li>
          ))}
          <li className="flex items-center">
            <button onClick={handleAddItem}>Add item</button>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default EditTodoNoteForm;
