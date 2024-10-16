import { useEffect } from "react";
import { LaptopMinimalIcon, MapPinIcon, PackageIcon } from "lucide-react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import InputField from "../InputField";
import {
  addItemToStorage,
  generateUniqueId,
  getRandomColor,
} from "../../types/utils";
import InputFieldWithCheckbox from "../InputFieldWithCheckbox";
import { GORGEOUS_SWAGGER } from "../../types/constant";

const CreateCollection = ({ isVisible, setVisible, onButtonClick }: any) => {
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
    useForm(
      {
        collectionName: "",
        localUrl: "",
        localIsChecked: false,
        remoteUrl: "",
        remoteIsChecked: false,
      },
      {},
      validate
    );

  useEffect(() => {
    setForm({
      collectionName: "",
      localUrl: "",
      localIsChecked: false,
      remoteUrl: "",
      remoteIsChecked: false,
    });
    setErrors({});
  }, [isVisible]);

  const handleCreate = async () => {
    if (!form.localIsChecked && !form.remoteIsChecked) {
      toast.error("Please select at least one option");
      return;
    }
    if (isValidForm()) {
      const newItem: any = {
        id: generateUniqueId(),
        collectionName: form.collectionName,
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
      addItemToStorage(GORGEOUS_SWAGGER, newItem);
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
        </>
      }
      buttonText="CREATE"
      onButtonClick={handleCreate}
    />
  );
};

export default CreateCollection;
