import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import User from "./components/User";
import Signup from "./components/Singup";
import Login from "./components/Login";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ListRoute from "./components/ListRoute";
import "bulma/css/bulma.css";

function App() {
	const user = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	return (
		
		// <BrowserRouter>
			
				<Routes>
					
					
					{user && role === "Admin" &&<Route path="/" element={<Main />}/>}
					{user && role === "User" &&<Route path="/" element={<User />}/>}
					{user ? (<Route path="/login"  element={<Navigate replace to="/" />} />):(<Route path="/login" exact element={<Login />} />)}
					{user ? (<Route path="/register"  element={<Navigate replace to="/" />} />):(<Route path="/register" exact element={<Signup />} />)}
					
					
					{/* {user &&<Route path="/list" element={<ListRoute/>}/>} */}
					{user && 
						<Route>
							<Route path="/list" exact element={<UserList />} />
							<Route path="/list/add" exact element={<AddUser />} /> 
							<Route path="/list/edit/:id" exact element={<EditUser />} /> 
						</Route>
					}
					
					
					{/* <Route path="/" exact element={<Main />} /> */}
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path="/*" element={<Navigate replace to="/login" />} />
				</Routes>

		// </BrowserRouter>
	);
}

export default App;
