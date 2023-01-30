import axiosClient from "./axiosClient";


let isSignedIn;

export const accountApi = {
    async signin({params, body}) {
        const url = `/sign-in`;
        const res = await axiosClient.post(url, {params, ...body});
        localStorage.setItem('isSignedIn', 1);
        return res
    },
    async signup({params, body}) {
        const url = `/sign-up`;
        const res = await axiosClient.post(url, {params, ...body});
        localStorage.setItem('isSignedIn', 1);
        return res
    },
    async signout() {
        const url = '/sign-out';
        const res = await axiosClient.get(url);
        localStorage.setItem('isSignedIn', isSignedIn = 0);
        return res
    },
    isSignedIn() {
        if (isSignedIn) return isSignedIn;
        return isSignedIn = parseInt(localStorage.getItem('isSignedIn'))
    }
}
