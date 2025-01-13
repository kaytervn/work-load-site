import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DOCS, TOOLS } from "../../types/pageConfig";
import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "../../components/Sidebar";
import { convertJson } from "../../types/apidocs";
import { toast, ToastContainer } from "react-toastify";
import { LoadingDialog } from "../../components/Dialog";
import { useLoading } from "../../hooks/useLoading";
import { isValidURL } from "../../types/utils";
import { CopyIcon } from "lucide-react";

interface QueryParam {
  key: string;
  value: string;
}

const APIDocs = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState<string>("");
  const [apiContent, setApiContent] = useState<any[]>([]);
  const { isLoading, showLoading, hideLoading } = useLoading();
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.title = API_DOCS.label;
  }, []);

  const toggleGroup = (index: number) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(index)) {
      newExpandedGroups.delete(index);
    } else {
      newExpandedGroups.add(index);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const formatQueryParams = (
    query: QueryParam[] | Record<string, any>
  ): string => {
    if (!Array.isArray(query)) return JSON.stringify(query, null, 2);

    return query
      .map((param) => {
        const isRequired = param.value.includes("required: true");
        return `- ${param.key}: ${isRequired ? param.value : param.value}`;
      })
      .join("\n");
  };

  const fetchAndConvert = async () => {
    if (!apiUrl.trim() || !isValidURL(apiUrl)) {
      toast.error("Please enter a valid API URL");
      return;
    }
    setApiContent([]);
    showLoading();
    try {
      const data = await convertJson(apiUrl);
      setApiContent(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      hideLoading();
    }
  };

  const getMethodColor = (method: string): string => {
    const colors: Record<string, string> = {
      get: "text-green-500",
      post: "text-yellow-400",
      put: "text-blue-500",
      delete: "text-red-500",
    };
    return colors[method.toLowerCase()] || "text-gray-500";
  };

  const getMethodColorNative = (method: string): string => {
    const colors: Record<string, string> = {
      get: "#38a169",
      post: "#b45309",
      put: "#3b82f6",
      delete: "#ef4444",
    };
    return colors[method.toLowerCase()] || "#6b7280";
  };

  const handleCopy = (endpoint: any) => {
    const isQuery = Boolean(endpoint.query);
    const payloadContent = isQuery
      ? formatQueryParams(endpoint.query)
      : endpoint.body
      ? JSON.stringify(endpoint.body, null, 2)
      : null;

    const payload = payloadContent
      ? `
    <strong>Payload ${isQuery ? "(Query)" : "(Body)"}:</strong>
    <pre>${payloadContent}</pre>`
      : "";

    const content = `
    <div>
      <strong>Endpoint:</strong> ${endpoint.url}<br>
      <strong>Method: <span style="color: ${getMethodColorNative(
        endpoint.method
      )}">${endpoint.method}</span></strong><br>
      ${payload}
      <strong>Description:</strong> <em>${endpoint.description}</em><br>
      <strong>Response:</strong><pre>${JSON.stringify(
        endpoint.response,
        null,
        2
      )}</pre>
    </div>
  `;

    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/html": new Blob([content], { type: "text/html" }),
        }),
      ])
      .then(() => {
        toast.success("Request copied to clipboard!");
      });
  };

  return (
    <Sidebar
      activeItem={TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={TOOLS.label}
            childLabel={API_DOCS.label}
            onClickParent={() => navigate(TOOLS.path)}
          />
          <div className="mb-4 max-w-4xl w-full mx-auto">
            <h1 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => {
                  setApiContent([]);
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
          </div>

          <div className="space-y-4 max-w-4xl w-full mx-auto">
            {apiContent.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="bg-gray-900 rounded-lg shadow-sm p-4 text-[17px]"
                style={{ WebkitUserSelect: "text", userSelect: "text" }}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleGroup(groupIndex)}
                >
                  <h2 className="text-xl font-bold text-slate-200">
                    {group.name}
                  </h2>
                  <span className="text-slate-200">
                    {expandedGroups.has(groupIndex) ? "▲" : "▼"}
                  </span>
                </div>

                {expandedGroups.has(groupIndex) && (
                  <div className="space-y-4 [&_*]:font-['Times_New_Roman'] mt-3">
                    {group.item.map((endpoint: any, endpointIndex: any) => (
                      <div
                        key={endpointIndex}
                        className="relative rounded-lg p-4 bg-gray-700"
                      >
                        <button
                          onClick={() => handleCopy(endpoint)}
                          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-gray-100 font-bold p-3 rounded-lg text-base"
                        >
                          <CopyIcon size={16} />
                        </button>

                        <p className="text-gray-200">
                          <b>Endpoint:</b> {endpoint.url}
                        </p>
                        <p className="text-gray-200">
                          <b>Method:</b>{" "}
                          <span
                            className={`font-semibold ${getMethodColor(
                              endpoint.method
                            )}`}
                          >
                            {endpoint.method}
                          </span>
                        </p>

                        {(endpoint.query || endpoint.body) && (
                          <>
                            <p className="text-gray-200">
                              <b>
                                Payload {endpoint.query ? "(Query)" : "(Body)"}:
                              </b>
                            </p>
                            <pre
                              className="m-2 p-4 rounded-md overflow-auto whitespace-pre-wrap bg-gray-600 text-gray-200"
                              style={{
                                fontFamily: "Times New Roman",
                                WebkitUserSelect: "text",
                                userSelect: "text",
                              }}
                            >
                              {endpoint.query
                                ? formatQueryParams(endpoint.query)
                                : JSON.stringify(endpoint.body, null, 2)}
                            </pre>
                          </>
                        )}

                        <p className="text-gray-200">
                          <b>Description:</b> <em>{endpoint.description}</em>
                        </p>
                        <p className="text-gray-200">
                          <b>Response:</b>
                        </p>
                        <pre
                          className="m-2 p-2 rounded-md overflow-auto whitespace-pre-wrap bg-gray-600 text-gray-200"
                          style={{
                            fontFamily: "Times New Roman",
                            WebkitUserSelect: "text",
                            userSelect: "text",
                          }}
                        >
                          {JSON.stringify(endpoint.response, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <ToastContainer
            position="bottom-right"
            style={{ width: "400px" }}
            theme="dark"
          />
          <LoadingDialog isVisible={isLoading} />
        </>
      }
    />
  );
};

export default APIDocs;
