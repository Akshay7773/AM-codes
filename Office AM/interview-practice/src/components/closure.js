//Closure with example
//Closure is a function along  with its lexical scope bundled together.
//Ex.
function x() {
  let a = 10;
  function y() {
    console.log(a);
  }
  return y;
}
var z = x();
z();

function counter() {
  let count = 0;
  function inner() {
    count = count + 1;
    return count;
  }
  return inner;
}
let res = counter();
console.log(res());
console.log(res());
console.log(res());
