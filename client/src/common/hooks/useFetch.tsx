// import axios from "axios";
// import type { AxiosRequestConfig, AxiosResponse, AxiosError, Method, RawAxiosResponseHeaders, AxiosResponseHeaders } from "axios"
// import { NavigateToLogin } from "../context/UserProvider";
// import { createContext, useCallback, useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// // Define response type with generic for data
// // Improved ApiResponse interface without 'any'
// interface ApiResponse<T = unknown> {
//     data: T;
//     status: number;
//     statusText: string;
//     headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//     config: AxiosRequestConfig;
// }
// // Define function type with proper typing
// type RequestFunction = <T = unknown>(
//     url: string,
//     method: Method,
//     withCredentials: boolean,
//     headers?: Record<string, string>,
//     params?: Record<string, string | number | boolean>,
//     data?: unknown
// ) => Promise<ApiResponse<T>>;



// // handle unAuthorized requests and refresh token




// const FetchContext = createContext<{ Request: RequestFunction }>({ Request })
// export const FetchProvider = ({ children }: { children: React.ReactNode }) => {
//     // let refresh = false
//     const refreshRef = useRef(false)
//     const navigate = useNavigate()
//     const Request: RequestFunction = useCallback(async (
//         url,
//         method,
//         withCredentials,
//         headers,
//         params,
//         data
//     ) => {
//         try {
//             const config: AxiosRequestConfig = {
//                 url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
//                 method,
//                 withCredentials,
//                 headers,
//                 params,
//                 data,
//             };

//             refreshRef.current = true
//             const response = await axios(config);
//             console.log(refreshRef.current)
//             return response.data;
//         } catch (error) {
//             console.error("Request failed:", error);
//             throw error;
//         }
//     }, [])

//     axios.interceptors.response.use(
//         (response: AxiosResponse) => response,
//         async (error: AxiosError) => {
//             const config = error.config;

//             if (error.response?.status === 401 && config && refreshRef.current) {
//                 refreshRef.current = false
//                 console.log("UnAuthorized Request, attempting refresh...", refreshRef.current);

//                 try {
//                     //token refresh
//                     await axios.post(
//                         `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
//                         null,
//                         { withCredentials: true }
//                     );

//                     // rety original request
//                     return axios(config);
//                 } catch (refreshError) {
//                     console.error("Token refresh failed:", refreshError);
//                     NavigateToLogin(navigate)
//                     throw refreshError;
//                 }
//             }

//             return Promise.reject(error);
//         }
//     );
//     return <FetchContext.Provider value={{ Request }}>{children}</FetchContext.Provider>
// }

// export const useFetch = () => useContext(FetchContext)