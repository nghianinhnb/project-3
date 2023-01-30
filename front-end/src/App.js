import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import AppHeader from "./shared/components/AppHeader";
import PrivateSwitch from "./shared/components/PrivateSwitch";
import GuestSwitch from "./shared/components/GuestSwitch";

import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import Main from "./page/Main";
import History from "./page/History";


function App() {
	return (
		<BrowserRouter>
			<AppHeader/>
			<Switch>
				<Route element={<GuestSwitch/>}>
					<Route path='/sign-in' element={<SignIn/>} />
					<Route path='/sign-up' element={<SignUp/>} />
				</Route>
				
				<Route element={<PrivateSwitch/>}>
					<Route path='/' element={<Main/>} />
					<Route path='/home' element={<Main/>} />
					<Route path='/history' element={<History/>} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}


export default App;
