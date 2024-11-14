import { FieldErrors, UseFormRegister } from "react-hook-form"

type TextFormProps = {
  register: UseFormRegister<Notes.Types.TextNote>;
  errors: FieldErrors<Notes.Types.TextNote>;
}

const TextForm: React.FC<TextFormProps> = ({ register, errors }) => {
  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("title", { required: 'Title is required' })}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </li>
      <li>
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("content", { required: 'Content is required' })}
        />
        <p className="text-red-500">{errors.content?.message}</p>
      </li>
    </ul>
  )
}

export default TextForm;