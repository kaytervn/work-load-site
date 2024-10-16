const InputBox = ({ value, placeholder, onChangeText, icon: Icon }: any) => {
  return (
    <div className="flex items-center p-2 border border-gray-300 rounded-md focus-within:border-blue-500 w-80 bg-white">
      <input
        className="flex-1 text-base outline-none text-gray-700 placeholder-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      {Icon && <Icon size={16} className={"text-gray-400"} />}
    </div>
  );
};

export default InputBox;
