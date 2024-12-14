import { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, CopyIcon } from "lucide-react";
import { getCurrentDate_2 } from "../../types/utils";

const ProcessedUML = ({ isVisible, setVisible, text }: any) => {
  if (!isVisible) return null;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    toast.success("Content copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDownloadButtonClick = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sequence_${getCurrentDate_2()}.puml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
    setVisible(false);
  };

  return (
    <CustomModal
      color="gray"
      onClose={() => setVisible(false)}
      title="Process Sequence UML"
      bodyComponent={
        <div className="relative font-mono text-sm">
          <div className="absolute top-2 right-2">
            <CopyToClipboard text={text} onCopy={handleCopy}>
              <button
                className={`
              flex items-center px-3 py-1 rounded
              transition-all duration-200 ease-in-out
              ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-blue-300 text-gray-700 hover:bg-blue-400"
              }
            `}
              >
                {copied ? (
                  <>
                    <CheckCircleIcon size={16} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon size={16} className="mr-1" />
                    Copy
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg shadow-lg break-words">
            {text}
          </div>
        </div>
      }
      buttonText="DOWNLOAD"
      onButtonClick={handleDownloadButtonClick}
    />
  );
};

export default ProcessedUML;
