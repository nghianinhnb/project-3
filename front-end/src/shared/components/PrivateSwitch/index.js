import { Navigate, Outlet } from "react-router-dom"
import { accountApi } from "../../../api/accountApi"


function PrivateSwitch() {
    return accountApi.isSignedIn()
        ? <Outlet/>
        : <Navigate to='/sign-in' replace/>
}


export default PrivateSwitch;
