import resizeTextarea from "@/utils/resizeTextArea";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const CreateForm = () => {
  const { register } = useFormContext();
  const contentRef = useRef<HTMLTextAreaElement | null>(null) as React.MutableRefObject<HTMLTextAreaElement | null>;

  const { ref: registerRef, ...registerRest } = register("content");

  useEffect(() => {
    resizeTextarea(contentRef);
    window.addEventListener('resize', () => resizeTextarea(contentRef));
    return () => window.removeEventListener('resize', () => resizeTextarea(contentRef));
  }, [contentRef.current?.value]);  

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          placeholder="Note title"
          {...register("title", { required: 'Title is required' })}
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
          onKeyUp={() => resizeTextarea(contentRef)}
          onInput={() => resizeTextarea(contentRef)}
          onPaste={() => resizeTextarea(contentRef)}
        />
      </li>
    </ul>
  );
};

export default CreateForm;