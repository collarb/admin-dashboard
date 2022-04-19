
export const generateFormData = (payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });
  return formData;
};

export const createQueryParams = filter => {
  let params = "";
  Object.keys(filter).forEach(item => params += `&${item}=${filter[item]}`);
  return params;
}

export const getRole = user => {
  if(user?.is_data_entrant) {
    return 2;
  }

  if(user?.is_ddt) {
    return 4;
  }

  if(user?.is_manager) {
    return 3;
  }

  return 2
}
