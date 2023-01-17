// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Home from './component/Home';
import Start from './component/Start';
import Finish from "./component/Finish";
function App() {
  return (
    <div className="App">
      <h1 className="main">Interview Portal</h1>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/:id1/:id" element={<Start/>}></Route>
            <Route path="/Finish" element={<Finish/>}></Route>
            <Route path="/" element={<Start/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
