import { PlusIcon } from "lucide-react";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
import TableRowComponentHeader from "./TableRowComponentHeader";
import HeaderForm from "./HeaderForm";
import { truncateString } from "../../../types/utils";

const ListHeadersComponent = ({ handleAdd, handleRemove, headers }: any) => {
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();
  const columns = [
    {
      accessor: "name",
      align: "left",
      render: (item: any) => (
        <span className="space-x-2">
          <span
            className="bg-gray-100 rounded-lg p-1"
            style={{ fontWeight: 600 }}
          >
            {truncateString(item.key, 20)}
          </span>
          <span>{truncateString(item.value, 20)}</span>
        </span>
      ),
    },
  ];

  const onAddButtonClick = () => {
    showModal({
      title: "Add New Header",
      color: "gray",
      buttonText: "ADD",
      onButtonClick: (form: any) => {
        handleAdd(form);
        hideModal();
        toast.success("Header added successfully");
      },
      initForm: {
        key: "",
        value: "",
      },
    });
  };

  return (
    <>
      <div className="space-y-4 border-t border-b py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-base font-semibold text-red-800">
              Headers
            </label>
            {headers.length > 0 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {headers.length}
              </span>
            )}
          </div>
          <button
            onClick={onAddButtonClick}
            className="border border-red-500 border-dashed hover:border-red-800 text-red-500 py-1 px-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          >
            <PlusIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        {headers.length > 0 && (
          <TableRowComponentHeader
            headers={headers}
            columns={columns}
            handleRemove={handleRemove}
          />
        )}
      </div>
      <HeaderForm
        isVisible={isModalVisible}
        hideModal={hideModal}
        formConfig={formConfig}
      />
    </>
  );
};

export default ListHeadersComponent;
