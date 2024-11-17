import { formatDate } from "@/utils/formatDate";

const TextNoteSummary = ({ note, onClick }: { note: Notes.Types.TextNote, onClick: (note: Notes.Types.TextNote) => void }) => {

  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:hover:border-gray-400 hover:shadow-md transition-all duration-300 dark:border-gray-700 rounded-lg border border-gray-200 mb-6 py-5 px-4 cursor-pointer" onClick={() => onClick(note)}>
      <div className="flex flex-col justify-between gap-1">
        <h4 className="text-gray-800 dark:text-gray-100 font-bold z-index-1">{note.title}</h4>
        <span className="text-xs text-transform: capitalize flex items-center dark:text-gray-400 text-gray-600">
          Last update: {formatDate(note?.updatedAt)}
        </span>
        <p className="text-gray-800 dark:text-gray-100 mt-4 text-sm overflow-hidden line-clamp-6 md:line-clamp-4 lg:line-clamp-6">{note.content}</p>
      </div>
    </div>
  )
}

export default TextNoteSummary;