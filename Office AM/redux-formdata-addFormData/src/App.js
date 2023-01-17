import logo from "./logo.svg";
import "./App.css";
import store from "./component/features/store";
import { Provider } from "react-redux";
import Form from "./component/Form";
import AddFormValues from "./component/AddFormValues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // <Provider store={store}>

    <Provider className="App" store={store}>
      <BrowserRouter store={store}>
        <Routes>
          <Route path="/" element={<AddFormValues />}></Route>
          <Route path="/Form" element={<Form />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
