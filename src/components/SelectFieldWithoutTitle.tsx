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
      setSelectedColor(selectedItem.color || "lightblue");
    }
  }, [value, options, valueKey]);

  return (
    <div
      className={`flex items-center border rounded-md p-2 border-gray-600 bg-gray-800`}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 text-base outline-none bg-transparent text-gray-200`}
        style={{ color: selectedColor, fontWeight: "bold" }}
      >
        {options.map((item: any) => (
          <option
            key={item[valueKey]}
            value={item[valueKey]}
            style={{
              color: item.color || "lightblue",
              fontWeight: "bold",
              backgroundColor: "#1f2937",
            }}
          >
            {renderLabel ? renderLabel(item) : item[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldWithoutTitle;
