
//Assign Player and Comp to variables and create nodelist for each
const playerBoard = document.querySelector('.playerBoard')
const playerSquares = playerBoard.children

const compBoard = document.querySelector('.compBoard')
const compSquares = compBoard.children

//Assign Objects to run concurrent with squares, which allows for selectable attributes
let playerAttributes = []
let compAttributes = []

//Insert objects into arrays
for (let i = 0; i < playerSquares.length; i++) {
  playerAttributes.push({
      shipID: '', //Type of Ship
      shipLength: 0, //Length of Ship
      shipSunk: false, //Ship Present or Blank Tile Default Value
      shipHit: false, //Ship Hit
      shipHitCount: 0, //Ship Hit Count to check against length
      shipMiss: false, //Ship Miss count for shot total, log miss in square
      noShip: true, //Ocean
      gridTurn: false, //
      showShip: false //Show Ship on Board
    }
  )
}

for (let i = 0; i < compSquares.length; i++) {
  compAttributes.push(
    {
      shipID: '', //Type of Ship
      shipLength: 0, //Length of Ship
      shipSunk: false, //Ship Present or Blank Tile Default Value
      shipHit: false, //Ship Hit
      shipHitCount: 0, //Ship Hit Count to check against length
      shipMiss: false, //Ship Miss count for shot total, log miss in square
      noShip: true, //Ocean
      gridTurn: false, //
      showShip: false //Show Ship on Board
    }
  )
}

/*
***Ship Placement (Step 1) - Random Placement***
*/

//Assign variables
let pos = "";
let fleet = {
  airCraftCarrier: 5,
  destroyer: 4,
  cruiserOne: 3,
  cruiserTwo: 3,
  frigate: 2
}

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
        //Loop to ensure there will be no overlapping ships
        let indexCheck = index
        let freeSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          if (compAttributes[indexCheck].noShip === true) {
            freeSpaces++
          }
          indexCheck -= 1
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            compSquares[index].innerHTML = `X${i}`

            //Update Attributes
            compAttributes[index].noShip = false
            compAttributes[index].shipID = Object.keys(fleet)[i]
            compAttributes[index].shipLength = Object.values(fleet)[i]

            //Iterate Index
            index -= 1
          }
        } 
      }
    }

  } else {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index + (Object.values(fleet)[i] * 10) - 10 < 100) {
        //Loop to ensure there will be no overlapping ships
        let indexCheck = index
        let freeSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          if (compAttributes[indexCheck].noShip === true) {
            freeSpaces++
          }
          indexCheck += 10
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = 0; j < Object.values(fleet)[i]; j++) {
            compSquares[index].innerHTML = `Y${i}`
            
            //Update Attributes
            compAttributes[index].noShip = false
            compAttributes[index].shipID = Object.keys(fleet)[i]
            compAttributes[index].shipLength = Object.values(fleet)[i]
            
            //Iterate Index
            index += 10
          }
        }
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
        //Loop to ensure there will be no overlapping ships
        let indexCheck = index
        let freeSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          if (playerAttributes[indexCheck].noShip === true) {
            freeSpaces++
            console.log(`X Axis Free Space ${freeSpaces}`)
          }
          indexCheck -= 1
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            playerSquares[index].innerHTML = `X${i}`
            playerSquares[index].style.background = '#FF0000'
            
            //Update Attributes
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
            
            //Iterate Index
            index -= 1
          }
        } 
      }
    }

  } else {
    let shipPlacement = false
    while (shipPlacement === false) {
      let index = Math.floor(Math.random() * 100)
      if (index + (Object.values(fleet)[i] * 10) - 10 < 100) {
        //Loop to ensure there will be no overlapping ships
        let indexCheck = index
        let freeSpaces = 0
        for (let k = Object.values(fleet)[i]; k > 0; k--) {
          if (playerAttributes[indexCheck].noShip === true) {
            freeSpaces++
            console.log(`Y Axis Free Space ${freeSpaces}`)
          }
          indexCheck += 10
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = 0; j < Object.values(fleet)[i]; j++) {
            playerSquares[index].innerHTML = `Y${i}`
            playerSquares[index].style.background = '#FF0000'
            
            //Update Attributes
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
            
            //Iterate Index
            index += 10
          }
        } 
      }
    }
  }
}

/*
***Beginning the Game (Step 2) - To Battle!***
*/

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








//TESTING
console.log(playerAttributes[0].shipID)
console.log(playerAttributes[1].shipID)
console.log(playerAttributes[2].shipID)
console.log(playerAttributes[3].shipID)
console.log(playerAttributes[4].shipID)
console.log(playerAttributes[5].shipID)
console.log(playerAttributes[6].shipID)
console.log(playerAttributes[7].shipID)
console.log(playerAttributes[8].shipID)
console.log(playerAttributes[9].shipID)
console.log(playerAttributes[10].shipID)








//ALL EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
      console.log(`Clicked square ${i}`);
    })
}
