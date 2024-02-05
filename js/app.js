/*----- constants -----*/

const pegColors = ['clear', 'red', 'white', 'blue', 'green', 'yellow', 'black'] 

const boardRow = {}

// const playerGuessHistory = {
//     1: ['r', 'g', 'b', 'y', 'lock'],
//     2: ['b', 'k', 'w', 'g'],
//     etc...
// }

const responseHistory = {}

// const responseHistory = {     
//     1: ['r', 'w', 'r', 'c'],
//     2: ['w', 'c', 'c', 'c'],
//     etc...
// }

let currentGuessRow = [] // An array that is created each turn to record each individual peg placement'

let computerCode = [] // where the computer creates the code to be guessed upon initialization


/*----- app's state (variables) -----*/

let turn = 1 //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

let win = '' // null on initialize 0 or 1 - triggers win status

/*----- cached element references -----*/
let computerColumn1El = document.querySelector('#computerColumn1');
let computerColumn2El = document.querySelector('#computerColumn2');
let computerColumn3El = document.querySelector('#computerColumn3');
let computerColumn4El = document.querySelector('#computerColumn4');
let playerColumnr1c1El = document.querySelector('#playerColumnr1c1');

/*----- event listeners -----*/
document.querySelector('#playerColumnr1c1').addEventListener('click', handlePick)


/*----- functions -----*/

initialize()

function initialize() {
    boardRow[turn] = // currentGuessRow
    currentGuessRow = [null, null, null, null]
    computerCode = [null, null, null, null] 
    win = 0
    render()
    //clear win or loss message
}
//console.log(playerGuessHistory)
function render() {
    renderBoard()
}

function renderBoard() {
    computerCode = computerCode.map(() => {
        return Math.floor(Math.random() * 6) + 1;
    })
    console.log(computerCode)
    computerColumn1El.style.backgroundColor = pegColors[computerCode[0]];
    computerColumn2El.style.backgroundColor = pegColors[computerCode[1]];
    computerColumn3El.style.backgroundColor = pegColors[computerCode[2]];
    computerColumn4El.style.backgroundColor = pegColors[computerCode[3]];
}



// console.log(boardRow)

// 