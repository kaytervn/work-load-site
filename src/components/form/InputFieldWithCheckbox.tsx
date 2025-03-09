const InputFieldWithCheckbox = ({
  title,
  value,
  placeholder,
  onChangeText,
  icon: Icon,
  error,
  prepend,
  type = "text",
  isChecked = false,
  onCheckboxChange,
  maxLength = 100,
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
              isChecked ? "bg-blue-600" : "bg-gray-600"
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
              isChecked ? "text-gray-200" : "text-gray-400"
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
                error
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 bg-gray-800"
              }`}
            >
              {Icon && (
                <Icon
                  className={`w-5 h-5 ${
                    error ? "text-red-500" : "text-gray-400"
                  }`}
                />
              )}
              {prepend && (
                <div className="ml-2 font-semibold text-gray-300">
                  {prepend}
                </div>
              )}
              <input
                className={`flex-1 ml-2 text-base outline-none bg-transparent ${
                  error
                    ? "text-red-500 placeholder-red-400/50"
                    : "text-gray-200 placeholder-gray-500"
                }`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeText(e.target.value)}
                type={type}
                maxLength={maxLength}
                {...(type === "number" && {
                  min: 1,
                  max: 65535,
                })}
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

export default InputFieldWithCheckbox;
