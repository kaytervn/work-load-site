import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

const CodeMirrorInput = ({
  title,
  value,
  onChangeText,
  error,
  isRequire = false,
  maxHeight = "100px",
}: any) => {
  return (
    <div className="mb-4">
      {title && (
        <label className="text-base font-semibold text-gray-800 mb-2 text-left flex items-center">
          {title}
          {isRequire && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center">
        <div
          className={`flex items-center border rounded-md p-2 flex-1 ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        >
          <CodeMirror
            value={value}
            height={maxHeight}
            extensions={[javascript()]}
            onChange={(value) => onChangeText(value)}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
};

export default CodeMirrorInput;
