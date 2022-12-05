//Set Variables
const button_homePage = document.querySelector('#button')

//Turn grid into nodelist for insertion of statistics
const summaryGrid = document.querySelector('#statGrid')
const summarySquares = summaryGrid.children

//Set Static Values in Grid
summarySquares[0].innerHTML = "Player"
summarySquares[2].innerHTML = "Enemy"
summarySquares[4].innerHTML = "Shots Fired"
summarySquares[7].innerHTML = "Hits"
summarySquares[10].innerHTML = "Accuracy"
summarySquares[13].innerHTML = "Ships Sunk"
summarySquares[16].innerHTML = "Result"

//Import from "TheBrain" (Local Storage) and turn string back into object
let summaryStats = JSON.parse(localStorage.getItem('summaryStats'))

//Declare Variables
let playerShots = summaryStats.playerShots
let compShots = summaryStats.compShots
let playerHits = summaryStats.playerHits
let compHits = summaryStats.compHits
let playerSunkCount = summaryStats.playerSunkCount
let computerSunkCount = summaryStats.computerSunkCount

//Shots Fired
summarySquares[3].innerHTML = playerShots
summarySquares[5].innerHTML = compShots

//Hits
summarySquares[6].innerHTML = playerHits
summarySquares[8].innerHTML = compHits

//Accuracy
summarySquares[9].innerHTML = (playerShots) > 0 ? `${Math.round((playerHits / playerShots)*100)}%` : `0%`
summarySquares[11].innerHTML = (compShots) > 0 ? `${Math.round((compHits / compShots)*100)}%` : `0%`

//Ships Sunk
summarySquares[12].innerHTML = playerSunkCount
summarySquares[14].innerHTML = computerSunkCount

//Result
const resultComp = (compSunk, playerSunk) => {
  if (playerSunkCount < 5 || computerSunkCount >= playerSunkCount) {
    return `Victory`
  } else {
    return 'Defeat'
  }
}

const resultPlayer= (compSunk, playerSunk) => {
  if (playerSunkCount < 5 || computerSunkCount >= playerSunkCount) {
    return `Defeat`
  } else {
    return `Victory`
  }
}

summarySquares[15].innerHTML = resultPlayer(computerSunkCount, playerSunkCount)
summarySquares[17].innerHTML = resultComp(computerSunkCount, playerSunkCount)

// Clear Local Storage
const clrStorage = () => {
  localStorage.clear()
}

//Event Listeners
button_homePage.addEventListener('click', clrStorage)



