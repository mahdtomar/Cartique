import axios from "axios";

type config = (
    url: string,
    method: string,
    withCredentials: boolean,
    headers?: object,
    params?: object,
    data?: any
) => void;
const Request: config = async (
    url,
    method,
    withCredentials,
    headers,
    params,
    data
) => {
    const res = await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
        method,
        withCredentials,
        headers,
        params,
        data,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            // if (error.response) {
            //     console.log("Response Error : ", error.response);
            // }
            // if (error.request) {
            //     console.log("error making the request : ", error.request);
            // } else {
            //     console.log("Unexpected Error", error.message);
            // }
            console.error(error);
        });
    return res;
};
axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        const config = error.config;
        if (error.status === 401) {
            console.log("UnAuthorized Request : ", error);
            axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/refresh`,
                method: "POST",
                withCredentials: true,
            }).then(() => {
                axios({ ...config })
                    .then((res) => res)
                    .catch((error) =>
                        console.log("failed to refresh token : ", error)
                    );
            });
        }
        return Promise.reject(error);
    }
);
export default Request;
