import { useDebounce } from "@/hooks/useDebounce";
import { FieldErrors, UseFormRegister } from "react-hook-form"

type TextFormProps = {
  register: UseFormRegister<Notes.Types.TextNote>;
  errors: FieldErrors<Notes.Types.TextNote>;
  note?: Notes.Types.TextNote;
  onSubmit: () => void;
}

const TextForm: React.FC<TextFormProps> = ({ register, errors, note, onSubmit }) => {

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit
  });

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = () => {
    debouncedCallback();
  };

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("title", { required: 'Title is required' })}
          defaultValue={note?.title}
          onKeyUp={handleKeyUp}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </li>
      <li>
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("content", { required: 'Content is required' })}
          defaultValue={note?.content}
          onKeyUp={handleKeyUp}
        />
        <p className="text-red-500">{errors.content?.message}</p>
      </li>
      <pre>...{JSON.stringify(note, null, 2)}</pre>
    </ul>
  )
}

export default TextForm;