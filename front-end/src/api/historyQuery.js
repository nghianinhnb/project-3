import { useQuery } from "@tanstack/react-query";

import axiosClient from "./axiosClient";


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
}
