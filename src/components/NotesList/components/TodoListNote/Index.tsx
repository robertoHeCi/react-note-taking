import { CheckIcon } from "@/components/Icons";

const TodoListNote = ({ note }: { note: Notes.Types.TodoListNote }) => {
  const formattedDate = note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:hover:border-gray-400 hover:shadow-md transition-all duration-300 dark:border-gray-700 rounded-lg border border-gray-200 mb-6 py-5 px-4 cursor-pointer">
    <div className="flex flex-col justify-between gap-1">
      <h4 className="text-gray-800 dark:text-gray-100 font-bold z-index-1">{note.title}</h4>
      <span className="text-xs text-transform: capitalize flex items-center dark:text-gray-400 text-gray-600">
        Last update: {formattedDate}
      </span>
      <ul className="flex flex-col gap-2 pt-2">
        {note.content.map((item, index) => (
          <li className="flex items-center">
            {/* <input checked={item.completed} name={`checkbox-${index}`} readOnly type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id={`checkbox-${index}`} /> */}

            <label className="flex items-center cursor-pointer relative" htmlFor={`checkbox-${index}`}>
              <input type="checkbox"
                checked={item.completed}
                readOnly
                className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border dark:border-slate-300 border-slate-300 checked:bg-slate-800 checked:border-slate-800 dark:checked:bg-slate-800 dark:checked:border-slate-300"
                id={`checkbox-${index}`} />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:border-slate-300">
                <CheckIcon />
              </span>
            </label>

            <label htmlFor={`checkbox-${index}`} className="text-sm text-gray-500 ms-3 dark:text-neutral-400 cursor-pointer">
              {item.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </div>
}

export default TodoListNote;