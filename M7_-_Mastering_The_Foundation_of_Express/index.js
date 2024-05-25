/* **** Local Modules **** */

// const myModule = require('./local-1')
const { a, add} = require('./local-1')
const { a : a2, add : add2} = require('./local-2')

// console.log(myModule.add(2, 5))
console.log(a)
console.log(add(2, 5))

console.log(a2)
console.log(add2(2,2,2))

/* **** Built-in Modules **** */

const path = require("path")

// console.log(path.dirname("D:/Atreus/PH-NL3/Next Level Web Development/Mission 2 - Express Expert & Mongoose Master/Module 7 - Mastering The Foundation of Express/index.js"))

// console.log(path.parse("D:/Atreus/PH-NL3/Next Level Web Development/Mission 2 - Express Expert & Mongoose Master/Module 7 - Mastering The Foundation of Express/index.js"))

console.log(path.join("D:/Atreus/PH-NL3/Next Level Web Development/Mission 2 - Express Expert & Mongoose Master/Module 7 - Mastering The Foundation of Express/", "local-1.js"))