import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import styles from "./styles.module.css";
import API from "../../api/api";
//import Sidebar from '../sidebar/Sidebar'
//import authHeader from "../../auth/auth-header";
//import Table from '../../auth/table';
const User = () => {

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
	  { title: 'NAME', field: 'Name' },
	  { title: 'COUNTRY', field: 'FLAG' },
	  { title: 'SERVERIP', field: 'ServerIP' },
	  { title: 'SERVERIP', field: 'ServerPort' },
	]
  
	const token = localStorage.getItem("token");
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	useEffect(() => {
	  API.get(`/server/getserver`,config)
		.then(res => {
		  const users = res.data;
		  setUser(users);
		  // console.log(users);
		})
	}, [])

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>PTIT VPN ADMIN</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				{/* <h1>Material Table Example Using JSONPlaceholder API</h1> <br /><br /> */}
			</nav>
			
			<div className="row">
                <div className="col-12"> 
                    <div className="card">
                        <div className="card__body">
							<MaterialTable
							title="server Details"
							columns={columns}
							data={user}
							options={{
							headerStyle: { borderBottomColor: 'green', borderBottomWidth: '3px' },
							actionsColumnIndex: -1
							}}
							/>
							{/* <Table/> */}
                        </div> 
                     </div>
                </div>
            </div>
			
		</div>
	);
};
	
export default User;
