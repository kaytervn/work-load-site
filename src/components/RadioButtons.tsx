import { useEffect, useState } from "react";

const RadioButtons = ({ options, selectedValue, onValueChange }: any) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue, options]);
  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
  return (
    <div className="mb-4">
      {options.map((option: any, index: any) => (
        <label key={index} className="flex items-center mb-2">
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
            className="hidden peer"
          />
          <span className="mr-2 h-4 w-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
            {selectedOption === option.value && (
              <span className="h-2 w-2 bg-white rounded-full"></span>
            )}
          </span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
