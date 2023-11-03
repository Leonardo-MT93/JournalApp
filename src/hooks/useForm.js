import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidator, setFormValidator] = useState({});
  useEffect(() => {
    createValidators();
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidator(formCheckedValues);
  };

  const isFormValid = useMemo( ()=> {

    for (const formValue of Object.keys(formValidator)) {
        if(formValidator[formValue] !== null) return false;
    }

    return true;

  }, [formValidator]) 

  useEffect(() => {
    setFormState(initialForm)
  
  }, [initialForm])
  

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidator,
    isFormValid
  };
};
