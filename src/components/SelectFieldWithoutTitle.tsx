import { useEffect, useState } from "react";

const SelectFieldWithoutTitle = ({
  value,
  onChange,
  options,
  labelKey,
  valueKey,
  renderLabel,
}: any) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  useEffect(() => {
    const selectedItem = options.find((item: any) => item[valueKey] === value);
    if (selectedItem) {
      setSelectedColor(selectedItem.color || "blue");
    }
  }, [value, options, valueKey]);
  return (
    <div className={`flex items-center border rounded-md p-2 border-gray-300`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 text-base outline-none text-gray-700`}
        style={{ color: selectedColor, fontWeight: "bold" }}
      >
        {options.map((item: any) => (
          <option
            key={item[valueKey]}
            value={item[valueKey]}
            style={{ color: item.color || "blue", fontWeight: "bold" }}
          >
            {renderLabel ? renderLabel(item) : item[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldWithoutTitle;
