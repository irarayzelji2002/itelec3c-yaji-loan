// Remove only the specified field error
export const clearFieldError = (field, setErrors) => {
  setErrors((prevErrors) => {
    if (prevErrors && prevErrors[field]) {
      const remainingErrors = { ...prevErrors };
      delete remainingErrors[field];
      return remainingErrors;
    }
    return prevErrors;
  });
};
