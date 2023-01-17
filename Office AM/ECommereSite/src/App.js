import logo from "./logo.svg";
import "./App.css";
import Home from "./component/Home";
import Cart from "./component/Cart";
import SuccessPlaceOrder from "./component/SuccessPlaceOrder";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PlaceOrder from "./component/PlaceOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Home/Cart" element={<Cart />}></Route>
          <Route path="/Home/Cart/PlaceOrder" element={<PlaceOrder />}></Route>
          <Route
            path="/SuccessPlaceOrder"
            element={<SuccessPlaceOrder />}
          ></Route>
          <Route path="*" element={<Navigate to="/Home" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
