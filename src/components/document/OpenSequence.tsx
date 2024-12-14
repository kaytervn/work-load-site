import useForm from "../../hooks/useForm";
import CustomModal from "../CustomModal";
import TextareaField from "../TextareaField";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ProcessedUML from "./ProcessedUML";

const OpenSequence = ({ isVisible, setVisible }: any) => {
  const [processUMLVisible, setProcessUMLVisible] = useState(false);
  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.data.trim()) {
      newErrors.data = "PlantUML data is required";
    }
    return newErrors;
  };
  const { form, errors, setForm, setErrors, handleChange, isValidForm } =
    useForm({ data: "" }, {}, validate);
  const handleButtonClick = () => {
    if (isValidForm()) {
      setProcessUMLVisible(true);
    } else {
      toast.error("Please enter valid information");
    }
  };
  useEffect(() => {
    setForm({ data: "" });
    setErrors({});
  }, [isVisible]);
  if (!isVisible) return null;
  return (
    <>
      <CustomModal
        color="blue"
        onClose={() => setVisible(false)}
        title="Sequence Activator"
        bodyComponent={
          <TextareaField
            title="PlantUML Data"
            isRequire
            placeholder="Enter PlantUML sequence diagram data"
            value={form.data}
            onChangeText={(value: any) => handleChange("data", value)}
            error={errors.data}
            minRows={10}
            maxHeight={10000}
          />
        }
        buttonText="SUBMIT"
        onButtonClick={handleButtonClick}
      />
      <ProcessedUML
        isVisible={processUMLVisible}
        setVisible={setProcessUMLVisible}
        text={form.data}
      />
    </>
  );
};

export default OpenSequence;
