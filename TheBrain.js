
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
  shipID: '',
  shipLength: 0,
  shipSunk: false,
  shipHit: false,
  shipHitCount: 0,
  shipMiss: false,
  noShip: true,
  gridTurn: false,
  showShip: false
}

//Insert objects into arrays.  Both player and comp done in one array (though this can be broken out into two)
for (let i = 0; i < playerSquares.length; i++) {
  playerAttributes.push({attributes})
  compAttributes.push({attributes})
}

console.log(playerAttributes) //Atribute Testing
console.log(playerAttributes[3].attributes.shipHit) //Pull specific attribute Testing

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

console.log(Object.keys(fleet).length)

for (let i = 0; i < Object.keys(fleet).length; i++) {
  if (Math.random() > 0.5) {
    pos = "Horizontal"
  } else {
    pos = "Vertical"
  }
  console.log(pos)






}


































//ALL EVENT LISTENERS

//Event Listener for Player Clicks on Enemy Board
for (let i = 0; i < playerSquares.length; i++) {
  compSquares[i].addEventListener('click', () => {
      console.log(`Clicked square ${i}`);
    })
}


