# Battleship

## Description
Battleship is a game of naval dominance.  Each player starts with 5 ships and the rules are simple: 
- Five ships of varying lengths are placed randomly on the board for each player
- Each player takes turns targeting a sqaure in the hopes of hitting an enemy ship.  The goal is to sink all enemy ships 
- Once a player sinks all 5 ships, the game ends and that player is declared the winner!

GitHub Pages Link: 3**[Battleship](https://jagerziel.github.io/Battleship/)**


## Screenshots (General Use)
![Battleship Homepage](./README%20Screenshots/Homepage_Screenshot_01.png "Battleship Home Page")
![Battle](./README%20Screenshots/Battle_Screenshot_01.png "Battle!")
![Battle Summary](./README%20Screenshots/Battle_Summary_Screenshot_01.png "Battle Summary")

## Screenshots (Developer)
![Gameplay Screenshot DEV](./README%20Screenshots/Battle_Screenshot_DEV_02.png "Gameplay Screenshot (Developer)")

## Technologies Used
Front End: HTML, CSS, Javascript

## AI Notable Methods
### ***Ship Placement***
1. Determines whether ship will be horizontal or vertical
2. If horizontal:
   - Count backwards from the index % 10 - 1 for the length of the ship to ensure it's greater than 0 (not out of bounds)
   - During this also check the squares to ensure there are no existing ships placed in potential placement path
3. If vertical:
    - Check if the index + ( ship's lengh * 10 ) - 10 is less than 100 (over 100 would be out of bounds)
    - Move downward increasing the index by 10 for the length of the ship and check to ensure there are no existing ships placed in potential path 
4. Count all free spaces and if the amount of free spaces is equal to the ship's length, place the ship

### ***Computer AI Targeting***
The computer keeps a log of the last targeted square.  In the event the last shot was a 'hit' and the player's ship was not sunk, the computer limits it's target to the squares in the four surrounding directions abiding by the following rules that the potential next target:
1. Cannot be out of bounds
2. Cannot be at a square that a previous 'hit' or 'miss' occurred
3. If there are no available squares due to out of bounds or previous shots, return to random targeting

## Future Features
Enhancements that are on the radar for future deployment:

Basic:
- Add button to refresh ship randomization
- Highlight the 'Last Targeted' square for player and computer
- Add targeting icon when hovering over valid attack squares
- Enhance imaging for ships, hits, misses
- Add sound effects / music
- Add messages for when a ship is sunk (currently only in console)
- Add console to show battle summary similar to existing Console Log
- Add 'Play Again' button to Battle Summary page

Advanced:
- Add ship deployement page for the player to manually place ships (or randomize if they so choose)
- Enhance computer AI
- Set multiple computer AI difficulty levels
- Add animation
- Add player vs player mode

## MVP Goals
- Three pages: Starting Page, Battle, Battle Summary
- Randomized Ship Placement for Player and Computer
- Turn Based Play based on Player 'click'
- Minimal Computer AI beyond random targeting

## Wire Frame
![Wireframe Pages 01-06](./README%20Wireframe/Wireframe_01-06.png "Wireframe Pages 01-06")
![Wireframe Pages 07-12](./README%20Wireframe/Wireframe_07-12.png "Wireframe Pages 07-12")
![Wireframe Pages 13-17](./README%20Wireframe/Wireframe_13-17.png "Wireframe Pages 13-17")