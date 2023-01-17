import React from "react";

function Demo() {
  //let counter = 5;
  //   function f() {
  //     let counter = 0;
  //     return function y() {
  //       counter++;
  //     };
  //   }
  const f = (function () {
    var counter = 0;
    return function () {
      counter++;
    };
  })();

  function a() {
    var x = 6;
    return function b() {
      console.log(x);
    };
  }
  var m = a();
  console.log(m());
  return (
    <div>
      <button onClick={f}>Click</button>
    </div>
  );
}

export default Demo;
//  state[
//    {
//      namw:
//      id:
//      state:false
//    }
//    {

//    }
//  ]

//  [
//   ...state,
//   state.map((each) => {
//     if (each.id === action.payLoad) {
//       return { ...each, state: true };
//     } else return { ...each };
//   }),
// ];

// state.map(()=>{

// })
