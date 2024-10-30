import { PlusIcon } from "lucide-react";
import TableRowComponent from "./TableRowComponent";
import RequestForm from "./RequestForm";
import useModal from "../../hooks/useModal";
import { toast } from "react-toastify";

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
        <span className="space-x-2">
          <span
            className="mr-2"
            style={{ color: getMethodColor(item.method), fontWeight: "bold" }}
          >
            {item.method.toUpperCase()}
          </span>
          <span>{item.name}</span>
        </span>
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
      initForm: request,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-base font-semibold text-gray-800">
              Custom Requests
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
      />
    </>
  );
};

export default ListRequestsComponent;
