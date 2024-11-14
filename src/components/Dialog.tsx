const ModalForm = ({ children, isVisible, color, title, message }: any) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2" style={{ color }}>
          {title}
        </h2>
        <p className="text-base text-gray-600 mb-6">{message}</p>
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
  color = "green",
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
            className="p-3 rounded-md bg-gray-200 w-full text-gray-800 text-center text-lg font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="p-3 rounded-md w-full text-white text-center text-lg font-semibold"
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
  color = "green",
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
          className="p-3 rounded-md flex-1 text-white text-center text-lg font-semibold"
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
  color = "royalblue",
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      color={color}
      title={title}
      message={message}
    >
      <div className="bg-white rounded-lg items-center">
        <div className="w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </ModalForm>
  );
};

export { ConfirmationDialog, AlertDialog, LoadingDialog };
