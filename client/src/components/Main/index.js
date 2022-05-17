import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import API from "../../api/api";
import styles from "./styles.module.css";
import UserList from '../UserList';
//import ListRoute from '../ListRoute';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		window.location.reload();
	};
	const [user, setUser] = useState([]);
	// const [iserror, setIserror] = useState(false);
	// const [errorMessages, setErrorMessages] = useState([]);
  
	let columns = [
		{ title: 'ID', field: 'id' },
	  { title: 'FULLNAME', field: 'fullName' },
	  { title: 'USERNAME', field: 'username' },
	  { title: 'ROLE', field: 'role' },
	  { title: 'CREAT DATE', field: 'createdDate' },
	]
  
	const token = localStorage.getItem("token");
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	useEffect(() => {
	  API.get(`/api`,config)
		.then(res => {
		  const users = res.data;
		  setUser(users);
		  // console.log(users);
		})
	}, [])

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>PTIT VPN USER</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				{/* <h1>Material Table Example Using JSONPlaceholder API</h1> <br /><br /> */}
			</nav>
			
			<div className="row">
                <div className="col-12"> 
                    <div className="card">
                        <div className="card__body">
							{/* <MaterialTable
							title="User Details"
							columns={columns}
							data={user}
							options={{
							headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
							actionsColumnIndex: -1
							}}
							/> */}
							<UserList/>
							
                        </div> 
                     </div>
                </div>
            </div>
			
		</div>
	);
};

export default Main;

