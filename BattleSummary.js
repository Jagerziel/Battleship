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

// import { playerShotsS } from "./TheBrain"


