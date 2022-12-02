//Turn grid into nodelist for insertion of statistics
const summaryGrid = document.querySelector('#statGrid')
const summarySquares = summaryGrid.children

summarySquares[0].innerHTML = "Player"
summarySquares[2].innerHTML = "Enemy"
summarySquares[4].innerHTML = "Shots Fired"
summarySquares[7].innerHTML = "Hits"
summarySquares[10].innerHTML = "Accuracy"
summarySquares[13].innerHTML = "Ships Sunk"
summarySquares[16].innerHTML = "Result"

// import from "TheBrain"
let summaryStats = JSON.parse(localStorage.getItem('summaryStats'))
console.log(summaryStats)


let playerShots = summaryStats.playerShots
let compShots = summaryStats.compShots
let playerHits = localStorage.getItem('playerHits')
let compHits = localStorage.getItem('compHits')
let playerSunkCount = localStorage.getItem('playerSunkCount')
let computerSunkCount = localStorage.getItem('computerSunkCount')
console.log(playerShots)


//Shots Fired
summarySquares[3].innerHTML = playerShots
summarySquares[5].innerHTML = compShots
summarySquares[6].innerHTML = playerHits
summarySquares[8].innerHTML = compHits

//Accuracy
summarySquares[9].innerHTML = `${Math.round((playerHits / playerShots)*100)}%`
summarySquares[11].innerHTML = `${Math.round((compHits / compShots)*100)}%`

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





