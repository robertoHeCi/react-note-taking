type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
}

const Modal = ({ children, isOpen, onCloseModal }: ModalProps) => {

  return (
    <>
      {isOpen && (
        <div
          className="overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 sm:py-2 flex-col"
        >
          <section className="p-8 sm:p-6 pb-2 relative bg-white rounded-lg shadow dark:bg-gray-700 lg:w-1/2 lg:h-auto min-h-96 w-4/5 max-h-full animate-slide-up animate-duration-600 flex flex-col justify-between">
            {children}
            <button
              data-modal-hide="text-note-modal"
              type="button"
              onClick={onCloseModal}
              className="bg-transparent dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-300 hover:bg-opacity-20 dark:hover:bg-gray-300 dark:hover:bg-opacity-20 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 w-1/6 self-end"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Modal;