import axios from "axios";

// make easy request without url copupasting
// make post get delete put request
// send JWT

const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
  const baseUrl = "http://192.168.0.126:8000/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    console.log(fullUrl);
    return axios[method](fullUrl, data, { headers });
  }
};

export const createAccount = (form) => callApi("post", "/users/", form);
