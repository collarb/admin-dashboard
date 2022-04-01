
export const generateFormData = (payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });
  return formData;
};
