import { Link } from "react-router-dom";

import { accountApi } from "../../../api/accountApi";


function AppHeader() {
    return (
        <div className="bg-white p-3 shadow-sm">
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <Logo/>
                    <NavBar/>
                    <Account/>
                </div>
            </div>
        </div>
    )
}


export default AppHeader;


// -------------------------------------------------


function Logo() {
    return (
        <h4 className="m-0">Project 3</h4>
    )
}


function NavBar() {
    return (
        <>
            <Link className="H3-16B" to='/home'>Tạo chứng chỉ</Link>
            <Link className="H3-16B" to='/history'>Lịch sử</Link>
        </>
    )
}


function Account() {
    return (
        <a className="H3-16B"
            style={{cursor: 'pointer'}}
            onClick={() => accountApi.signout()}
        >
            Đăng xuất
        </a>
    )
}
