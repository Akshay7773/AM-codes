// import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import Posts from "./component/Posts";
import Edit from "./component/Edit";
import { useState } from "react";

function App() {
  const [headerName, setHeaderName] = useState("POSTS");
  const [updatedUser, setUpdatedUser] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            <Posts
              values={{ headerName, setHeaderName }}
              updatedUser={updatedUser}
            />
          }
        />
        <Route
          path="/Edit"
          element={
            <Edit
              values={{ headerName, setHeaderName }}
              setUpdatedUser={(value) => setUpdatedUser(value)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
