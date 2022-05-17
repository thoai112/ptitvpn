import { BrowserRouter as Routers, Route, Switch } from "react-router-dom";
import UserList from "./UserList";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function ListRoute() {
  return (
    <div className="container">
      <Routers>

        <Route path="/list" exact element={<UserList />} />    
        
        <Route path="/list/add" exact element={<AddUser/>} />   
        
        <Route path="/list/edit/:id" exact element={<EditUser/>} />   
        
      </Routers>
      

    </div>
  );
}

export default ListRoute;
