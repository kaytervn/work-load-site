const SelectBox = ({
  value,
  onChange,
  options,
  placeholder,
  labelKey,
  valueKey,
  renderLabel,
}: any) => {
  return (
    <div className="flex items-center p-2 border border-gray-300 rounded-md focus-within:border-blue-500 mr-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-base outline-none text-gray-700"
      >
        <option value="">{placeholder}</option>
        {options.map((item: any) => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {renderLabel ? renderLabel(item) : item[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
