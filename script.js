// const unit = 250;

// if (unit <= 100) {
//   console.log(Math.floor(unit * 4.2));
// } else if (unit > 100 && unit <= 200) {
//   let secUnit = unit - 100;
//   console.log(Math.floor((unit - 100) * 5 + secUnit * 4.2));
// } else if (unit > 200 && unit <= 300) {
//   let below100 = unit - 100;
//   let below200 = unit - 200;
//   let below300 = unit - (below100 + below200);
//   console.log(Math.floor(below100 * 4.2) + below200 * 5 + below300 * 6);
// }

let rupees = 9760;
const note500 = Math.floor(rupees / 500)
let remainingRupees = rupees % 500
const note200 = Math.floor(remainingRupees / 200)
remainingRupees %= 200
const note100 = Math.floor(remainingRupees / 100)
remainingRupees %= 100
const note50 = Math.floor(remainingRupees /50)
remainingRupees %=50
const note20 = Math.floor(remainingRupees /20)
remainingRupees %=20
const note10 = Math.floor(remainingRupees /10)
remainingRupees %=10

console.log({note500,note200,note100,note20,note10})