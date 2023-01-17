import logo from "./logo.svg";
import "./App.css";
import Employees from "./components/Employees";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Add from "./components/Add";
import First from "./components/First";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="Employees" element={<Employees />}></Route>
          <Route path="Employees/Add" element={<Add />}></Route>
          <Route path="Employees/Update/:id" element={<Update />}></Route>
          <Route path="*" element={<Navigate to={"/Employees"} />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <First /> */}
    </div>
  );
}

export default App;
