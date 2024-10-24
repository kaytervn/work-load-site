import { useState } from "react";

const useForm = (
  initialValues: any,
  initialErrors: any,
  validate: (form: any) => any
) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (field: any, value: any) => {
    setForm((prevForm: any) => ({ ...prevForm, [field]: value }));
    setErrors((prevErrors: any) => ({ ...prevErrors, [field]: null }));
  };

  const isValidForm = () => {
    const newErrors = validate(form);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => {
      if (Array.isArray(error)) {
        return error.some(
          (item) => item && Object.values(item).some((val) => val)
        );
      } else {
        return !!error;
      }
    });
  };

  return {
    form,
    errors,
    setForm,
    setErrors,
    handleChange,
    isValidForm,
  };
};

export default useForm;
