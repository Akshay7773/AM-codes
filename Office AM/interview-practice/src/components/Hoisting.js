//Hoisting
//Hoisting takes the variable declaration to the top.
console.log(x); //output : undefind
var x = 10;
console.log(y); //output : Reference error
let y = 10;
console.log(z); //output : Reference error
const z = 10;
