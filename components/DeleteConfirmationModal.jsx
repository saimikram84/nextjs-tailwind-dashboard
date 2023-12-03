const DeleteConfirmationModal = ({ userId,isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={()=>onConfirm(userId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;
  