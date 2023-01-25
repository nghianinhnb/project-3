import axiosClient from "./axiosClient";


export const accountApi = {
    signin({params, body}) {
        const url = `/sign-in`;
        return axiosClient.post(url, {params, ...body});
    },
    signup({params, body}) {
        const url = `/sign-up`;
        return axiosClient.post(url, {params, ...body});
    },
}
