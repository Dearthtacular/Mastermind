/*----- constants -----*/

const pegColors = ['clear', 'red', 'white', 'blue', 'green', 'yellow', 'black'] 

const playerGuessHistory = {}

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

/*----- app's state (variables) -----*/

let currentGuessRow = [] // An array that is created each turn to record each individual peg placement'

let computerCode = [] // where the computer creates the code to be guessed upon initialization

let turn = 1 //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

let win = '' // null on initialize 0 or 1 - triggers win status

let colorIndexes = [1, 1, 1, 1] // counter / interface for player color selection

/*----- cached element references -----*/
let computerColumn1El = document.querySelector('#computerColumn1');
let computerColumn2El = document.querySelector('#computerColumn2');
let computerColumn3El = document.querySelector('#computerColumn3');
let computerColumn4El = document.querySelector('#computerColumn4');
let playerColumnr1c1El = document.querySelector('#playerColumnr1c1');
let playerColumnr1c2El = document.querySelector('#playerColumnr1c2');
let playerColumnr1c3El = document.querySelector('#playerColumnr1c3');
let playerColumnr1c4El = document.querySelector('#playerColumnr1c4');
let endTurnButtonEl = document.querySelector('#end');

/*----- event listeners -----*/
document.querySelector('#playerColumnr1c1').addEventListener('click', colorPick1)
document.querySelector('#playerColumnr1c2').addEventListener('click', colorPick2)
document.querySelector('#playerColumnr1c3').addEventListener('click', colorPick3)
document.querySelector('#playerColumnr1c4').addEventListener('click', colorPick4)
document.querySelector('#end').addEventListener('click', endTurn)


/*----- functions -----*/

function endTurn(event) {
    if (!event.target.id.includes('end')) return
    currentGuessRow.forEach((el, idx) => {
        currentGuessRow[idx] = window["colorIndex" + (idx + 1)]
    })
        // currentGuessRow.push(colorIndex1)
        // currentGuessRow.push(colorIndex2)
        // currentGuessRow.push(colorIndex3)
        // currentGuessRow.push(colorIndex4)
        console.log(currentGuessRow)
}


initialize()

function initialize() {
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

function colorPick1(event) {
    if (!event.target.classList.contains('playerColumn')) return
        colorIndexes[0] = (colorIndexes[0] % pegColors.length) + 1;
    playerColumnr1c1El.style.backgroundColor = pegColors[colorIndexes[0] - 1];
    console.log(colorIndexes)
}

function colorPick2(event) {
    if (!event.target.classList.contains('playerColumn')) return
        colorIndexes[1] = (colorIndexes[1] % pegColors.length) + 1;
    playerColumnr1c2El.style.backgroundColor = pegColors[colorIndexes[1] - 1];
    console.log(colorIndexes)
}

function colorPick3(event) {
    if (!event.target.classList.contains('playerColumn')) return
        colorIndexes[2] = (colorIndexes[2] % pegColors.length) + 1;
    playerColumnr1c3El.style.backgroundColor = pegColors[colorIndexes[2] - 1];
    console.log(colorIndexes)
}

function colorPick4(event) {
    if (!event.target.classList.contains('playerColumn')) return
        colorIndexes[3] = (colorIndexes[3] % pegColors.length) + 1;
    playerColumnr1c4El.style.backgroundColor = pegColors[colorIndexes[3] - 1];
    console.log(colorIndexes)
}