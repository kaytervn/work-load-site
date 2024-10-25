import { useEffect } from "react";
import { LaptopMinimalIcon, MapPinIcon, PackageIcon } from "lucide-react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import InputField from "../InputField";
import {
  addItemToStorage,
  generateUniqueId,
  getNewCollectionName,
  getRandomColor,
  mapCollectionRequests,
  validateCollectionForm,
} from "../../types/utils";
import InputFieldWithCheckbox from "../InputFieldWithCheckbox";
import { GORGEOUS_SWAGGER } from "../../types/constant";
import useRequestHandlers from "../../hooks/useRequestHandlers";
import ListRequestsComponent from "./ListRequestsComponent";

const CreateCollection = ({ isVisible, setVisible, onButtonClick }: any) => {
  const { form, errors, setForm, setErrors, handleChange, isValidForm } =
    useForm(
      {
        collectionName: "",
        localUrl: "",
        localIsChecked: false,
        remoteUrl: "",
        remoteIsChecked: false,
        requests: [],
      },
      { childErrors: [] },
      validateCollectionForm
    );
  const { handleAddRequest, handleRemoveRequest, handleChangeRequest } =
    useRequestHandlers(form, setForm, errors, setErrors);

  useEffect(() => {
    setForm({
      collectionName: "",
      localUrl: "",
      localIsChecked: false,
      remoteUrl: "",
      remoteIsChecked: false,
      requests: [],
    });
    setErrors({ childErrors: [] });
  }, [isVisible]);

  const handleCreate = async () => {
    if (isValidForm()) {
      if (!form.localIsChecked && !form.remoteIsChecked) {
        toast.error("Select at least one URL option");
        return;
      }
      const newItem: any = {
        id: generateUniqueId(),
        collectionName: getNewCollectionName(form.collectionName),
        color: getRandomColor(),
        createdAt: new Date(),
      };
      if (form.localIsChecked) {
        newItem.local = {
          url: `http://localhost:${form.localUrl}`,
          isInit: true,
        };
      }
      if (form.remoteIsChecked) {
        newItem.remote = {
          url: `https://${form.remoteUrl}`,
          isInit: true,
        };
      }
      if (form.localIsChecked && form.remoteIsChecked) {
        newItem.local.isInit = false;
      }
      if (form.requests.length > 0) {
        newItem.requests = mapCollectionRequests(form.requests);
      }
      addItemToStorage(GORGEOUS_SWAGGER, newItem);
      toast.success("Collection created successfully");
      onButtonClick();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  if (!isVisible) return null;

  return (
    <CustomModal
      color="gray"
      onClose={() => setVisible(false)}
      title="Create New Collection"
      bodyComponent={
        <>
          <InputField
            title="Collection Name"
            isRequire
            placeholder="Enter collection name"
            value={form.collectionName}
            onChangeText={(value: any) => handleChange("collectionName", value)}
            icon={PackageIcon}
            error={errors.collectionName}
          />
          <InputFieldWithCheckbox
            title="Local URL"
            isRequire={false}
            type="number"
            placeholder="Enter port number"
            value={form.localUrl}
            onChangeText={(value: any) => handleChange("localUrl", value)}
            icon={MapPinIcon}
            error={errors.localUrl}
            prepend="http://localhost:"
            isChecked={form.localIsChecked}
            onCheckboxChange={() =>
              setForm({ ...form, localIsChecked: !form.localIsChecked })
            }
          />
          <InputFieldWithCheckbox
            title="Remote URL"
            isRequire={false}
            placeholder="Enter remote URL"
            value={form.remoteUrl}
            onChangeText={(value: any) => handleChange("remoteUrl", value)}
            icon={LaptopMinimalIcon}
            error={errors.remoteUrl}
            prepend="https://"
            isChecked={form.remoteIsChecked}
            onCheckboxChange={() =>
              setForm({ ...form, remoteIsChecked: !form.remoteIsChecked })
            }
          />
          {(form.localIsChecked || form.remoteIsChecked) && (
            <ListRequestsComponent
              handleAddRequest={handleAddRequest}
              handleRemoveRequest={handleRemoveRequest}
              handleChangeRequest={handleChangeRequest}
              form={form}
              errors={errors}
            />
          )}
        </>
      }
      buttonText="CREATE"
      onButtonClick={handleCreate}
    />
  );
};

export default CreateCollection;
