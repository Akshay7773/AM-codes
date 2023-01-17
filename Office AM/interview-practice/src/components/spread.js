//Spread and rest operators
//Spread : The main difference between rest and spread is that the rest operator puts the rest of some specific user-supplied values into a JavaScript array
//Rest : the spread syntax expands iterables into individual elements.
//Ex.Rest
var myName = ["Marina", "Magdy", "Shafiq"];
const [firstName, ...familyName] = myName;
console.log(firstName);
console.log(familyName);

function myData(...args) {
  console.log(args); // ["Marina",24,"Front-End Developer"]
}
myData("Marina", 24, "Front-End Developer");

//Ex.Spread
var myName = ["Marina", "Magdy", "Shafiq"];
var newArr = [...myName, "FrontEnd", 24];
console.log(newArr); // ["Marina" , "Magdy" , "Shafiq" , "FrontEnd" , 24 ] ;
