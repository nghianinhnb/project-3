import axios from "axios";


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});


axiosClient.interceptors.response.use(
    (response) => {
        if (response?.data) return response.data;
        return response;
    }
);


export default axiosClient;
