// import React from "react";

// function Trial() {
//   var myObject = {
//     hfgjhgj: "a",
//     yrtyr: "e",
//     qwee: "h",
//     vckjlkj: "g",
//     dsasdsds: "d",
//     rtrwyyw: "i",
//     mpopo: "c",
//     mjjhtu: "f",
//     kashd: "b",
//   };
//   var keysSorted = Object.keys(myObject).sort(function (a, b) {
//     console.log(a, b);
//     return myObject[a].localeCompare(myObject[b]);
//   });
//   console.log(myObject);
//   console.log(keysSorted);
//   let sortedObject = {};

//   keysSorted.forEach((key) => {
//     console.log(myObject[key]);
//     sortedObject[" " + key] = myObject[key];
//     sortedObject["lastname"] = "jfgjhfgjgfdj";
//     sortedObject["firstname"] = "jfhjhdsjhk";
//     console.log(sortedObject);
//     // sortedObject = Object.assign({ [key]: myObject[key] }, sortedObject);
//     // console.log(sortedObject);
//   });
//   console.log(sortedObject);

//   return <div></div>;
// }

// export default Trial;

import React from "react";

function Trial() {
  function employee(name, salary, experience) {
    this.name = name;
    this.salary = salary;
    this.experience = experience;
  }

  let emp_shraddha = new employee("shraddha", 20000, 2);

  employee.prototype.getName = function () {
    return this.name;
  };
  console.log(emp_shraddha);

  function programmer(name, salary, experience, role) {
    employee.call(this, name, salary, experience);
    this.role = role;
  }

  programmer.prototype = Object.create(employee.prototype);

  programmer.prototype.constructor = programmer;

  let prog = new programmer("amruta", 20000, 2, "programmer");
  console.log(prog.getName());
  return <div>Trial</div>;
}

export default Trial;
