import axiosClient from "./axiosClient";


export const historyApi = {
    all({params, body}) {
        const url = `/history`;
        return axiosClient.get(url, {params, ...body});
    },
}
