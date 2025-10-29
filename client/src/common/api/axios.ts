import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError, Method, RawAxiosResponseHeaders, AxiosResponseHeaders } from "axios"
import { NavigateToLogin } from "../context/UserProvider";
// Define response type with generic for data
// Improved ApiResponse interface without 'any'
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig;
}
let refresh = false
// Define function type with proper typing
type RequestFunction = <T = unknown>(
  url: string,
  method: Method,
  withCredentials: boolean,
  headers?: Record<string, string>,
  params?: Record<string, string | number | boolean | T>,
  data?: unknown
) => Promise<ApiResponse<T>>;

const Request: RequestFunction = async (
  url,
  method,
  withCredentials,
  headers,
  params,
  data
) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
      method,
      withCredentials,
      headers,
      params,
      data,
    };

    refresh = true
    const response = await axios(config);
    console.log(refresh)
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

// handle unAuthorized requests and refresh token
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config;
    
    if (error.response?.status === 401 && config && refresh) {
      refresh = false
      console.log("UnAuthorized Request, attempting refresh..." , refresh);

      try {
        //token refresh
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          null,
          { withCredentials: true }
        );
        
        // rety original request
        return axios(config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        NavigateToLogin()
        throw refreshError;
      }
    }
    
    return Promise.reject(error);
  }
);

export default Request;