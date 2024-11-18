const resizeElement = (contentRef: React.MutableRefObject<HTMLTextAreaElement | HTMLDivElement | null>) => {
  if (!contentRef.current) return;

  contentRef.current.style.height = 'auto';

  const newHeight = contentRef.current.scrollHeight;
  const maxHeight = window.innerHeight * 0.8;

  contentRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`;
  contentRef.current.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
};

export default resizeElement;