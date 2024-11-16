import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useRef } from "react";
import { UseFormRegister } from "react-hook-form"

type TextFormProps = {
  register: UseFormRegister<Notes.Types.TextNote>;
  note?: Notes.Types.TextNote;
  onSubmit: () => void;
  isEditMode: boolean;
}

const TextForm: React.FC<TextFormProps> = ({ register, note, onSubmit, isEditMode = false }) => {
  const contentRef = useRef<HTMLTextAreaElement | null>(null) as React.MutableRefObject<HTMLTextAreaElement | null>;
  
  const { ref: registerRef, ...registerRest } = register("content");

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit
  });

  const resizeTextarea = () => {
    if (!contentRef.current) return;
    
    contentRef.current.style.height = 'auto';

    const newHeight = contentRef.current.scrollHeight;
    const maxHeight = window.innerHeight * 0.8;

    contentRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`;
    contentRef.current.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
  };

  useEffect(() => {
    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, [note?.content]);

  const handleInput = () => {
    if (isEditMode) {
      debouncedCallback();
    }
    resizeTextarea();
  };

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          {...register("title", { required: 'Title is required' })}
          defaultValue={note?.title}
          onKeyUp={handleInput}
          onInput={handleInput}
          onPaste={handleInput}
          placeholder="Note title"
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
          onKeyUp={handleInput}
          onInput={handleInput}
          onPaste={handleInput}
          defaultValue={note?.content}
          placeholder="Type your content here..."
          autoFocus
        />
      </li>
    </ul>
  );
};

export default TextForm;