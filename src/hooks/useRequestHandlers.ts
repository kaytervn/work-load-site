const useRequestHandlers = (
  form: any,
  setForm: any,
  errors: any,
  setErrors: any
) => {
  const handleAddRequest = () => {
    const requests = [...form.requests];
    requests.push({
      name: "",
      method: "get",
      body: "",
      preScript: "",
      preScriptIsChecked: false,
      postScript: "",
      postScriptIsChecked: false,
      path: "",
      basicAuthIsChecked: false,
    });
    setForm({ ...form, requests });
  };

  const handleRemoveRequest = (index: number) => {
    const requests = [...form.requests];
    const newReqs = requests.filter((_: any, i: any) => i !== index);
    setForm({ ...form, requests: newReqs });
  };

  const handleChangeRequest = (index: number, field: string, value: any) => {
    const requests = [...form.requests];
    requests[index] = { ...requests[index], [field]: value };
    setForm({ ...form, requests });

    const childErrors = [...errors.childErrors];
    childErrors[index] = { ...childErrors[index], [field]: null };

    const allFieldsAreNull = Object.values(childErrors[index]).every(
      (value) => value === null
    );
    if (allFieldsAreNull) {
      setErrors({ ...errors, childErrors: [] });
    } else {
      setErrors({ ...errors, childErrors });
    }
  };

  return { handleAddRequest, handleRemoveRequest, handleChangeRequest };
};

export default useRequestHandlers;
