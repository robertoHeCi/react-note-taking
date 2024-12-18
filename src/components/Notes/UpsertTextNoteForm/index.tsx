import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import resizeElement from "@/utils/resizeTextArea";
import useMention from "@/hooks/useMention";
import MentionModal from "@/components/Notes/MentionModal";

const UpsertTextNoteForm = ({ onSubmit, note }: { onSubmit?: () => void, note?: Notes.Types.TextNote }) => {

  const { register, setValue } = useFormContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { handleOnKeyDown, onInsertMention, mentionQuery, mentionPosition, showMentions } = useMention({ contentRef });
  const { ref: registerRef, ...registerRest } = register("content");

  const { debouncedCallback } = useDebounce({
    delay: 1000,
    onDebounce: onSubmit || (() => { })
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
      if (note) {
        contentRef.current.innerHTML = note.content;
        setValue('content', note.content);
      }
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
    debouncedCallback()
  }

  return (
    <ul className="space-y-4">
      <li className="flex flex-col gap-2">
        <input
          type="text"
          className="bg-transparent border-none text-gray-900 text-2xl font-bold dark:text-white focus:outline-none"
          {...register("title")}
          placeholder="Note title"
          defaultValue={note?.title}
          onInput={debouncedCallback}
        />
      </li>
      <li>
        <div contentEditable="true"
          ref={(element) => {
            registerRef(element);
            contentRef.current = element;
          }}
          data-id="content"
          className="bg-transparent border-2 border-slate-500 dark:text-white text-sm rounded-lg focus:outline-none w-full resize-none p-3"
          style={{ minHeight: '100px' }}
          {...registerRest}
          onKeyDown={handleOnKeyDown}
          onInput={handleOnInput}
          tabIndex={0}
        />
        {showMentions && (
          <MentionModal
            position={mentionPosition}
            query={mentionQuery}
            insertMention={onInsertMention}
            showMentions={showMentions}
          />
        )}
      </li>
    </ul>
  );
};

export default UpsertTextNoteForm;
