const CloseModalButton = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
  return (
    <button type="button" aria-label="Close modal" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={toggleModal}>
      <svg className="w-3 h-3" aria-hidden={isOpen ? 'true' : 'false'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
    </button>
  )
}

export default CloseModalButton;