import axiosClient from "./axiosClient";


export const pdfApi = {
    gen(formData) {
        const url = `pdf/gen`;
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    publish(id) {
        const url = `pdf/upload-to-ipfs/${id}`;
        return axiosClient.get(url);
    }
}
