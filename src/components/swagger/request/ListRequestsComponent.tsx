import { FolderIcon, PlusIcon } from "lucide-react";
import RequestForm from "./RequestForm";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
import TableRowComponent from "./TableRowComponent";
import { getUniqueFolders } from "../../../services/SwaggerService";
import { truncateString } from "../../../types/utils";

const ListRequestsComponent = ({
  handleAddRequest,
  handleEditRequest,
  handleRemoveRequest,
  requests,
}: any) => {
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();

  const getMethodColor = (method: any) => {
    const options = [
      { value: "get", color: "#49cc99" },
      { value: "post", color: "#fca130" },
      { value: "put", color: "#0056D2" },
      { value: "delete", color: "#f93e3e" },
    ];
    const option = options.find((opt) => opt.value === method.toLowerCase());
    return option ? option.color : "black";
  };

  const columns = [
    {
      accessor: "name",
      align: "left",
      render: (item: any) => (
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <FolderIcon size={16} className="mr-1 text-gray-500" />
            <span className="text-gray-700 font-medium">
              {truncateString(item.folder, 20)}
            </span>
          </div>
          <span
            className="mr-2 font-bold"
            style={{ color: getMethodColor(item.method) }}
          >
            {item.method.toUpperCase()}
          </span>
          <span>{truncateString(item.name, 30)}</span>
        </div>
      ),
    },
  ];

  const onAddButtonClick = () => {
    showModal({
      title: "Add New Request",
      color: "gray",
      buttonText: "ADD",
      onButtonClick: (form: any) => {
        handleAddRequest(form);
        hideModal();
        toast.success("Request added successfully");
      },
      initForm: {
        name: "",
        path: "",
        body: "",
        method: "get",
        preScript: "",
        preScriptIsChecked: false,
        postScript: "",
        postScriptIsChecked: false,
        authKind: "0",
        folder: "custom-requests",
        isCustomHost: "0",
        host: "",
      },
    });
  };

  const onEditButtonClick = (index: any, request: any) => {
    showModal({
      title: "Edit Request",
      color: "blue",
      buttonText: "EDIT",
      onButtonClick: (request: any) => {
        handleEditRequest(index, request);
        hideModal();
        toast.success("Request edited successfully");
      },
      initForm: {
        ...request,
        isCustomHost: request.host.trim() ? "1" : "0",
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-base font-semibold text-gray-800">
              Request(s)
            </label>
            {requests.length > 0 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {requests.length}
              </span>
            )}
          </div>
          <button
            onClick={onAddButtonClick}
            className="bg-gray-600 hover:bg-gray-800 text-white py-1 px-2 rounded-lg flex items-center"
          >
            <PlusIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        {requests.length > 0 && (
          <TableRowComponent
            requests={requests}
            columns={columns}
            handleRemoveRequest={handleRemoveRequest}
            handleEditRequest={onEditButtonClick}
          />
        )}
      </div>
      <RequestForm
        isVisible={isModalVisible}
        hideModal={hideModal}
        formConfig={formConfig}
        folders={getUniqueFolders(requests)}
      />
    </>
  );
};

export default ListRequestsComponent;
