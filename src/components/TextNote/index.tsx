import { EditIcon } from "../Icons";

const TextNote = ({body}: {body: string}) => {

  const parsedBody = JSON.parse(body) as Notes.Types.TextNote;
  
  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{parsedBody.title}</h4>
        <p className="text-gray-800 dark:text-gray-100 text-sm">{parsedBody.content}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm text-transform: capitalize">
            {new Date(parsedBody?.updatedAt).toLocaleDateString('es-ES', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <button className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextNote;
