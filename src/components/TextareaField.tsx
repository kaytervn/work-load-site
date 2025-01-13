import { useRef, useEffect } from "react";

const TextareaField = ({
  title,
  isRequire = false,
  value,
  placeholder,
  onChangeText,
  error,
  minRows = 3,
  maxHeight = 200,
  errorClass = "text-red-400 bg-red-900/20 border-red-400",
}: any) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: any) => {
    onChangeText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [value]);

  return (
    <div className="flex-1 items-center mb-4">
      {title && (
        <label className="text-base font-semibold text-gray-200 mb-2 text-left flex items-center">
          {title}
          {isRequire && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        className={`flex items-start border rounded-md p-2 flex-1 ${
          error ? errorClass : "border-gray-600 bg-gray-800"
        }`}
      >
        <textarea
          ref={textareaRef}
          className={`flex-1 ml-2 text-base outline-none bg-transparent resize-none ${
            error
              ? "text-red-400 placeholder-red-400/50"
              : "text-gray-200 placeholder-gray-500"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          rows={minRows}
          style={{
            overflowY: "auto",
            maxHeight: `${maxHeight}px`,
          }}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
};

export default TextareaField;
