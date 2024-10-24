import {
  BracesIcon,
  FolderPenIcon,
  LinkIcon,
  SquareCodeIcon,
  Trash2Icon,
} from "lucide-react";
import SelectFieldWithoutTitle from "../SelectFieldWithoutTitle";
import InputFieldWithoutTitle from "../InputFieldWithoutTitle";
import Checkbox from "../Checkbox";
import CodeMirrorWithCheckbox from "../CodeMirrorWithCheckbox";
import CodeMirrorInput from "../CodeMirrorInput";

const CreatePMRequestForm = ({
  index,
  item,
  onDelete,
  onChange,
  errors,
}: any) => {
  return (
    <>
      <label className="text-base font-semibold text-gray-800 text-left flex items-center">
        {`Request ${index + 1}`}
        <span className="ml-1 text-red-500">*</span>
      </label>
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <div className="flex-1 mb-2">
          <div className="flex items-center space-x-2 justify-center">
            <InputFieldWithoutTitle
              placeholder="Enter request name"
              value={item.name}
              icon={FolderPenIcon}
              error={errors?.name}
              onChangeText={(value: any) => onChange("name", value)}
            />
            <Checkbox
              title="Basic Auth"
              isChecked={item.basicAuthIsChecked}
              onCheckboxChange={() =>
                onChange("basicAuthIsChecked", !item.basicAuthIsChecked)
              }
            />
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition duration-200 ease-in-out flex items-center justify-center"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
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
              value={item.path}
              icon={LinkIcon}
              onChangeText={(value: any) => onChange("path", value)}
              error={errors?.path}
            />
            <SelectFieldWithoutTitle
              value={item.method}
              options={[
                { value: "get", name: "GET", color: "#49cc99" },
                { value: "post", name: "POST", color: "#fca130" },
                { value: "put", name: "PUT", color: "#0056D2" },
                { value: "delete", name: "DELETE", color: "#f93e3e" },
              ]}
              labelKey="name"
              valueKey="value"
              onChange={(value: any) => onChange("method", value)}
            />
          </div>
          {errors?.path && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors?.path}
            </p>
          )}
        </div>
        {(item.method === "post" || item.method === "put") && (
          <CodeMirrorInput
            title="Body JSON"
            isRequire={true}
            value={item.body}
            error={errors?.body}
            icon={BracesIcon}
            onChangeText={(value: any) => onChange("body", value)}
          />
        )}
        <CodeMirrorWithCheckbox
          title="Pre-Script"
          placeholder="Enter pre-script"
          value={item.preScript}
          onChangeText={(value: any) => onChange("preScript", value)}
          icon={SquareCodeIcon}
          error={errors?.preScript}
          isChecked={item.preScriptIsChecked}
          onCheckboxChange={() =>
            onChange("preScriptIsChecked", !item.preScriptIsChecked)
          }
        />
        <CodeMirrorWithCheckbox
          title="Post-Script"
          placeholder="Enter post-script"
          value={item.postScript}
          onChangeText={(value: any) => onChange("postScript", value)}
          icon={SquareCodeIcon}
          error={errors?.postScript}
          isChecked={item.postScriptIsChecked}
          onCheckboxChange={() =>
            onChange("postScriptIsChecked", !item.postScriptIsChecked)
          }
        />
      </div>
    </>
  );
};

export default CreatePMRequestForm;
