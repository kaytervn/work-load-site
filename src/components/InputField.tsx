const InputField = ({
  title = "",
  isRequire = false,
  value = "",
  placeholder = "",
  onChangeText,
  icon: Icon,
  error = "",
  prepend,
  type = "text",
  maxLength = 100,
}: any) => {
  return (
    <div className="mb-4">
      {title && (
        <label className="text-base font-semibold text-gray-800 mb-2 text-left flex items-center">
          {title}
          {isRequire === true && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center">
        <div
          className={`flex items-center border rounded-md p-2 flex-1 ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        >
          {Icon && (
            <Icon
              className={`w-5 h-5 ${error ? "text-red-500" : "text-gray-400"}`}
            />
          )}
          {prepend && (
            <div className="ml-2 font-semibold text-red-700">{prepend}</div>
          )}
          <input
            className={`flex-1 ml-2 text-base outline-none ${
              error ? "text-red-500 bg-red-50" : "text-gray-700"
            }`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            type={type}
            maxLength={maxLength}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
};

export default InputField;
