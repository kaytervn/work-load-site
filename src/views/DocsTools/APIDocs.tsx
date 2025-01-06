import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DOCS, DOCUMENT_TOOLS } from "../../types/pageConfig";
import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "../../components/Sidebar";
import { convertJson } from "../../types/apidocs";

interface QueryParam {
  key: string;
  value: string;
}

const APIDocs = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState<string>("");
  const [apiContent, setApiContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
    setIsLoading(true);
    setError("");
    try {
      const data = await convertJson(apiUrl);
      setApiContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodColor = (method: string): string => {
    const colors: Record<string, string> = {
      get: "text-green-600",
      post: "text-yellow-500",
      put: "text-blue-800",
      delete: "text-red-600",
    };
    return colors[method.toLowerCase()] || "text-gray-600";
  };

  return (
    <Sidebar
      activeItem={DOCUMENT_TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={DOCUMENT_TOOLS.label}
            childLabel={API_DOCS.label}
            onClickParent={() => navigate(DOCUMENT_TOOLS.path)}
          />
          <div className="mb-8">
            <h1 className="text-2xl text-gray-900 mb-4">API Documentation</h1>
            <div className="flex gap-4">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="Enter API-docs URL"
                className="flex-1 p-3 border border-gray-200 rounded-lg text-base focus:outline-none"
              />
              <button
                onClick={fetchAndConvert}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base transition-colors"
              >
                {isLoading ? "Loading..." : "Fetch and Convert"}
              </button>
            </div>
          </div>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="space-y-6 [&_*]:font-['Times_New_Roman']">
            {apiContent.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="bg-white rounded-lg shadow-sm p-4 text-[17px]"
                style={{ WebkitUserSelect: "text", userSelect: "text" }}
              >
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleGroup(groupIndex)}
                >
                  <h2 className="text-xl font-bold text-slate-700">
                    {group.name.toUpperCase()}
                  </h2>
                  <span>{expandedGroups.has(groupIndex) ? "▲" : "▼"}</span>
                </div>

                {expandedGroups.has(groupIndex) && (
                  <div className="space-y-4">
                    {group.item.map((endpoint: any, endpointIndex: any) => (
                      <div
                        key={endpointIndex}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <p>
                          <b>Endpoint:</b> {endpoint.url}
                        </p>
                        <p>
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
                            <p>
                              <b>
                                Payload {endpoint.query ? "(Query)" : "(Body)"}:
                              </b>
                            </p>
                            <pre
                              className="p-4 rounded-md overflow-auto whitespace-pre-wrap"
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

                        <p>
                          <b>Description:</b> <em>None</em>
                        </p>
                        <p>
                          <b>Response:</b>
                        </p>
                        <pre
                          className="p-4 rounded-md overflow-auto whitespace-pre-wrap"
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
        </>
      }
    />
  );
};

export default APIDocs;
