const TextAreaWithCheckbox = ({
  title,
  value,
  onChangeText,
  placeholder,
  error,
  isChecked = false,
  onCheckboxChange,
  maxLength,
}: any) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={onCheckboxChange}
        >
          <div
            className={`w-10 h-4 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
              isChecked ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
                isChecked ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
          <span
            className={`text-base font-semibold ${
              isChecked ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {title}
            {isChecked && <span className="ml-1 text-red-500">*</span>}
          </span>
        </button>
      </div>
      {isChecked && (
        <>
          <div className="flex items-center">
            <div
              className={`flex items-center border rounded-md p-2 flex-1 ${
                error ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <textarea
                className={`flex-1 ml-2 text-base outline-none resize-none ${
                  error ? "text-red-500 bg-red-50" : "text-gray-700"
                }`}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={(e) => onChangeText(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TextAreaWithCheckbox;
