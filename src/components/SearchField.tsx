import { useState } from "react";

const SearchField = ({
  title,
  isRequire = false,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
}: any) => {
  const [inputValue, setInputValue] = useState("");
  const [customOptions, setCustomOptions] = useState(options);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue && !customOptions.includes(inputValue)) {
      setCustomOptions([...customOptions, inputValue]);
      onChange(inputValue);
    }
  };

  const handleSelectChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="text-base font-semibold text-gray-800 mb-2 block text-left">
        {title}
        {isRequire && <span className="text-red-500">{" *"}</span>}
      </label>
      <div
        className={`flex flex-col border rounded-md p-2 ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddOption();
          }}
          disabled={disabled}
          placeholder="Type to add or select an option..."
          className={`flex-1 mb-2 p-1 border rounded-md text-base outline-none ${
            error ? "text-red-500 bg-red-50" : "text-gray-700"
          }`}
        />
        <select
          disabled={disabled}
          value={value}
          onChange={handleSelectChange}
          className={`flex-1 p-1 text-base outline-none ${
            error ? "text-red-500 bg-red-50" : "text-gray-700"
          }`}
        >
          {customOptions.map((option: any, index: any) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
};

export default SearchField;
