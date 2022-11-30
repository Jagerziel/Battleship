
//Assign Player and Comp to variables and create nodelist for each
const playerBoard = document.querySelector('.playerBoard')
const playerSquares = playerBoard.children

const compBoard = document.querySelector('.compBoard')
const compSquares = compBoard.children

//Assign Objects to run concurrent with squares, which allows for selectable attributes
let playerAttributes = []
let compAttributes = []

//Assign attributes 
let attributes = {
  noShip: true, //Ocean
  shipID: '', //Type of Ship
  shipLength: 0, //Length of Ship
  shipSunk: false, //Ship Present or Blank Tile Default Value
  shipHit: false, //Ship Hit
  shipHitCount: 0, //Ship Hit Count to check against length
  shipMiss: false, //Ship Miss count for shot total, log miss in square
  gridTurn: false, //
  showShip: false //Show Ship on Board
}

//Insert objects into arrays.  Both player and comp done in one array (though this can be broken out into two)
for (let i = 0; i < playerSquares.length; i++) {
  playerAttributes.push(attributes)
  compAttributes.push(attributes)
}

// console.log(playerAttributes) //Atribute Testing
// console.log(playerAttributes[3].attributes.shipHit) //Pull specific attribute Testing
// abc = 50
// for (let i = 0; i < 3; i++) {
  console.log(`CHECKING ATTRIBUTE ${compAttributes[29].noShip}`) 
//   abc--
// }

//Ship Placement (Step 1) - Random Placement

//Assign variables
let pos = "";
let fleet = {
  airCraftCarrier: 5,
  destroyer: 4,
  cruiserOne: 3,
  cruiserTwo: 3,
  frigate: 2
}

// console.log(Object.keys(fleet).length)
// console.log(Object.entries(fleet))

//Computer Ship Placement
for (let i = 0; i < Object.keys(fleet).length; i++) {
  //Randomize ship: vertical or horizontal
  if (Math.random() > 0.5) {
    pos = "Horizontal"
  } else {
    pos = "Vertical"
  }

  //Ship Placement 
  if (pos === "Horizontal") {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index % 10 - Object.values(fleet)[i] + 1 >= 0) {
        shipPlacement = true;
        console.log(`Start Horizontal Placement at index ${index}`)
        


        let indexCheck = index
        console.log(`index is ${index} and indexCheck is ${indexCheck}`)
        let freeSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          console.log(`noShip is equal to ${compAttributes[indexCheck].noShip}`)
          if (compAttributes[indexCheck].noShip === true) {
            freeSpaces++  
          }
          console.log(`IndexCheck is ${indexCheck} and free spaces is ${freeSpaces}`)
          indexCheck -= 1
        } 
        if (Object.values(fleet)[i] === freeSpaces) {
          console.log("SHIP PLACED")
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            compAttributes[index].shipID = Object.keys(fleet)[i]
            compAttributes[index].shipLength = Object.values(fleet)[i]
            // compAttributes[index].noShip = false
            compSquares[index].innerHTML = `X${i}`
            console.log(`X placed at index ${index}`)
            console.log(`Properties changed to ${compAttributes[index]}`)
            index -= 1
          }
        } else {
          console.log("SHIP NOT PLACED")
        }
        freeSpaces = 0;
      }
    }
    console.log(compAttributes)
  } else {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index + (Object.values(fleet)[i] * 10) - 10 < 100) {
        shipPlacement = true;
        console.log(`Start Vertical Placement at index ${index}`)
        for (let j = 0; j < Object.values(fleet)[i]; j++) {
          compAttributes[index].shipID = Object.keys(fleet)[i]
          compAttributes[index].shipLength = Object.values(fleet)[i]
          // compAttributes[index].noShip = false
          compSquares[index].innerHTML = `Y${i}`
          console.log(`Y placed at index ${index}`)
          console.log(`Properties changed to ${compAttributes[index]}`)
          index += 10
        }
      }
    }
  }
}


// console.log(`FINAL CHECK ${compAttributes[50].attributes.noShip}`)




//ALL EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
      console.log(`Clicked square ${i}`);
    })
}
