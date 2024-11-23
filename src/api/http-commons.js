import axios from "axios";

const localAxios = () => {
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api/v1/"
        : "https://ezip.world/api/v1/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
};

export { localAxios };
