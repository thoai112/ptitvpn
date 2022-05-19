import { Route, useLocation,Routes ,Navigate} from "react-router-dom";
import Sidebar from "./Sidebar/index";
import Home from "./Pages/Home";

import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Login from "./Pages/Login/index"
import Register from "./Pages/Register";
import UserList from "./Pages/Userlist/index";

const Pages = styled.div`
  width: 90vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {
  const location = useLocation();
  const user = localStorage.getItem("token");
  return (
   <>
    {user ? (
      <>
       <Sidebar/>
       <Pages>
           <AnimatePresence exitBeforeEnter>
             <Routes location={location} key={location.pathname}>
               <Route exact path="/" element={<Home />}/>
               <Route path="/user" element={<UserList/>} />
               <Route path="/*" element={<Navigate replace to="/" />} />
             </Routes>
           </AnimatePresence>
         </Pages> 
         </>):(
      <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          
      </Routes>
      )}

   </>
      
  );
}

export default App;
