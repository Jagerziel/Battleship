// let i = 50
// let j = i;
// console.log(i)
// j+=5
// console.log(j)

// let compIndexArray = []
// for (let i = 0; i < 100; i++) {
//   compIndexArray.push(i)
// }
// console.log(compIndexArray.length)
// for (let i = compIndexArray.length; i > 0; i--) {
//   roll = Math.floor(Math.random() * compIndexArray.length)
//   compIndexArray.splice(roll, 1)
//   console.log(`${i}) ${compIndexArray[roll]}`)
// }

// function shuffle(index) {
//   let j, x, i;
//   for (i = index.length - 1; i > 0; i--) {
//       j = Math.floor(Math.random() * (i + 1));
//       x = index[i];
//       index[i] = index[j];
//       index[j] = x;
//   } return deal(index);
// }

let compIndexArray = []
for (let i = 0; i < 100; i++) {
  compIndexArray.push(i)
}

let a, b;
for (let i = compIndexArray.length-1; i >= 0; i--) {
  a = Math.floor(Math.random() * (i + 1));
  b = compIndexArray[i];
  compIndexArray[i] = compIndexArray[a];
  compIndexArray[a] = b;
  console.log(`${i}) ${compIndexArray[i]}`)
}

console.log(`Testing index no ${3} at index ${compIndexArray.indexOf(3)}`)
