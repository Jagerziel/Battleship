
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
  noShips: true, //Ocean
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
  console.log(`CHECKING ATTRIBUTE ${compAttributes[29].noShips}`) 
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

//Ship Placement Array
let placedCompShips = []
let placedPlayerShips = []

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
        let takenSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          for (let l = 0; l < placedCompShips.length; l++) {
            if (indexCheck === placedCompShips[l]){
              takenSpaces++
            }
          } 
          indexCheck -= 1
        } 
        if (takenSpaces === 0) {
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            compSquares[index].innerHTML = `X${i}`
            placedCompShips.push(index)
            index -= 1
          }
        } else {
          shipPlacement = false
        }
        takenSpaces = 0
      }
    }

  } else {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index + (Object.values(fleet)[i] * 10) - 10 < 100) {
        shipPlacement = true;
        let indexCheck = index
        let takenSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          for (let l = 0; l < placedCompShips.length; l++) {
            if (indexCheck === placedCompShips[l]){
              takenSpaces++
            }
          } 
          indexCheck += 10
        } 
        if (takenSpaces === 0) {
          for (let j = 0; j < Object.values(fleet)[i]; j++) {
            compSquares[index].innerHTML = `Y${i}`
            placedCompShips.push(index)
            index += 10
          }
        } else {
          shipPlacement = false
        }
        takenSpaces = 0
      }
    }
  }
}


//Player Ship Placement
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
        let indexCheck = index
        let takenSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          for (let l = 0; l < placedPlayerShips.length; l++) {
            if (indexCheck === placedPlayerShips[l]){
              takenSpaces++
            }
          } 
          indexCheck -= 1
        } 
        if (takenSpaces === 0) {
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            playerSquares[index].innerHTML = `X${i}`
            playerSquares[index].style.background = '#FF0000'
            placedPlayerShips.push(index)
            index -= 1
          }
        } else {
          shipPlacement = false
        }
        takenSpaces = 0
      }
    }

  } else {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index + (Object.values(fleet)[i] * 10) - 10 < 100) {
        shipPlacement = true;
        let indexCheck = index
        let takenSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          for (let l = 0; l < placedPlayerShips.length; l++) {
            if (indexCheck === placedPlayerShips[l]){
              takenSpaces++
            }
          } 
          indexCheck += 10
        } 
        if (takenSpaces === 0) {
          for (let j = 0; j < Object.values(fleet)[i]; j++) {
            playerSquares[index].innerHTML = `Y${i}`
            playerSquares[index].style.background = '#FF0000'
            placedPlayerShips.push(index)
            index += 10
          }
        } else {
          shipPlacement = false
        }
        takenSpaces = 0
      }
    }
  }
}

//ASSIGN ATTRIBUTES
// for (let i = 0; i < placedCompShips.length; i++) {
//   compAttributes[placedCompShips[i]].shipID = Object.keys(fleet)[i]
//   compAttributes[placedCompShips[i]].shipLength = Object.values(fleet)[i]
//   compAttributes[placedCompShips[i]].noShips = false
// }


// compAttributes[index].shipID = Object.keys(fleet)[i]
// compAttributes[index].shipLength = Object.values(fleet)[i]
// compAttributes[index].noShips = false

//Beginning the Game (Step 2) - To Battle!

//Initializing Variables
let playerTurn = false
let playerShots = 0
let playerHits = 0
let playerSunkCount = 0
let computerSunkCount = 0
let compHit = false
let compIndexArray = []
let compLastIndex;
let endGame = false

//Choosing who goes first
if (Math.random() > 0.5) {
  playerTurn = true
}


















//ALL EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
      console.log(`Clicked square ${i}`);
    })
}
