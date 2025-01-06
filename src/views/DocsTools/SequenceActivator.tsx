import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "../../components/Sidebar";
import { DOCUMENT_TOOLS, SEQUENCE_ACTIVATOR } from "../../types/pageConfig";
import { useEffect, useState } from "react";
import { processPUML } from "../../types/sequence";
import { CheckCircleIcon, CopyIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const SequenceActivator: React.FC = () => {
  const navigate = useNavigate();
  const [inputPUML, setInputPUML] = useState<string>("");
  const [outputPUML, setOutputPUML] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = SEQUENCE_ACTIVATOR.label;
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputPUML);
    setCopied(true);
    toast.success("Output copied to clipboard");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Sidebar
      activeItem={DOCUMENT_TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={DOCUMENT_TOOLS.label}
            childLabel={SEQUENCE_ACTIVATOR.label}
            onClickParent={() => navigate(DOCUMENT_TOOLS.path)}
          />
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-7xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Sequence UML Activator
            </h1>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Input
                </h2>
                <textarea
                  value={inputPUML}
                  onChange={(e) => {
                    setOutputPUML("");
                    setInputPUML(e.target.value);
                  }}
                  placeholder="Enter PlantUML sequence diagram code here"
                  className="w-full h-80 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Output
                </h2>
                <textarea
                  value={outputPUML}
                  readOnly
                  placeholder="Processed output will appear here"
                  className="w-full h-80 p-4 border rounded-lg resize-none bg-gray-100 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`absolute flex items-center mt-12 top-2 right-2 px-3 py-1 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
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
              </div>
            </div>
            <button
              onClick={() => {
                setOutputPUML(processPUML(inputPUML));
              }}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              Process Diagram
            </button>
          </div>
          <ToastContainer position="bottom-right" style={{ width: "400px" }} />
        </>
      }
    />
  );
};

export default SequenceActivator;
