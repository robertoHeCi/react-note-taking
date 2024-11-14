import { useState, useEffect, useRef } from "react";
import { AutoSaveIcon, LoadingIcon } from "../Icons";
import { useForm } from "react-hook-form";
import { useApiNotes } from "@/hooks/useApiNotes";

const TextNote = ({ id, body }: { id: string, body: string }) => {

  const [editTitle, setEditTitle] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const { updateNote, isUpdating } = useApiNotes();
  const { register, reset, getValues } = useForm<Notes.Types.TextNote>()
  const parsedBody = JSON.parse(body) as Notes.Types.TextNote;
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoSaved, setIsAutoSaved] = useState(false);

  const handleKeyUp = () => {
    if (editTitle || editContent) {
      clearExistingTimeout();
      setDebounceTimeout();
    }
  };

  const clearExistingTimeout = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  const setDebounceTimeout = () => {
    debounceTimeoutRef.current = setTimeout(() => {
      const values = getValues();
      if (shouldUpdateNote(values)) {
        updateNoteAndReset(values);
      }
    }, 1000);
  };

  const shouldUpdateNote = (values: Notes.Types.TextNote) => {
    return values !== parsedBody && Object.keys(values).length > 0;
  };

  const updateNoteAndReset = (values: Notes.Types.TextNote) => {
    updateNote({ ...parsedBody, ...values, id });
    reset();
    setEditTitle(false);
    setEditContent(false);
    setIsAutoSaved(true);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
          {!editTitle && <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3 z-index-1" onClick={() => setEditTitle(true)}>{getValues('title') || parsedBody.title}</h4>}
          {editTitle && <input className=" w-full bg-transparent text-gray-800 dark:text-white font-bold mb-3 border-2 border-black dark:border-gray-700 rounded-md" {...register("title", { required: 'Title is required' })} onKeyUp={handleKeyUp} defaultValue={parsedBody.title} />}
          {!editContent && <p className="text-gray-800 dark:text-gray-100 text-sm" onClick={() => setEditContent(true)}>{getValues('content') || parsedBody.content || 'No Content - Click to edit'}</p>}
          {editContent && <textarea
            className="w-full bg-transparent text-gray-800 dark:text-white font-bold mb-3 border-2 border-black dark:border-gray-700 rounded-md"
            {...register("content", { required: 'Content is required' })}
            onKeyUp={handleKeyUp}
            defaultValue={parsedBody.content}
          />}


      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm text-transform: capitalize flex items-center gap-2">
            {isAutoSaved && (isUpdating ? <LoadingIcon /> : <AutoSaveIcon />)}
            {new Date(parsedBody?.updatedAt).toLocaleDateString('es-ES', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextNote;
