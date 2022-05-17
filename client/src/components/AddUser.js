import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [fullName, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [role, setRole] = useState('');
    //const history = useHistory();
    let navigate = useNavigate();
    const token = localStorage.getItem("token");
    const saveUser = async(e) => {
        e.preventDefault();
        const user = { fullName,username,password,role };
        await fetch('http://localhost:5000/api/register',{
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        navigate("/list");
    }

    return (
        <div>
            <form onSubmit={saveUser}>
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
                    <button className="button is-primary">Save</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default AddUser;
