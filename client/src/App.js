import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/admin" element={<Admin/>}/>
			<Route path="*" element={<div>ERROR 404 PAGE NOT FOUND</div>}/>
		</Routes>
	);
}

const Admin = ()=>{

	return(

		<div>Admin Page only</div>
		)
}

export default App;
