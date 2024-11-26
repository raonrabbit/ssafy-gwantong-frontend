import axios from "axios";

const localAxios = () => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}/api/v1/`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      crossDomain: true,
    },
  });
  return instance;
};

export { localAxios };
