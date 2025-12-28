const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = "Delete" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="mb-4 text-red-500">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete?
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 border rounded-md py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-purple-700 text-white rounded-md py-2 hover:bg-purple-800"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
