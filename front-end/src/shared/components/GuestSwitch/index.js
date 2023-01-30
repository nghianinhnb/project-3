import { Navigate, Outlet } from "react-router-dom"
import { accountApi } from "../../../api/accountApi"


function GuestSwitch() {
    return accountApi.isSignedIn()
        ? <Navigate to='/' replace/>
        : <Outlet/>
}


export default GuestSwitch;
