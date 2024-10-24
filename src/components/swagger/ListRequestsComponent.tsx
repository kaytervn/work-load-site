import { PlusIcon } from "lucide-react";
import CreatePMRequestForm from "./CreatePMRequestForm";

const ListRequestsComponent = ({
  handleAddRequest,
  handleRemoveRequest,
  handleChangeRequest,
  errors,
  form,
}: any) => {
  return (
    <div className="space-y-4">
      <button
        onClick={handleAddRequest}
        className="w-full py-2 px-4 border border-blue-500 border-dashed text-blue-800 hover:bg-gray-50 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Request
      </button>
      {form.requests.map((request: any, index: number) => (
        <CreatePMRequestForm
          key={index}
          index={index}
          item={request}
          onDelete={() => handleRemoveRequest(index)}
          errors={errors.childErrors[index]}
          onChange={(field: string, value: any) =>
            handleChangeRequest(index, field, value)
          }
        />
      ))}
    </div>
  );
};

export default ListRequestsComponent;
