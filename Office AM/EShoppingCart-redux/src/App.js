import logo from "./logo.svg";
import "./App.css";
import Product from "./component/Product";
import store from "./stores/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./component/Cart";
import PlaceOrder from "./component/PlaceOrder";
import SuccessPlaceOrder from "./component/SuccessPlaceOrder";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Product" element={<Product />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/PlaceOrder" element={<PlaceOrder />} />
            <Route
              path="/SuccessPlaceOrder"
              element={<SuccessPlaceOrder />}
            ></Route>
            <Route path="*" element={<Navigate to="/Product" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
