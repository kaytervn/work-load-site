import { useEffect } from "react";
import { LaptopMinimalIcon, MapPinIcon, PackageIcon } from "lucide-react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import InputField from "../InputField";
import {
  getItemById,
  getNewCollectionName,
  getRandomColor,
  mapCollectionRequests,
  overwriteItemInStorage,
  validateCollectionForm,
} from "../../types/utils";
import InputFieldWithCheckbox from "../InputFieldWithCheckbox";
import { GORGEOUS_SWAGGER } from "../../types/constant";
import useRequestHandlers from "../../hooks/useRequestHandlers";
import ListRequestsComponent from "./ListRequestsComponent";

const UpdateCollection = ({
  itemId,
  isVisible,
  setVisible,
  onButtonClick,
}: any) => {
  const { form, errors, setForm, setErrors, handleChange, isValidForm } =
    useForm(
      {
        collectionName: "",
        localUrl: "",
        localIsChecked: false,
        remoteUrl: "",
        remoteIsChecked: false,
        createdAt: "",
        requests: [],
      },
      { childErrors: [] },
      validateCollectionForm
    );
  const { handleAddRequest, handleRemoveRequest, handleChangeRequest } =
    useRequestHandlers(form, setForm, errors, setErrors);
  const getNewName = (newName: string) => {
    const col = getItemById(GORGEOUS_SWAGGER, itemId);
    if (col.collectionName.toLowerCase() !== newName.toLowerCase()) {
      return getNewCollectionName(newName);
    }
    return col.collectionName;
  };
  useEffect(() => {
    if (itemId) {
      const item = getItemById(GORGEOUS_SWAGGER, itemId);
      const requests = [];
      if (item.requests?.length > 0) {
        for (const i in item.requests) {
          const req = item.requests[i];
          requests.push({
            name: req.name,
            method: req.method,
            body: req.body ? req.body : "",
            preScript: req.preScript ? req.preScript : "",
            preScriptIsChecked: req.preScript ? true : false,
            postScript: req.postScript ? req.postScript : "",
            postScriptIsChecked: req.postScript ? true : false,
            path: req.path,
            basicAuthIsChecked: req.basicAuth,
          });
        }
      }
      setForm({
        collectionName: item.collectionName,
        localUrl: item.local ? item.local.url : "",
        localIsChecked: item.local ? true : false,
        remoteUrl: item.remote ? item.remote.url : "",
        remoteIsChecked: item.remote ? true : false,
        createdAt: item.createdAt,
        requests: requests,
      });
      setErrors({ childErrors: [] });
    }
  }, [isVisible, itemId]);

  const handleUpdate = async () => {
    if (isValidForm()) {
      if (!form.localIsChecked && !form.remoteIsChecked) {
        toast.error("Please select at least one URL option");
        return;
      }
      const newItem: any = {
        id: itemId,
        collectionName: getNewName(form.collectionName),
        color: getRandomColor(),
        createdAt: form.createdAt,
      };
      if (form.localIsChecked) {
        newItem.local = {
          url: form.localUrl,
          isInit: true,
        };
      }
      if (form.remoteIsChecked) {
        newItem.remote = {
          url: form.remoteUrl,
          isInit: true,
        };
      }
      if (form.localIsChecked && form.remoteIsChecked) {
        newItem.local.isInit = false;
      }
      if (form.requests.length > 0) {
        newItem.requests = mapCollectionRequests(form.requests);
      }
      overwriteItemInStorage(GORGEOUS_SWAGGER, newItem);
      toast.success("Collection updated successfully");
      onButtonClick();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  if (!isVisible) return null;

  return (
    <CustomModal
      color="blue"
      onClose={() => setVisible(false)}
      title="Update Collection Form"
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
            placeholder="Enter local URL"
            value={form.localUrl}
            onChangeText={(value: any) => handleChange("localUrl", value)}
            icon={MapPinIcon}
            error={errors.localUrl}
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
      buttonText="UPDATE"
      onButtonClick={handleUpdate}
    />
  );
};

export default UpdateCollection;
