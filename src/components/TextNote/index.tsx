
const TextNote = ({ note, onClick }: { note: Notes.Types.TextNote, onClick: (note: Notes.Types.TextNote) => void }) => {


  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4" onClick={() => onClick(note)}>
      <div>
        <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3 z-index-1">{note.title}</h4>
        <p className="text-gray-800 dark:text-gray-100 text-sm">{note.content}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm text-transform: capitalize flex items-center gap-2">
            {note?.updatedAt ? new Date(note?.updatedAt).toLocaleDateString('es-ES', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextNote;
