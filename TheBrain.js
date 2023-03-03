//Toggle Developer Mode
let devMode = false

//Exit button variable
const exit = document.querySelector('#button1_exit')

//Assign Player and Comp to variables and create nodelist for each
const compBoard = document.querySelector('.compBoard')
const compSquares = compBoard.children

const playerBoard = document.querySelector('.playerBoard')
const playerSquares = playerBoard.children

//Assign Objects to run concurrent with squares, which allows for selectable attributes
let compAttributes = []
let playerAttributes = []

//Insert an object with each square's properties into an array for compupter Attributes and player Attributes
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
let pos = ""; //Variable for whether the ship's placement will be vertical or horizontal

//Assign fleet object with keys = "type of ship" and values = "length" 
let fleet = {
  airCraftCarrier: 5,
  destroyer: 4,
  cruiserOne: 3,
  cruiserTwo: 3,
  frigate: 2
}

//Create objects to hold the indexes of where the ship is placed (ex. destroyer placed at indexes 76, 77, 78, 79)
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
        //Check potential placement squares to ensure there will be no overlapping ships
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
            //Fleet Positioning with Ship no.  Comment out for final version - USE FOR TESTING
            if (devMode === true) { compSquares[index].innerHTML = `X${i}` }

            //Update Attributes for each square where the ship is placed
            compAttributes[index].noShip = false
            compAttributes[index].shipID = Object.keys(fleet)[i]
            compAttributes[index].shipLength = Object.values(fleet)[i]
            
            //Push Fleet Indexes into fleetCompIndexes for each Ship type
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
        //Check potential placement squares to ensure there will be no overlapping ships
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
            //Fleet Positioning with Ship no.  Comment out for final version - USE FOR TESTING
            if (devMode === true) { compSquares[index].innerHTML = `Y${i}` }
            
            //Update Attributes for each square where the ship is placed
            compAttributes[index].noShip = false
            compAttributes[index].shipID = Object.keys(fleet)[i]
            compAttributes[index].shipLength = Object.values(fleet)[i]
                        
            //Push Fleet Indexes into fleetCompIndexes for each Ship type
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
        //Check potential placement squares to ensure there will be no overlapping ships
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
            //Fleet Positioning with Ship no.  Comment out for final version - USE FOR TESTING
            if (devMode === true) { playerSquares[index].innerHTML = `X${i}` }

            //Change Background to Denote Ship Placement
            playerSquares[index].style.background = 'RGB(70, 70, 70, 1)'
            
            //Update Attributes for each square where the ship is placed
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
                        
            //Push Fleet Indexes into fleetCompIndexes for each Ship type
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
        //Check potential placement squares to ensure there will be no overlapping ships
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
            //Fleet Positioning with Ship no.  Comment out for final version - USE FOR TESTING
            if (devMode === true) { playerSquares[index].innerHTML = `Y${i}` }

            //Change Background to Denote Ship Placement
            playerSquares[index].style.background = 'RGB(70, 70, 70, 1)'
            
            //Update Attributes for each square where the ship is placed
            playerAttributes[index].noShip = false
            playerAttributes[index].shipID = Object.keys(fleet)[i]
            playerAttributes[index].shipLength = Object.values(fleet)[i]
                        
            //Push Fleet Indexes into fleetCompIndexes for each Ship type
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
let compShots = 0 //total comp shots
let compHits = 0 //total comp hits
let playerSunkCount = 0 //amt of comp ships sunk by player
let computerSunkCount = 0 //amt of player ships sunk by comp
let compHit = false //Used for computer AI
let compLastIndex; //Used for computer AI 
let endGame = false //Used to end Game
let turnCountTest = 0 //Turn Count for Console Logs 

//Function for Displaying Battle Log
function addLog (log, setId = false) {
  // Create Element
  let paragraph = document.createElement("p");
  // Create Class Attribute
  paragraph.setAttribute("class", "log")
  // Conditional ID Attribute
  if (setId === "firstLog") {
    paragraph.setAttribute("id", "firstLog")
  } else if (setId === "computer") {
    paragraph.setAttribute("id", "computer")
  } else if (setId === "player") {
    paragraph.setAttribute("id", "player")
  }
  // Add and Append Text
  let text = document.createTextNode(log);
  paragraph.appendChild(text);
  // Add and Append Element
  let element = document.querySelector(".BattleLogContainer3");
  element.appendChild(paragraph);
}

addLog("This is a test", "firstLog");
addLog("This is another test", "computer");
addLog("This is another test", "player");
addLog("This is another test");
addLog("This is another test");
addLog("This is another test");
addLog("This is another test");
addLog("This is another test");
addLog("This is another test");




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

//Choosing who goes first - Req's Build Out and Timing to Show Properly
if (Math.random() > 0.5) {
  playerTurn = true
}

//Function for Player Turn
const battleAttacks = (idx) => {
  //Ensures 2 turns (player + comp) are taken per every click an enemy square
  for (let turn = 0; turn < 2; turn++) {
    if (playerTurn === true){
      turnCountTest++
        if (compAttributes[idx].noShip === true) {
          //Log Attack, Change Square Background, Update Stats, and Console Log
          compAttributes[idx].shipMiss = true
          compSquares[idx].style.background = 'RGB(0, 0, 0, 0)'
          playerShots++
          console.log(`${turnCountTest}) Player Attacks Index ${idx} and misses!`)
        } else {
          //Log Attack, and Console Log
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
          //Iterate Sunk Ship Count, and Console Log
          if (compAttributes[idx].shipHitCount === compAttributes[idx].shipLength) {
            playerSunkCount++
            console.log(`Computer Ship Sunk!`)
          }
            
          //Change Square Background, and Update Stats
          compSquares[idx].style.background = 'RGB(255, 0, 0, 1)'
          playerShots++
          playerHits++  

          //Execute End Game if 5 Ships Sunk
          if (playerSunkCount === 5) {
            endGame = true
            return true
          }
        }
        //End Turn
        playerTurn = false

      } else if (compHit === true) {
        //Computer's Turn
        
        //Computer AI: Determine Indexes to Target Next
        let newHitArray = [] //Holds "Next Attack" Indexes
        let surroundingSquares = [-1, 1, -10, 10] //Left, Right, Up, Down Checks
        for (i = 0; i < surroundingSquares.length; i++) {
          if (compLastIndex + surroundingSquares[i] >= 0 && //not off board to the left or top
          compLastIndex + surroundingSquares[i] <= 99 //not off board to the bottom
          ) {
            if (i === 0 || i === 1) { //additional check for horizontal AI to capture valid "next target" squares
              if (compLastIndex % 10 + surroundingSquares[i] <= 9) { //not off board to the right
                if (playerAttributes[compLastIndex + surroundingSquares[i]].shipHit === false && playerAttributes[compLastIndex + surroundingSquares[i]].shipMiss === false) {
                  //Push "next target" into newHitArray for Horizontal checks
                  newHitArray.push(compLastIndex + surroundingSquares[i])
                }
              }
            } else if (playerAttributes[compLastIndex + surroundingSquares[i]].shipHit === false && playerAttributes[compLastIndex + surroundingSquares[i]].shipMiss === false) {
              //Push "next target" into newHitArray for Vertical checks
              newHitArray.push(compLastIndex + surroundingSquares[i])
            }
          }
        }
        //Console Log AI Activation
        if (newHitArray.length > 0) {
          //Console Log that the AI is activated when there has been a hit on the previous turn
          console.log(`${turnCountTest}) AI Activated: Looking in array ${newHitArray} for next target!`)
        }
        //Computer AI: Target Indexes that are stored in Array (indexes were shuffled at start of game)
        if (newHitArray.length > 0 && playerAttributes[compLastIndex].shipSunk === false) {
          let attackAgainIndex = newHitArray[Math.floor(Math.random() * newHitArray.length)]

          //remove next try from compIndexArray - this is to avoid double-attacking of squares
          compIndexArray.splice(compIndexArray.indexOf(attackAgainIndex),1)

          //Comp Attacks One of the free Index Spaces
          if (playerAttributes[attackAgainIndex].noShip === true) {
            //Log Attack, Change Square Background, and Update Stats
            playerAttributes[attackAgainIndex].shipMiss = true
            compShots++
            playerSquares[attackAgainIndex].style.background = 'RGB(0, 0, 0, 0)'
            if (newHitArray.length === 1) {
              //Log Attack, Update Attack Again Index, and Console Log
              compHit = false //Set to false because there will be no more valid "next target" indexes - return to random targeting
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Out of Range!`)
            } else {
              //Update Attack Again Index - continue targeting squares for next - target.
              //NOTE: Attack Again Index not set here so AI circles around last hit square until successful hit or no available options
              compHit = true
            }
          } else {
            //Log Attack, and Update Stats
            playerAttributes[attackAgainIndex].shipHit = true
            compShots++
            compHits++
            if (newHitArray.length > 0) {
              //Log Attack, and Set Comp Attack Index to current square (AI targets new surrounding indexes)
              compHit = true
              compLastIndex = attackAgainIndex
            } else {
              //Log Attack, Set Comp Attack Index, and Console Log
              compHit = false //Comp will target random square next turn
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Out of Range!`)
            }
            //Console Log turn result and type of ship that was hit
            console.log(`${turnCountTest}) Computer hit index ${attackAgainIndex}, properties: ${playerAttributes[attackAgainIndex].shipID}`)
            //Applies a hit count to all indexes of hit ship
            for (let i = 0; i < playerAttributes[attackAgainIndex].shipLength; i++) {
              let shipType = playerAttributes[attackAgainIndex].shipID
              playerAttributes[fleetPlayerIndexes[shipType][i]].shipHitCount++
              if (playerAttributes[attackAgainIndex].shipHitCount === playerAttributes[attackAgainIndex].shipLength) {
                playerAttributes[fleetPlayerIndexes[shipType][i]].shipSunk = true
              }
            }
            //Iterate Sunk Ship Count, Log Attack, and Console Log
            if (playerAttributes[attackAgainIndex].shipHitCount === playerAttributes[attackAgainIndex].shipLength) {
              computerSunkCount++
              compHit = false //Deactivate AI since ship is sunk
              compLastIndex = attackAgainIndex
              console.log(`AI Deactivated - Ship Sunk!`)
            }
  
            //Change Background
            playerSquares[attackAgainIndex].style.background = 'RGB(255, 0, 0, 1)'
            
            //Execute End Game if 5 Ships Sunk
            if (computerSunkCount === 5) {
              endGame = true
              return true
            }
          } 
          //End Turn
          playerTurn = true
        }
      } else {
        //Initialize Computer Random Move
        let indexOfArray = compIndexArray[compRollIterator]
        compLastIndex = indexOfArray
        
        if (playerAttributes[indexOfArray].noShip === true) {
          //Log Attack, Change Square Background, Update Stats, and Console Log
          playerAttributes[indexOfArray].shipMiss = true
          compHit = false
          playerSquares[indexOfArray].style.background = 'RGB(0, 0, 0, 0)'
          compShots++
          console.log(`${turnCountTest}) Computer attacks index ${indexOfArray} and misses shot`)
        } else {
          //Log Attack, and Console Log
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
          //Iterate Sunk Ship Count, and Console Log
          if (playerAttributes[indexOfArray].shipHitCount === playerAttributes[indexOfArray].shipLength) {
            computerSunkCount++
            compHit = false
          }

          //Change Square Background, and Update Stats
          playerSquares[indexOfArray].style.background = 'RGB(255, 0, 0, 1)'
          compShots++
          compHits++
          
          //Execute End Game if 5 Ships Sunk
          if (computerSunkCount === 5) {
            endGame = true
            return true
          }
        }

        //End Turn and Increate compRollIterator (Move to next index for random attack)
        playerTurn = true
        compRollIterator++
      }
  }
}


/*
***Ending the Game (Step 3) - To Battle!***
*/

const endGameFunc = (bool) => {
  if (bool === true) {
    //Exporting Variables for Battle Summary
    let summaryStats = {}
    summaryStats[`playerShots`] = playerShots
    summaryStats[`compShots`] = compShots
    summaryStats[`playerHits`] = playerHits
    summaryStats[`compHits`] = compHits
    summaryStats[`playerSunkCount`] = playerSunkCount
    summaryStats[`computerSunkCount`] = computerSunkCount
    //Store Local Variable Object
    localStorage.setItem('summaryStats', JSON.stringify(summaryStats))
    //Go to Battle Summary
    location.href="BattleSummary.html"
  }
}

//EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
    //Execute Turn (battleAttacks).  Turn will return "true" if game has ended to execute endGameFunc
    endGameFunc(battleAttacks(i));
  }, {once: true})
}

exit.addEventListener('click', () => {
  endGameFunc(true) //Ends game and navigates to Battle Summary when exit button clicked
})
