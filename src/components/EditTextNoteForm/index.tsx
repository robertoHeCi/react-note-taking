import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import resizeTextarea from "@/utils/resizeTextArea";

const EditTextNoteForm = ({ onSubmit, note }: { onSubmit: () => void, note: Notes.Types.TextNote   }) => {
  const { register } = useFormContext();
  const contentRef = useRef<HTMLTextAreaElement | null>(null) as React.MutableRefObject<HTMLTextAreaElement | null>;

  const { ref: registerRef, ...registerRest } = register("content");

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit
  }); 

  useEffect(() => {
    resizeTextarea(contentRef);
    window.addEventListener('resize', () => resizeTextarea(contentRef));
    return () => window.removeEventListener('resize', () => resizeTextarea(contentRef));
  }, [contentRef.current?.value]);

  const handleSubmit = () => {
    resizeTextarea(contentRef)
    debouncedCallback();
  }

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          {...register("title")}
          placeholder="Note title"
          defaultValue={note.title}
          onKeyUp={debouncedCallback}
          onInput={debouncedCallback}
          onPaste={debouncedCallback}
        />
      </li>
      <li>
        <textarea
          className="bg-transparent border-none dark:text-white text-sm rounded-lg focus:outline-none w-full resize-none min-h-10"
          ref={(element) => {
            registerRef(element);
            contentRef.current = element;
          }}
          {...registerRest}
          rows={1}
          placeholder="Type your content here..."
          autoFocus
          defaultValue={note.content}
          onKeyUp={handleSubmit}
          onInput={handleSubmit}
          onPaste={handleSubmit}
        />
      </li>
    </ul>
  );
};

export default EditTextNoteForm;