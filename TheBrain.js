const exit = document.querySelector('#button1_exit')

//Assign Player and Comp to variables and create nodelist for each
const compBoard = document.querySelector('.compBoard')
const compSquares = compBoard.children

const playerBoard = document.querySelector('.playerBoard')
const playerSquares = playerBoard.children

//Assign Objects to run concurrent with squares, which allows for selectable attributes
let compAttributes = []
let playerAttributes = []

//Insert objects into arrays
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
    }
    )
  }
  
  for (let i = 0; i < playerSquares.length; i++) {
    playerAttributes.push({
        shipID: '', //Type of Ship
        shipLength: 0, //Length of Ship
        shipSunk: false, //Ship Present or Blank Tile Default Value
        shipHit: false, //Ship Hit
        shipHitCount: 0, //Ship Hit Count to check against length
        shipMiss: false, //Ship Miss count for shot total, log miss in square
        noShip: true, //Ocean
      }
    )
  }

  /*
***Ship Placement (Step 1) - Random Placement***
*/

//Assign variables
let pos = ""; 

//Assign fleet object with keys = "type of ship" and values = "length" 
let fleet = {
  airCraftCarrier: 5,
  destroyer: 4,
  cruiserOne: 3,
  cruiserTwo: 3,
  frigate: 2
}

//Create objects to hold indexes of where the ship is placed (ex. ship can be indexes 76, 77, 78, 79)
let fleetCompIndexes = {
  airCraftCarrier: [],
  destroyer: [],
  cruiserOne: [],
  cruiserTwo: [],
  frigate: []
}

let fleetPlayerIndexes = {
  airCraftCarrier: [],
  destroyer: [],
  cruiserOne: [],
  cruiserTwo: [],
  frigate: []
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
            
            //Push Fleet Indexes
            Object.values(fleetCompIndexes)[i].push(index)

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
                        
            //Push Fleet Indexes
            Object.values(fleetCompIndexes)[i].push(index)

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
          }
          indexCheck -= 1
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = Object.values(fleet)[i]; j > 0; j--) {
            playerSquares[index].innerHTML = `X${i}`
            playerSquares[index].style.background = 'RGB(70, 70, 70, 1)'
            
            //Update Attributes
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
                        
            //Push Fleet Indexes
            Object.values(fleetPlayerIndexes)[i].push(index)

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
          }
          indexCheck += 10
        } 

        //Place Ship if freeSpaces is equal to the Ship's length
        if (freeSpaces === Object.values(fleet)[i]) {
          shipPlacement = true;
          for (let j = 0; j < Object.values(fleet)[i]; j++) {
            playerSquares[index].innerHTML = `Y${i}`
            playerSquares[index].style.background = 'RGB(70, 70, 70, 1)'
            
            //Update Attributes
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
                        
            //Push Fleet Indexes
            Object.values(fleetPlayerIndexes)[i].push(index)

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
let playerTurn = true //turn toggle
let playerShots = 0 //total player shots
let playerHits = 0 //total player hits
let playerSunkCount = 0 //amt of comp ships sunk by player
let computerSunkCount = 0 //amt of player ships sunk by comp
let compHit = false  //Used for AI
let compLastIndex; //Used for AI
let endGame = false //Used to end Game
let turnCountTest = 0 //Testing Turn Count Console Logs - TO BE REMOVED

//Set Computer's Available Moves
let compIndexArray = []
for (let i = 0; i < 100; i++) {
  compIndexArray.push(i)
}

//Shuffle compIndexArray
let a, b;
for (let i = compIndexArray.length-1; i >= 0; i--) {
  a = Math.floor(Math.random() * (i + 1));
  b = compIndexArray[i];
  compIndexArray[i] = compIndexArray[a];
  compIndexArray[a] = b;
}
//Set Variable for beginning iteration through compIndexArray
let compRollIterator = 0 



//Choosing who goes first
if (Math.random() > 0.5) {
  playerTurn = true
}


//Function for Player Turn
const battleAttacks = (idx) => {
  for (let turn = 0; turn < 2; turn++) {
    if (playerTurn === true){
      turnCountTest++
        if (compAttributes[idx].noShip === true) {
          compAttributes[idx].shipMiss = true
          //Change Background and Update Stats
          compSquares[idx].style.background = 'RGB(0, 0, 0, 0)'
          playerShots++
          console.log(`${turnCountTest}) Player Attacks Index ${idx} and misses!`)
        } else {
          compAttributes[idx].shipHit = true
          console.log(`${turnCountTest}) Player Attacks Index ${idx} and hits!`)
          //Applies a hit count to all indexes of hit ship
          for (let i = 0; i < compAttributes[idx].shipLength; i++) {
            let shipType = compAttributes[idx].shipID
            compAttributes[fleetCompIndexes[shipType][i]].shipHitCount++
            if (compAttributes[idx].shipHitCount === compAttributes[idx].shipLength) {
              compAttributes[fleetCompIndexes[shipType][i]].shipSunk = true
            }
          }
          //Iterate Sunk Ship Count
          if (compAttributes[idx].shipHitCount === compAttributes[idx].shipLength) {
            playerSunkCount++
            console.log(`Computer Ship Sunk!`)
          }
            
          //Change Background and Update Stats
          compSquares[idx].style.background = 'RGB(255, 0, 0, 1)'
          playerShots++
          playerHits++  
          //FIX THIS CODE AND CREATE FUNCTION!!!!!!!!! 
          if (playerSunkCount === 5) {
            endGame = true
            return true
          }
          //FIX THIS CODE AND CREATE FUNCTION!!!!!!!!!
        }
        //End Turn
        playerTurn = false

      } else if (compHit === true) {
        //Computer's Turn
        
        //Computer AI on Previously Hit Ship 
        let newHitArray = []
        let surroundingSquares = [-1, 1, -10, 10]
        for (i = 0; i < surroundingSquares.length; i++) {
          if (compLastIndex + surroundingSquares[i] >= 0 && //not off board to the left or top
          compLastIndex + surroundingSquares[i] <= 99 //not off board to the bottom
          ) {
            if (i === 0 || i === 1) {
              if (compLastIndex % 10 + surroundingSquares[i] <= 9) { //not off board to the right
                if (playerAttributes[compLastIndex + surroundingSquares[i]].shipHit === false && playerAttributes[compLastIndex + surroundingSquares[i]].shipMiss === false) {
                  newHitArray.push(compLastIndex + surroundingSquares[i])
                }
              }
            } else if (playerAttributes[compLastIndex + surroundingSquares[i]].shipHit === false && playerAttributes[compLastIndex + surroundingSquares[i]].shipMiss === false) {
              newHitArray.push(compLastIndex + surroundingSquares[i])
            }
          }
        }


        if (newHitArray.length > 0) {
          console.log(`${turnCountTest}) AI Activated: Looking in array ${newHitArray} for next target!`)
        }
        

        //INSERT NEXT PORTION OF AI CODE HERE
        if (newHitArray.length > 0 && playerAttributes[compLastIndex].shipSunk === false) {
          let attackAgainIndex = newHitArray[Math.floor(Math.random() * newHitArray.length)]

          //remove next try from compIndexArray
          compIndexArray.splice(compIndexArray.indexOf(attackAgainIndex),1)

          //Comp Attacks One of the free Index Spaces
          if (playerAttributes[attackAgainIndex].noShip === true) {
            playerAttributes[attackAgainIndex].shipMiss = true
            playerSquares[attackAgainIndex].style.background = 'RGB(0, 0, 0, 0)'
            if (newHitArray.length === 1) {
              compHit = false
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Out of Range!`)
            } else {
              compHit = true
            }
          } else {
            playerAttributes[attackAgainIndex].shipHit = true
            if (newHitArray.length > 0) {
              compHit = true
              compLastIndex = attackAgainIndex
            } else {
              compHit = false
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Out of Range!`)
            }
            console.log(`${turnCountTest}) Computer hit index ${attackAgainIndex}, properties: ${playerAttributes[attackAgainIndex].shipID}`)
            //Applies a hit count to all indexes of hit ship
            for (let i = 0; i < playerAttributes[attackAgainIndex].shipLength; i++) {
              let shipType = playerAttributes[attackAgainIndex].shipID
              playerAttributes[fleetPlayerIndexes[shipType][i]].shipHitCount++
              if (playerAttributes[attackAgainIndex].shipHitCount === playerAttributes[attackAgainIndex].shipLength) {
                playerAttributes[fleetPlayerIndexes[shipType][i]].shipSunk = true
              }
            }
            //Iterate Sunk Ship Count
            if (playerAttributes[attackAgainIndex].shipHitCount === playerAttributes[attackAgainIndex].shipLength) {
              computerSunkCount++
              compHit = false
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Ship Sunk!`)
            }
  
            //Change Background and Update Stats
            playerSquares[attackAgainIndex].style.background = 'RGB(255, 0, 0, 1)'
            
            //FIX THIS CODE AND CREATE FUNCTION!!!!!!!!! 
            if (computerSunkCount === 5) {
              endGame = true
              return true
            }
          } 
          playerTurn = true
        }
      } else {
        //Initialize Computer Random Move
        let indexOfArray = compIndexArray[compRollIterator]
        compLastIndex = indexOfArray

        if (playerAttributes[indexOfArray].noShip === true) {
          playerAttributes[indexOfArray].shipMiss = true
          compHit = false
          playerSquares[indexOfArray].style.background = 'RGB(0, 0, 0, 0)'
          console.log(`${turnCountTest}) Computer attacks index ${indexOfArray} and misses shot`)
        } else {
          playerAttributes[indexOfArray].shipHit = true
          compHit = true

          console.log(`${turnCountTest}) Computer hit index ${indexOfArray}, properties: ${playerAttributes[indexOfArray].shipID}`)
          //Applies a hit count to all indexes of hit ship
          for (let i = 0; i < playerAttributes[indexOfArray].shipLength; i++) {
            let shipType = playerAttributes[indexOfArray].shipID
            playerAttributes[fleetPlayerIndexes[shipType][i]].shipHitCount++
            if (playerAttributes[indexOfArray].shipHitCount === playerAttributes[indexOfArray].shipLength) {
              playerAttributes[fleetPlayerIndexes[shipType][i]].shipSunk = true
            }
          }
          //Iterate Sunk Ship Count
          if (playerAttributes[indexOfArray].shipHitCount === playerAttributes[indexOfArray].shipLength) {
            computerSunkCount++
            compHit = false
          }

          //Change Background and Update Stats
          playerSquares[indexOfArray].style.background = 'RGB(255, 0, 0, 1)'
          
          //FIX THIS CODE AND CREATE FUNCTION!!!!!!!!! 
          if (computerSunkCount === 5) {
            endGame = true
            return true
          }
          //FIX THIS CODE AND CREATE FUNCTION!!!!!!!!!
        }

        //End Turn
        playerTurn = true
        compRollIterator++
        // console.log(`${turnCountTest}) Computer attacks index ${indexOfArray}`)
      }
    }
  }


/*
***Ending the Game (Step 3) - To Battle!***
*/

const endGameFunc = (bool) => {
  if (bool === true) {
    location.href="BattleSummary.html"
  }
}



/*
Remaining Steps:
1) End Game - COMPLETED
2) Battle Summary - 
3) Reset All Statistics
4) Extra Features?
*/



//TESTING
// console.log(playerAttributes[0].shipID)
// console.log(playerAttributes[1].shipID)
// console.log(playerAttributes[2].shipID)
// console.log(playerAttributes[3].shipID)
// console.log(playerAttributes[4].shipID)
// console.log(playerAttributes[5].shipID)
// console.log(playerAttributes[6].shipID)
// console.log(playerAttributes[7].shipID)
// console.log(playerAttributes[8].shipID)
// console.log(playerAttributes[9].shipID)
// console.log(fleetCompIndexes)
// console.log(fleetPlayerIndexes)








//ALL EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
    endGameFunc(battleAttacks(i));
  }, {once: true})
}

exit.addEventListener('onclick', () => {
    endGame = true;
  })