import logo from "./logo.svg";
// import "./App.css";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayUser from "./components/DisplayUser";
import Edit from "./components/Edit";
function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayUser />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
