import { useQuery, useMutation } from "@tanstack/react-query";

import axiosClient from "./axiosClient";
import queryClient from "./queryClient";


export const historyQuery = {
    useHistory(params) {
        return useQuery(
            ['History', params],
            async () => {
                const url = `/history`;
                const {data, total} = await axiosClient.get(url, {params});
                return {history: data, hasNextPage: (params.page + 1) * 10 < total};
            },
            {
                placeholderData: {}
            }
        )
    },

    usePublishMutation() {
        return useMutation({
            mutationKey: ['Publish'],
            mutationFn(certId) {
                const url = `pdf/upload-to-ipfs/${certId}`;
                return axiosClient.get(url);
            },
            onSuccess() {
                queryClient.invalidateQueries({queryKey: ['History']})
            },
        })
    }
}
