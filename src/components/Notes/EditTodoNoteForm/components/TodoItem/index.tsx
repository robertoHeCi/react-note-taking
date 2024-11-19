import { useFormContext } from "react-hook-form";
import { CheckIcon } from "@/components/Common/Icons";

type TodoItemProps = {
  item: Notes.Types.TodoItem;
  index: number;
  onChangeItem: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (index: number) => (e: React.FormEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => void;
}

const TodoItem = ({ item, index, onChangeItem, onInputChange }: TodoItemProps) => {
  const { register } = useFormContext();

  return (
    <li className="flex items-center">
      <label className="flex items-center cursor-pointer relative" htmlFor={`checkbox-${index}`}>
        <input
          type="checkbox"
          checked={item.completed}
          {...register(`content.${index}.completed`)}
          onChange={(e) => onChangeItem(index)(e)}
          className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border dark:border-slate-300 border-slate-300 checked:bg-slate-800 checked:border-slate-800 dark:checked:bg-slate-800 dark:checked:border-slate-300"
          id={`checkbox-${index}`}
        />
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
        defaultValue={item.title}
        onInput={(e) => onInputChange(index)(e)}
        onPaste={(e) => onInputChange(index)(e)}
      />
    </li>
  );
}

export default TodoItem