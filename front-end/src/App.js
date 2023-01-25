import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import Main from "./page/Main";
import History from "./page/History";


function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path='/sign-up' element={<SignUp/>} />
			<Route path='/sign-in' element={<SignIn/>} />
			<Route path={['/', '/home']} element={<Main/>} />
			<Route path='/history' element={<History/>} />
		</Routes>
		</BrowserRouter>
	);
}


export default App;
