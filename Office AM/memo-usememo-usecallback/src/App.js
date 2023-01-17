import logo from "./logo.svg";
import "./App.css";
import Parent from "./components/Parent";
import { createElement } from "react";

function App() {
  const myElement = createElement("h1", {}, "I do not use JSX!");

  return (
    <div className="App">
      {myElement}
      <Parent />
    </div>
  );
}

export default App;
