import { useState } from "react";
import { useFormContext } from "react-hook-form";

type MentionProps = {
  contentRef: React.RefObject<HTMLDivElement>;
};

const useMention = ({ contentRef }: MentionProps) => {
  const [mentionStartCursorPosition, setMentionStartCursorPosition] =
    useState<number>(-1);
  const [mentionQuery, setMentionQuery] = useState<string>("");
  const [showMentions, setShowMentions] = useState<boolean>(false);
  const [mentionPosition, setMentionPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const { setValue } = useFormContext();

  const getCaretPositionAndCoordinates = (): {
    position: number;
    coordinates: { x: number; y: number };
  } => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !contentRef.current)
      return { position: -1, coordinates: { x: 0, y: 0 } };

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    const editableDiv = contentRef.current;

    preCaretRange.selectNodeContents(editableDiv);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    const position = preCaretRange.toString().length;
    const rect = range.getBoundingClientRect();


    return {
      position,
      coordinates:{
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY
      }
    };
  };

  const onInsertMention = (username: string) => {
    if (!contentRef.current || !mentionStartCursorPosition) return;

    const mentionSpan = document.createElement("span");
    mentionSpan.className =
      "capitalize dark:bg-red-500 bg-red-200 rounded-md px-1 py-0.5";
    mentionSpan.contentEditable = "false";
    mentionSpan.innerHTML = username;

    const newContent = contentRef.current.innerHTML.replace(
      `@${mentionQuery}`,
      mentionSpan.outerHTML
    );
    contentRef.current.innerHTML = newContent;

    setShowMentions(false);
    setValue("content", newContent);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "@" || contentRef.current?.innerHTML?.endsWith("@")) {
      const { position, coordinates } = getCaretPositionAndCoordinates();
      setShowMentions(true);
      setMentionStartCursorPosition(position);
      setMentionPosition(coordinates);
    } else if (e.key === "Backspace") {
      const match = contentRef.current?.innerHTML?.match(
        /(?<!<span[^>]*>.*?)(@(\w*))$/
      );
      if (!match) {
        setShowMentions(false);
        setMentionQuery("");
      }
    } else if (showMentions) {
      const mentionQueryValue = mentionQuery + e.key;

      setMentionQuery(mentionQueryValue.replace(/^@/, ""));

      // Hide mentions dropdown if user types a space
      if (e.key === " " || mentionQueryValue.includes(" ")) {
        setShowMentions(false);
        setMentionQuery("");
      }
    }
  };

  return {
    handleOnKeyDown,
    onInsertMention,
    getCaretPositionAndCoordinates,
    mentionQuery,
    mentionPosition,
    showMentions
  };
};

export default useMention;
