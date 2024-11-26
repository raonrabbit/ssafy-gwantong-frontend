import axios from "axios";

const localAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SPRING_REST_API_URI,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
};

export { localAxios };
