import { useState } from "react";
import { Copy, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { CRUD_GENERATOR, TOOLS } from "../../types/pageConfig";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { generateOutput } from "../../types/crud";
import { toast, ToastContainer } from "react-toastify";

const CRUDGenerator = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [outputItems, setOutputItems] = useState<any[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerate = () => {
    const results = generateOutput(inputText);
    setOutputItems(results);
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const toggleDetails = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Sidebar
      activeItem={TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={TOOLS.label}
            childLabel={CRUD_GENERATOR.label}
            onClickParent={() => navigate(TOOLS.path)}
          />
          <div className="p-6 space-y-6 max-w-6xl w-full mx-auto">
            <div className="border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CRUD Generator
                </h1>
                <p className="text-gray-600">
                  Generate your CRUD operations with ease
                </p>
              </div>
              <textarea
                className="h-80 w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                rows={6}
                placeholder="Paste your model input here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                Generate
              </button>
            </div>

            <div className="space-y-4">
              {outputItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <button
                      onClick={() => handleCopy(item.name, `name-${index}`)}
                      className="p-2 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-200 hover:bg-blue-50 flex items-center gap-2"
                    >
                      {copiedStates[`name-${index}`] ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="border rounded-lg">
                      <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                        <button
                          onClick={() => toggleDetails(index)}
                          className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                        >
                          <span className="mr-2">View</span>
                          {openStates[index] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleCopy(item.value, `value-${index}`)
                          }
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          {copiedStates[`value-${index}`] ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span>Copy Value</span>
                        </button>
                      </div>
                      {openStates[index] && (
                        <div className="p-4">
                          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-100 text-sm">
                            {item.value}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer position="bottom-right" style={{ width: "300px" }} />
        </>
      }
    />
  );
};

export default CRUDGenerator;
