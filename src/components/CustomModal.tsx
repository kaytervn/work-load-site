import { XIcon } from "lucide-react";

const CustomModal = ({
  onClose,
  title = "Sample",
  topComponent,
  bodyComponent,
  buttonText = "OK",
  onButtonClick,
  color = "blue",
}: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[40rem] p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold text-center text-${color}-500`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full"
          >
            <XIcon size={30} />
          </button>
        </div>
        {topComponent && (
          <div className="flex justify-center mb-6">{topComponent}</div>
        )}
        <div className="max-h-96 overflow-y-auto pr-2">{bodyComponent}</div>
        <div className="mt-6">
          <button
            onClick={onButtonClick}
            className={`text-center text-white font-semibold text-lg w-full px-4 py-2 bg-${color}-600 rounded-md hover:bg-${color}-800 focus:ring-2 focus:ring-${color}-500`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
