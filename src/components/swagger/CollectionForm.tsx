import { useEffect } from "react";
import { LaptopMinimalIcon, MapPinIcon, PackageIcon } from "lucide-react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import InputField from "../InputField";
import InputFieldWithCheckbox from "../InputFieldWithCheckbox";
import ListRequestsComponent from "./request/ListRequestsComponent";
import {
  generateUniqueId,
  getItemById,
  getRandomColor,
} from "../../types/utils";
import { GORGEOUS_SWAGGER } from "../../types/pageConfig";
import {
  getNewCollectionName,
  mapCollectionRequests,
} from "../../services/SwaggerService";
import ListHeadersComponent from "./header/ListHeadersComponent";

const CollectionForm = ({ isVisible, hideModal, formConfig }: any) => {
  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.collectionName.trim()) {
      newErrors.collectionName = "Collection name is required";
    }
    if (form.localIsChecked && !form.localUrl.trim()) {
      newErrors.localUrl = "Local URL can not be empty";
    }
    if (form.remoteIsChecked && !form.remoteUrl.trim()) {
      newErrors.remoteUrl = "Remote URL can not be empty";
    }
    return newErrors;
  };

  const { form, errors, setForm, setErrors, handleChange, isValidForm } =
    useForm(formConfig.initForm, {}, validate);

  const handleAddRequest = (request: any) => {
    const requests = [...form.requests, request];
    requests.sort((a, b) => {
      const folderCompare = a.folder.localeCompare(b.folder);
      return folderCompare !== 0 ? folderCompare : a.name.localeCompare(b.name);
    });
    setForm({ ...form, requests });
  };

  const handleAddLocalHeader = (header: any) => {
    const headers = [...form.localHeaders, header];
    headers.sort((a, b) => a.key.localeCompare(b.key));
    setForm({ ...form, localHeaders: headers });
  };

  const handleAddRemoteHeader = (header: any) => {
    const headers = [...form.remoteHeaders, header];
    headers.sort((a, b) => a.key.localeCompare(b.key));
    setForm({ ...form, remoteHeaders: headers });
  };

  const handleRemoveLocalHeader = (index: number) => {
    const headers = form.localHeaders.filter((_: any, i: any) => i !== index);
    headers.sort((a: any, b: any) => a.key.localeCompare(b.key));
    setForm({ ...form, localHeaders: headers });
    toast.success("Local header deleted successfully");
  };

  const handleRemoveRemoteHeader = (index: number) => {
    const headers = form.remoteHeaders.filter((_: any, i: any) => i !== index);
    headers.sort((a: any, b: any) => a.key.localeCompare(b.key));
    setForm({ ...form, remoteHeaders: headers });
    toast.success("Remote header deleted successfully");
  };

  const handleEditLocalHeader = (index: number, updatedHeader: any) => {
    const headers = form.localHeaders.map((header: any, i: number) =>
      i === index ? updatedHeader : header
    );
    headers.sort((a: any, b: any) => a.key.localeCompare(b.key));
    setForm({ ...form, localHeaders: headers });
  };

  const handleEditRemoteHeader = (index: number, updatedHeader: any) => {
    const headers = form.remoteHeaders.map((header: any, i: number) =>
      i === index ? updatedHeader : header
    );
    headers.sort((a: any, b: any) => a.key.localeCompare(b.key));
    setForm({ ...form, remoteHeaders: headers });
  };

  const handleEditRequest = (index: any, updatedRequest: any) => {
    setForm((prevForm: any) => {
      const updatedRequests = prevForm.requests.map((item: any, i: number) =>
        i === index ? updatedRequest : item
      );
      updatedRequests.sort((a: any, b: any) => {
        const folderCompare = a.folder.localeCompare(b.folder);
        return folderCompare !== 0
          ? folderCompare
          : a.name.localeCompare(b.name);
      });
      return {
        ...prevForm,
        requests: updatedRequests,
      };
    });
  };

  const handleRemoveRequest = (index: number) => {
    const requests = form.requests.filter((_: any, i: any) => i !== index);
    requests.sort((a: any, b: any) => {
      const folderCompare = a.folder.localeCompare(b.folder);
      return folderCompare !== 0 ? folderCompare : a.name.localeCompare(b.name);
    });
    setForm({ ...form, requests });
    toast.success("Request deleted successfully");
  };

  useEffect(() => {
    setForm(formConfig.initForm);
    setErrors({});
  }, [isVisible]);

  const getNewName = (newName: string) => {
    const col = getItemById(GORGEOUS_SWAGGER.name, form.id);
    if (col.collectionName.toLowerCase() !== newName.toLowerCase()) {
      return getNewCollectionName(newName);
    }
    return col.collectionName;
  };

  const handleSubmit = () => {
    if (isValidForm()) {
      const isUpdateForm = formConfig.isUpdateForm;
      if (!form.localIsChecked && !form.remoteIsChecked) {
        toast.error("Please select at least one URL option");
        return;
      }
      const formattedItem: any = {
        id: isUpdateForm ? form.id : generateUniqueId(),
        collectionName: isUpdateForm
          ? getNewName(form.collectionName)
          : getNewCollectionName(form.collectionName),
        color: getRandomColor(),
        createdAt: isUpdateForm ? form.createdAt : new Date(),
      };
      if (form.localIsChecked) {
        formattedItem.local = {
          url: isUpdateForm
            ? form.localUrl
            : `http://localhost:${form.localUrl}`,
          isInit: true,
          headers: [...form.localHeaders],
        };
      }
      if (form.remoteIsChecked) {
        formattedItem.remote = {
          url: isUpdateForm ? form.remoteUrl : `https://${form.remoteUrl}`,
          isInit: true,
          headers: [...form.remoteHeaders],
        };
      }
      if (form.localIsChecked && form.remoteIsChecked) {
        formattedItem.local.isInit = false;
      }
      if (form.requests.length > 0) {
        formattedItem.requests = mapCollectionRequests(form.requests);
      }
      formConfig.onButtonClick(formattedItem);
    } else {
      toast.error("Please enter valid information");
    }
  };

  if (!isVisible) return null;

  return (
    <CustomModal
      color={formConfig.color}
      onClose={hideModal}
      title={formConfig.title}
      bodyComponent={
        <>
          <InputField
            title="Collection Name"
            isRequire={true}
            placeholder="Enter collection name"
            value={form.collectionName}
            onChangeText={(value: any) => handleChange("collectionName", value)}
            icon={PackageIcon}
            error={errors.collectionName}
          />
          <InputFieldWithCheckbox
            {...(!formConfig.isUpdateForm && {
              type: "number",
              prepend: "http://localhost:",
            })}
            title="Local URL"
            isRequire={false}
            placeholder="Enter port number"
            value={form.localUrl}
            onChangeText={(value: any) => handleChange("localUrl", value)}
            icon={MapPinIcon}
            error={errors.localUrl}
            isChecked={form.localIsChecked}
            onCheckboxChange={() =>
              setForm({ ...form, localIsChecked: !form.localIsChecked })
            }
          />
          {form.localIsChecked && (
            <ListHeadersComponent
              handleAdd={handleAddLocalHeader}
              handleRemove={handleRemoveLocalHeader}
              handleEdit={handleEditLocalHeader}
              headers={form.localHeaders}
            />
          )}
          <InputFieldWithCheckbox
            {...(!formConfig.isUpdateForm && {
              prepend: "https://",
            })}
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
          {form.remoteIsChecked && (
            <ListHeadersComponent
              handleAdd={handleAddRemoteHeader}
              handleRemove={handleRemoveRemoteHeader}
              handleEdit={handleEditRemoteHeader}
              headers={form.remoteHeaders}
            />
          )}
          {(form.localIsChecked || form.remoteIsChecked) && (
            <ListRequestsComponent
              handleAddRequest={handleAddRequest}
              handleEditRequest={handleEditRequest}
              handleRemoveRequest={handleRemoveRequest}
              requests={form.requests}
            />
          )}
        </>
      }
      buttonText={formConfig.buttonText}
      onButtonClick={handleSubmit}
    />
  );
};

export default CollectionForm;
