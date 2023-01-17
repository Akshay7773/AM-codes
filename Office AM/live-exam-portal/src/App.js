import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Start from "./component/Start";
import Edit from "./component/Edit";
import Front from "./component/Front";
import AddQuestion from "./component/AddQuestion";
import Login from "./component/Login";
import { createContext, useState } from "react/cjs/react.development";
export const UserContext = createContext();
function App() {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  console.log(getCookie("access_token"));
  const [authkey, setAuthKey] = useState(getCookie("access_token"));
  // console.log(authkey);
  // let x = document.cookie;
  // console.log(x);
  return (
    <div className="App">
      <UserContext.Provider value={{ authkey, setAuthKey }}>
        <Router>
          {authkey ? (
            <Routes>
              <Route path="/Front" element={<Front />}></Route>
              <Route path="/Start" element={<Start />}></Route>
              <Route path="/Edit/:id" element={<Edit />}></Route>
              <Route path="/AddQuestion" element={<AddQuestion />}></Route>
              <Route path="*" element={<Navigate to="/Front" />}></Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="*" element={<Navigate to="/Login" />}></Route>
            </Routes>
          )}
        </Router>
      </UserContext.Provider>
    </div>
  );
}
export default App;
