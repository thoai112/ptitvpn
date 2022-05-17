import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const token = localStorage.getItem("token");
    const fetchData = async() => {
        const response = await fetch('http://localhost:5000/api', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        setUsers(data);
    }


    

    const deleteUser = async(id) => {
        await fetch(`http://localhost:5000/api/${id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        });
        fetchData();
    }

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div>
            <button onClick={() => togglePopup} className="button is-small is-danger">Delete</button>
            <Link to="/list/add" className="button is-primary">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>username</th>
                        <th>role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{ index + 1 }</td>
                            <td>{ user.fullName }</td>
                            <td>{ user.username }</td>
                            <td>{ user.role }</td>
                            <td>
                                <Link to={`/list/edit/${user.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    

                </tbody>
            </table>
        </div>
    )
}

export default UserList
