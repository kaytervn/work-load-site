const InputFieldWithoutTitle = ({
  value = "",
  placeholder = "",
  onChangeText,
  icon: Icon,
  error = "",
  prepend,
  type = "text",
  maxLength = 500,
}: any) => {
  return (
    <div className="flex-1 items-center">
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
  );
};

export default InputFieldWithoutTitle;
