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
    <div className="flex-1 items-center">
      {title && (
        <label className="text-base font-semibold text-gray-200 mb-2 text-left flex items-center">
          {title}
          {isRequire && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        className={`flex items-center border rounded-md p-2 flex-1 ${
          error ? "border-red-500 bg-red-900/20" : "border-gray-600 bg-gray-800"
        }`}
      >
        {Icon && (
          <Icon
            className={`w-5 h-5 ${error ? "text-red-500" : "text-gray-400"}`}
          />
        )}
        {prepend && (
          <div className="ml-2 font-semibold text-gray-300">{prepend}</div>
        )}
        <input
          className={`flex-1 ml-2 text-base outline-none bg-transparent ${
            error
              ? "text-red-400 placeholder-red-400/50"
              : "text-gray-200 placeholder-gray-500"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          type={type}
          maxLength={maxLength}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
};

export default InputField;
