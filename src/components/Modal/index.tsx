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
          aria-hidden={isOpen ? "true" : "false"}
          className="overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 bg-black bg-opacity-50"
        >
          <section className="p-4 md:p-5 space-y-4 relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/2 max-h-full animate-slide-up animate-duration-600">
            {children}
            <section className="flex justify-end p-4 md:p-5" >
              <button
                data-modal-hide="text-note-modal"
                type="button"
                onClick={onCloseModal}
                className="bg-transparent dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-300 hover:bg-opacity-20 dark:hover:bg-gray-300 dark:hover:bg-opacity-20 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300"
              >
                Close
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default Modal;