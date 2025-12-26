import Modal from './Modal';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => (
  <Modal isOpen={isOpen} onClose={onCancel}>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p className="mb-4">{message}</p>
    <div className="flex justify-end">
      <button
        onClick={onCancel}
        className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Confirm
      </button>
    </div>
  </Modal>
);

export default ConfirmationModal;