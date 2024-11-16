const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="p-4 mb-4 text-sm rounded-lg bg-red-50 dark:bg-gray-800 " role="error">
      <span className="font-medium text-red-800 dark:text-red-400">{error}</span>
    </div>
  )
}

export default ErrorMessage;