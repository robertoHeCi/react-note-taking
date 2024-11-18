import resizeElement from "@/utils/resizeTextArea";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import MentionModal from "../MentionModal";
import useMention from "@/hooks/useMention";
const CreateTextNoteForm = () => {

  const { register, setValue } = useFormContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { handleOnKeyUp, showMentions, onInsertMention, mentionQuery } = useMention({ contentRef });
  const { ref: registerRef, ...registerRest } = register("content");

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    resizeElement(contentRef);
    window.addEventListener('resize', () => resizeElement(contentRef));
    return () => window.removeEventListener('resize', () => resizeElement(contentRef));
  }, [contentRef.current?.innerHTML]);


  const handleOnInput = (e: React.FormEvent<HTMLDivElement>) => {
    resizeElement(contentRef);
    setValue('content', e.currentTarget.innerHTML);
  }

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          {...register("title")}
          placeholder="Note title"
        />
      </li>
      <li>
        <div contentEditable="true"
          ref={(element) => {
            registerRef(element);
            contentRef.current = element;
          }}
          data-id="content"
          className="bg-transparent border-none dark:text-white text-sm rounded-lg focus:outline-none w-full resize-none min-h-10 p-3"
          {...registerRest}
          onKeyUp={handleOnKeyUp}
          onInput={handleOnInput}
        />
        {showMentions && (
          <MentionModal
            query={mentionQuery}
            insertMention={onInsertMention}
            showMentions={showMentions}
          />
        )}
      </li>
    </ul>
  );
};

export default CreateTextNoteForm;