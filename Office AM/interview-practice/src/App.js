import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Demo from "./Demo";
import CenterDiv from "./CenterDiv";
import ClickCounter from "./components/HOC/ClickCounter";
import "./styles.css";
import HoverCounter from "./components/HOC/HoverCounter";
import RefExample from "./components/Refs/RefExample";
import ComponentA from "./components/UseContext/ComponentA";
import UseReducer from "./components/UserReducer/UseReducer";
import UseCallback from "./components/UseCallback/UseCallback";
import UseMemo from "./components/UseMemo/UseMemo";
import Trial from "./components/Trial";
function App() {
  // const min = 1;
  // const max = 15;
  // const [ans, setAns] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  // //to add  new property to the existing array of object
  // const [arr, setArr] = useState([
  //   {
  //     name: "shraddha",
  //     salary: 20000,
  //     position: "developer",
  //   },
  //   {
  //     name: "karpe",
  //     salary: 30000,
  //     position: "developer",
  //   },
  // ]);
  // useEffect(
  //   () => [
  //     setArr(
  //       arr.map((i) => {
  //         return { ...i, age: 22 };
  //       })
  //     ),
  //   ],
  //   []
  // );
  // //delete a property from every object of state array
  // const deleteProp = () => {
  //   setArr(
  //     arr.map(({ name, ...rest }) => {
  //       return rest;
  //     })
  //   );
  // };
  // //Reversing an array
  // useEffect(() => {
  //   let temp = [];
  //   for (let i = ans.length - 1; i >= 0; i--) {
  //     temp.push(ans[i]);
  //     setAns(temp);
  //   }
  // }, []);
  // console.log(arr);
  // console.log(ans);

  // let v1 = 10;
  // function a() {
  //   let v1 = 11;
  //   console.log(v1);
  // }
  // a();
  // console.log(v1);

  // var userName = "Navnath";

  // function b() {
  //   console.log(userName); // ?

  //   console.log("b");

  //   var userName = "Hemant";
  // }

  // b();
  // debugger;
  // console.log("Script start"); // 1
  // setTimeout(
  //   () => {
  //     console.log("setTimeout");
  //   },
  //   0 // 2
  // );

  // new Promise((resolve, reject) => {
  //   resolve("Promise resolved"); // 3
  // })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  // for (var i = 0; i < 3; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, 5000);
  // }
  var person1 = { firstName: "Jon", lastName: "Kuperman" };
  var person2 = { firstName: "Kelly", lastName: "King" };

  function say() {
    console.log(" " + this.firstName + " " + this.lastName);
  }

  say.call(person1); // Hello Jon Kuperman
  say.call(person2, "Hello"); // Hello Kelly King
  console.log("Script End");
  return (
    <div className="App">
      {/* <CenterDiv />
      <ClickCounter />
      <HoverCounter />
      <RefExample /> */}
      {/* <ComponentA /> */}
      {/* <UseReducer />
      <UseCallback />
      <UseMemo /> */}
      {/* <UseCallback /> */}
      {/* <UseMemo /> */}
      <Trial />
    </div>
  );
}

export default App;
