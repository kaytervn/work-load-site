const ModalForm = ({ children, isVisible, color, title, message }: any) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-200" style={{ color }}>
          {title}
        </h2>
        <p className="text-base text-gray-300 mb-6">{message}</p>
        <div className="flex-grow flex items-center justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

const ConfirmationDialog = ({
  isVisible,
  title,
  message,
  color = "#22c55e",
  onConfirm,
  confirmText = "Accept",
  onCancel,
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      title={title}
      message={message}
      color={color}
    >
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <div className="flex gap-2 w-full mt-4">
          <button
            onClick={onCancel}
            className="p-3 rounded-md bg-gray-800 w-full text-gray-200 text-center text-lg font-semibold hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="p-3 rounded-md w-full text-gray-200 text-center text-lg font-semibold hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalForm>
  );
};

const AlertDialog = ({
  isVisible,
  title = "Information",
  message,
  color = "#22c55e",
  onAccept,
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      title={title}
      message={message}
      color={color}
    >
      <div className="flex">
        <button
          onClick={onAccept}
          className="p-3 rounded-md flex-1 text-gray-200 text-center text-lg font-semibold hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          OK
        </button>
      </div>
    </ModalForm>
  );
};

const LoadingDialog = ({
  isVisible,
  title = "Processing",
  message = "Please wait a moment...",
  color = "#4169e1",
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      color={color}
      title={title}
      message={message}
    >
      <div className="bg-gray-900 rounded-lg items-center">
        <div className="w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </ModalForm>
  );
};

export { ConfirmationDialog, AlertDialog, LoadingDialog };
