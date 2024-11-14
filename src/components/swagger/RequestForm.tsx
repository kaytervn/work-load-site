import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { PathPattern } from "../../types/constant";
import CodeMirrorInput from "../CodeMirrorInput";
import CodeMirrorWithCheckbox from "../CodeMirrorWithCheckbox";
import CustomModal from "../CustomModal";
import InputFieldWithoutTitle from "../InputFieldWithoutTitle";
import SelectFieldWithoutTitle from "../SelectFieldWithoutTitle";
import { toast } from "react-toastify";
import { FolderPenIcon, LinkIcon } from "lucide-react";

const RequestForm = ({ isVisible, hideModal, formConfig }: any) => {
  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.path.trim()) {
      newErrors.path = "Path is required";
    } else if (!PathPattern.test(form.path)) {
      newErrors.path = "Path is invalid";
    }
    if (form.method === "post" || form.method === "put") {
      if (!form.body.trim()) {
        newErrors.body = "Body JSON can not be empty";
      }
    }
    if (form.preScriptIsChecked && !form.preScript.trim()) {
      newErrors.preScript = "Pre-script can not be empty";
    }
    if (form.postScriptIsChecked && !form.postScript.trim()) {
      newErrors.postScript = "Post-script can not be empty";
    }
    return newErrors;
  };

  const { form, errors, setForm, setErrors, handleChange, isValidForm } =
    useForm(formConfig.initForm, {}, validate);

  useEffect(() => {
    setForm(formConfig.initForm);
    setErrors({});
  }, [isVisible]);

  const handleSubmit = async () => {
    if (isValidForm()) {
      formConfig.onButtonClick(form);
    } else {
      toast.error("Please enter the correct information");
    }
  };

  if (!isVisible) return null;

  return (
    <CustomModal
      color={formConfig.color}
      width="600px"
      onClose={hideModal}
      title={formConfig.title}
      bodyComponent={
        <div className="space-y-4">
          <div className="flex-1 mb-2">
            <div className="flex items-center space-x-2 justify-center">
              <InputFieldWithoutTitle
                placeholder="Enter request name"
                value={form.name}
                icon={FolderPenIcon}
                error={errors?.name}
                onChangeText={(value: any) => handleChange("name", value)}
              />
              <SelectFieldWithoutTitle
                value={form.authKind}
                options={[
                  { value: "0", name: "Inherit Auth", color: "#3498DB" },
                  { value: "1", name: "No Auth", color: "#E74C3C" },
                  { value: "2", name: "Basic Auth", color: "#4CAF50" },
                ]}
                labelKey="name"
                valueKey="value"
                onChange={(value: any) => handleChange("authKind", value)}
              />
            </div>
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors?.name}
              </p>
            )}
          </div>
          <div className="flex-1 mb-2">
            <div className="flex items-center space-x-2">
              <InputFieldWithoutTitle
                prepend="{{apiUrl}}"
                placeholder="Enter request path"
                value={form.path}
                icon={LinkIcon}
                onChangeText={(value: any) => handleChange("path", value)}
                error={errors?.path}
              />
              <SelectFieldWithoutTitle
                value={form.method}
                options={[
                  { value: "get", name: "GET", color: "#49cc99" },
                  { value: "post", name: "POST", color: "#fca130" },
                  { value: "put", name: "PUT", color: "#0056D2" },
                  { value: "delete", name: "DELETE", color: "#f93e3e" },
                ]}
                labelKey="name"
                valueKey="value"
                onChange={(value: any) => handleChange("method", value)}
              />
            </div>
            {errors?.path && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors?.path}
              </p>
            )}
          </div>
          {(form.method === "post" || form.method === "put") && (
            <CodeMirrorInput
              title="Body JSON"
              isRequire={true}
              value={form.body}
              error={errors?.body}
              onChangeText={(value: any) => handleChange("body", value)}
            />
          )}
          <CodeMirrorWithCheckbox
            title="Pre-Script"
            placeholder="Enter pre-script"
            value={form.preScript}
            onChangeText={(value: any) => handleChange("preScript", value)}
            error={errors?.preScript}
            isChecked={form.preScriptIsChecked}
            onCheckboxChange={() =>
              handleChange("preScriptIsChecked", !form.preScriptIsChecked)
            }
          />
          <CodeMirrorWithCheckbox
            title="Post-Script"
            width="530px"
            placeholder="Enter post-script"
            value={form.postScript}
            onChangeText={(value: any) => handleChange("postScript", value)}
            error={errors?.postScript}
            isChecked={form.postScriptIsChecked}
            onCheckboxChange={() =>
              handleChange("postScriptIsChecked", !form.postScriptIsChecked)
            }
          />
        </div>
      }
      buttonText={formConfig.buttonText}
      onButtonClick={handleSubmit}
    />
  );
};

export default RequestForm;
