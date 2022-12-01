// let i = 50
// let j = i;
// console.log(i)
// j+=5
// console.log(j)

let compIndexArray = []
for (let i = 0; i < 100; i++) {
  compIndexArray.push(i)
}
console.log(compIndexArray.length)
for (let i = 0; i < compIndexArray.length; i++) {
  roll = Math.floor(Math.random() * compIndexArray.length)
  compIndexArray.splice(roll, 1)
  console.log(`${i}) ${compIndexArray[roll]}`)
}

