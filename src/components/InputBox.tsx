const InputBox = ({ value, placeholder, onChangeText, icon: Icon }: any) => {
  return (
    <div className="w-full md:w-[20rem] flex items-center p-3 rounded-md bg-gray-600">
      <input
        className="flex-1 text-base outline-none text-gray-100 placeholder-gray-300 bg-gray-600"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      {Icon && <Icon size={16} className={"text-gray-100"} />}
    </div>
  );
};

export default InputBox;
