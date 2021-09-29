import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const setSpecificValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  return [values, handleInputChange, setSpecificValue, reset];
};
