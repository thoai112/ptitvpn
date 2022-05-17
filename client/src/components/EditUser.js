import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [fullName, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [role, setRole] = useState('');
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    //const token = localStorage.getItem("token");
    const getUserById = async() => {
        const response = await fetch(`http://localhost:5000/api/${id}`);
        const data = await response.json();
        setName(data.fullName);
        setUsername(data.username);
        setPass(data.password);
        setRole(data.role);
    }

    const updateUser = async(e) => {
        e.preventDefault();
        const user = { fullName,username,password,role};
        await fetch(`http://localhost:5000/api/${id}`,{
            method: "PUT",
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        });
       navigate("/list");
    }

    return (
        <div>
            <form onSubmit={updateUser}>
            <div className="field">
                <label className="label">Full Name</label>
                <div className="control">
                    <input className="input" value={fullName} onChange={(e) => setName(e.target.value)} type="text" placeholder="fullName" />
                </div>
                </div>

                <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
                </div>
                </div>

                <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" value={password} onChange={(e) => setPass(e.target.value)} type="text" placeholder="password" />
                </div>
                </div>

                <div className="field">
                <label className="label">Role</label>
                <div className="control">
                    <input className="input" value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder="role" />
                </div>
                </div>
        
                <div className="field">
                <div className="control">
                    <button className="button is-primary">Update</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default EditUser;
