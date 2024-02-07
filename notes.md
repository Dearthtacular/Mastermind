console.log('success')


----- constants --------------------------------------------------------------

const pegColors = ['clear', 'red', 'white', 'blue', 'green', 'yellow', 'black'] 
//  This can be used for peg color choices (or lack thereof) for both the player and computer.

const playerGuessHistory = {
    1: ['r', 'g', 'b', 'y', 'lock'],
    2: ['b', 'k', 'w', 'g'],
    etc...
} // Stores all player guesses for each round after player clicks "end turn" button.  New array is created every turn.  Position of each array element (placed player peg) is fixed relative to selections made.  

const responseHistory = {     
    1: ['r', 'w', 'r', 'c'],
    2: ['w', 'c', 'c', 'c'],
    etc...
} // Stores all computer responses for each round once player clicks "end turn" button and before the next turn begins.  New array is created every turn.  Position of placed pegs is random.  Computer can select either clear, red, or white

----- app's state (variables) ------------------------------------------

let turn = //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

let currentGuess = // An array that is created each turn to record each individual peg placement'

let win = // 0 or 1 - triggers win status

----- cached element references (DOM) ----------------------------------

Game board
End turn button
Reset button

----- event listeners --------------------------------------------------

document.querySelector('div')
    .addEventListener('click', handleBoardPeg) 

document.querySelector('div')
    .addEventListener('click', handlePegColor) 

document.querySelector('button')
    .addEventListener('click', handleButton) // Returns a button press function relative to the id of the button pressed

document.querySelector('button')
    .addEventListener('click', handleReset) // 

/*----- functions -----*/

handleBoardPeg (function) {
    prohibit clicking anywhere that isn't an active player peg area
    Opens submenu for player to pick peg color for placement in selected grid area.  
}

handlePegColor (function) {
    prohibit clicking anywhere that isn't an active submenu
    allows player to select which peg color to place in selected grid area.  Players can select any color except clear
}

handleButton (function) {
    prohibit clicking anywhere that isn't either button

    if END TURN button
    activates the next player row dependent on turn
    deactivates prior row by pushing 'lock' to the end of the prior row array

    if RESET button
    Calls initialize function
}

(Reset) Initialize function that clears the board, clears a win or lose status if one exists, and creates new key in player and computer const objects

(End Turn) Render function that creates new key in player and computer const objects every turn

(computer) Function that checks PRESENCE of proper color pegs at the end of each turn

(computer) Function that checks LOCATION of proper color pegs at the end of each turn

Function the checks the number of objects playerGuessHistory < 10, and gives game over message if = 10

Function that declares winner and calls winner message if computer returns four red pegs 

Function that randomizes placement of computer pegs



POSSIBLE FUNCTIONALITY IF TIME ALLOWS - set a difficulty level allowing the computer to place no peg (clear) in the code, and therefore allow the player to select clear as a peg color


   // const guesses = []
    // const computerPositions = [...computerCode] // temporary array where matched values can be nullified without modifying the original array
    // // const resultObj = {
    // //     index: 0,
    // //     isPartial: true,
    // //     isExact: false,
    // //     color: '4',
    // //     points: 1,
    // // }

    // pColorIndexes.forEach(function (colorInt, idx) {
    //     // Create the result object
    //     const resultObj = {}
    //     resultObj.color = playPegColors[colorInt]
    //     resultObj.isExact = computerPositions[idx] === colorInt
    //     resultObj.isPartial = computerPositions[idx] !== colorInt && computerPositions.includes(colorInt)
    //     // Update the computerPositions array removing instances of exact or partial matches
    //     if (resultObj.isExact) {
    //         computerPositions[idx] = null

    //     }
    //     // NEED TO SEPARATE isExact from isPartial.  I'm guessing a nested function or two separate.  
    //     if (resultObj.isPartial) {
    //         const compPartialIdx = computerPositions.findIndex(function (compInt) {
    //             return compInt === colorInt
    //         })
    //         computerPositions[compPartialIdx] = null
    //     }
    //     guesses.push(resultObj)
    //     console.log(computerPositions)
    // })
    // console.log(guesses)

    // call upon renderReport function