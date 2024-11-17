export const formatDate = (date?: string) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24'
  }) : '';

  return formattedDate;
}