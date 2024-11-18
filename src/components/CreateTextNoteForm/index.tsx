import resizeElement from "@/utils/resizeTextArea";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import MentionModal from "../MentionModal";
const CreateTextNoteForm = () => {
  const { register, setValue } = useFormContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionStartCursorPosition, setMentionStartCursorPosition] = useState(0);

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


  const getCaretPosition = () => {
    if (window.getSelection() && window.getSelection()?.getRangeAt) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const selectedObj = window.getSelection();
      let rangeCount = 0;
      const childNodes = selectedObj?.anchorNode?.parentNode?.childNodes;
      if (childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
          if (childNodes[i] == selectedObj.anchorNode) {
            break;
          }
          if (childNodes[i]?.outerHTML)
            rangeCount += childNodes[i]?.outerHTML?.length;
          else if (childNodes[i]?.nodeType == 3) {
            rangeCount += childNodes[i]?.textContent?.length || 0;
          }
        }
      }
      return range.startOffset + rangeCount || -1;
    }
    return -1;
  }

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '@') {
      setShowMentions(true);
      console.log("caret position @", getCaretPosition());

      setMentionStartCursorPosition(getCaretPosition());
    } else {
      // if the last character deleted is the @ symbol, hide the mentions dropdown
      if (e.key === 'Backspace') {
        const match = contentRef.current?.innerHTML?.match(/(?<!<span[^>]*>.*?)(@(\w*))$/);
        if (!match) {
          setShowMentions(false);
          setMentionQuery('');
        }
      } else {
        if (showMentions) {
          debugger;
          const cursorPosition = getCaretPosition();
          const content = contentRef.current?.innerHTML.replace(/&nbsp;/g, ' ');
          const beforeCursor = content?.slice(mentionStartCursorPosition, cursorPosition);
          console.log("before cursor", beforeCursor);
          setMentionQuery(beforeCursor || '');
        }
      }
    }
  };

  const insertMention = (username: string) => {
    if (!contentRef.current || !mentionStartCursorPosition) return;

    // Create the mention element
    const mentionSpan = document.createElement('span');
    mentionSpan.className = 'dark:bg-red-500 bg-red-200 rounded-md px-1 py-0.5';
    mentionSpan.contentEditable = 'false'; // Make mention non-editable
    mentionSpan.innerHTML = `@${username}`;

    const newContent = contentRef.current.innerHTML.replace(`@${mentionQuery}`, '\u200B' + mentionSpan.outerHTML + '\u200B');
    contentRef.current.innerHTML = newContent;

    setShowMentions(false);
  };

  return (
    <div className="relative">
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
          <div contentEditable="true"
            ref={(element) => {
              registerRef(element);
              contentRef.current = element;
            }}
            className="bg-transparent border-none dark:text-white text-sm rounded-lg focus:outline-none w-full resize-none min-h-10 p-3"
            {...registerRest}
            onKeyUp={handleOnKeyUp}
            onInput={handleOnInput}
          />

          {showMentions && (
            <MentionModal
              query={mentionQuery}
              insertMention={insertMention}
              showMentions={showMentions}
            />
          )}
        </li>
        {/* Mentions Dropdown */}
      </ul>


    </div>
  );
};

export default CreateTextNoteForm;