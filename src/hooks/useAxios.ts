import axios, { AxiosRequestConfig } from "axios";

const useAxios = () => {

  const request = async (
    url: string,
    method: "get" | "post" | "put" | "delete",
    data?: object,
    config?: AxiosRequestConfig
  ) => {
    try {

      const axiosConfig: AxiosRequestConfig = {
        ...config,
        method,
        url,
      };

      if (data) {
        axiosConfig.data = data; 
      }

      const response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error)){
        throw error;
      }
    }
  };

  return { request };
};

export default useAxios;
