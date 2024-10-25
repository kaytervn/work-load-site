import CustomModal from "../CustomModal";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";

const ConvertCollection = ({
  isVisible,
  setVisible,
  json,
  onButtonClick,
}: any) => {
  if (!isVisible) return null;
  const handleButtonClick = () => {
    const jsonString = JSON.stringify(json, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      toast.success("Copied to clipboard");
      onButtonClick();
    });
  };
  return (
    <CustomModal
      color="blue"
      onClose={() => setVisible(false)}
      title="Gorgeous Swagger Converter"
      bodyComponent={
        <div className="overflow-auto p-4 bg-gray-200 rounded-lg shadow-lg">
          <SyntaxHighlighter
            language="json"
            style={solarizedlight}
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
            }}
          >
            {JSON.stringify(json, null, 2)}
          </SyntaxHighlighter>
        </div>
      }
      buttonText="COPY"
      onButtonClick={handleButtonClick}
    />
  );
};

export default ConvertCollection;
