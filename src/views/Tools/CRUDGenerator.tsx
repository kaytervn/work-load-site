import { useEffect, useState } from "react";
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

  useEffect(() => {
    document.title = CRUD_GENERATOR.label;
  }, []);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast.error("Please enter your input model");
      return;
    }
    try {
      toast.success("Generated successfully");
      const results = generateOutput(inputText);
      setOutputItems(results);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
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
          <div className="p-4 space-y-4 max-w-6xl w-full mx-auto">
            <div className="bg-gray-700 rounded-xl shadow-sm p-6 space-y-4">
              <h1 className="text-left my-2 text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                CRUD Generator
              </h1>
              <textarea
                className="text-gray-100 placeholder-gray-300 bg-gray-600 h-80 w-full p-4 rounded-lg focus:outline-none"
                rows={6}
                placeholder="Paste your model input here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 transform flex items-center justify-center space-x-2"
              >
                GENERATE
              </button>
            </div>

            <div className="space-y-4">
              {outputItems.map((item, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-4 flex justify-between items-center bg-gray-700">
                    <h2 className="text-lg font-semibold text-gray-100">
                      {item.name}
                    </h2>
                    <div className="flex justify-end items-center space-x-2">
                      <button
                        onClick={() => handleCopy(item.value, `value-${index}`)}
                        className="p-2 text-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-500 flex items-center gap-2"
                      >
                        {copiedStates[`value-${index}`] ? (
                          <CheckCircle2 className="w-4 h-4 text-gray-100" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleDetails(index)}
                        className="m-2 flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                      >
                        {openStates[index] ? (
                          <ChevronUp className="w-6 h-6 text-gray-100" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-100" />
                        )}
                      </button>
                    </div>
                  </div>
                  {openStates[index] && (
                    <pre className="p-4 overflow-x-auto text-gray-50 bg-gray-900">
                      {item.value}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ToastContainer
            position="bottom-right"
            style={{ width: "300px" }}
            theme="dark"
          />
        </>
      }
    />
  );
};

export default CRUDGenerator;
