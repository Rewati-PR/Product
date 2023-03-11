let xyz = require("./sales.js");
let abc = require("./mobiles.js");
console.log(xyz.fns.getMobileById(3));
console.log(abc.fns.getMobileById(3));

let a = xyz.fns.getMobileById(3);
let b = abc.fns.getMobileById(3);

console.log(xyz.fn.totalOrderValue(a,b));