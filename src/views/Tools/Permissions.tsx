import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { PERMISSIONS_GENERATOR, TOOLS } from "../../types/pageConfig";
import { useLoading } from "../../hooks/useLoading";
import { isValidURL } from "../../types/utils";
import { toast, ToastContainer } from "react-toastify";
import { convertJsonPermissions } from "../../types/permissions";
import { LoadingDialog } from "../../components/Dialog";

const Permissions = () => {
  const { isLoading, showLoading, hideLoading } = useLoading();
  const [apiUrl, setApiUrl] = useState<string>("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    document.title = PERMISSIONS_GENERATOR.label;
  }, []);

  const fetchAndConvert = async () => {
    if (!apiUrl.trim() || !isValidURL(apiUrl)) {
      toast.error("Please enter a valid API URL");
      return;
    }
    setData([]);
    showLoading();
    try {
      const data = await convertJsonPermissions(apiUrl);
      setData(data);
      console.log(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      hideLoading();
    }
  };

  return (
    <Sidebar
      activeItem={TOOLS.name}
      breadcrumbs={[
        { label: TOOLS.label, path: TOOLS.path },
        { label: PERMISSIONS_GENERATOR.label },
      ]}
      renderContent={
        <>
          <div className="mb-4 max-w-4xl w-full mx-auto">
            <h1 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Permissions Generator
            </h1>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => {
                  setData([]);
                  setApiUrl(e.target.value);
                }}
                placeholder="Enter API docs URL"
                className="text-gray-100 placeholder-gray-500 bg-gray-700 flex-1 p-3 rounded-lg text-base focus:outline-none"
              />
              <button
                onClick={fetchAndConvert}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-gray-100 font-bold px-6 py-3 rounded-lg text-base transition-colors"
              >
                {isLoading ? "Loading..." : "FETCH"}
              </button>
            </div>
            <ToastContainer
              position="bottom-right"
              style={{ width: "400px" }}
              theme="dark"
            />
            <LoadingDialog isVisible={isLoading} />
          </div>
        </>
      }
    />
  );
};

export default Permissions;
