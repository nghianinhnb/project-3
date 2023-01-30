import axiosClient from "./axiosClient";


export const pdfApi = {
    gen({params, body}) {
        const url = `pdf/gen`;
        return axiosClient.post(url, {params, ...body});
    },
}
