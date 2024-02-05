/*----- constants -----*/

const playPegColors = ['red', 'white', 'blue', 'green', 'yellow', 'black']
const ePegColors = ['', 'red', 'white']

/*----- app's state (variables) -----*/

let playerGuessHistory = {} // an object that holds arrays of player guesses submitted for evaluation

let responseHistory = {} // an object that holds arrays of the history of guess evaluation

let currentGuessRow = [] // An array that is created each turn to record each individual peg placement'

let computerCode = [] // where the computer creates the code to be guessed upon initialization

let turn = 0 //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

let win = '' // null on initialize 0 or 1 - triggers win status

let pColorIndexes = [0, 0, 0, 0] // counter / interface for player color selection

/*----- cached element references -----*/
let computerColumn1El = document.querySelector('#computerColumn1');
let computerColumn2El = document.querySelector('#computerColumn2');
let computerColumn3El = document.querySelector('#computerColumn3');
let computerColumn4El = document.querySelector('#computerColumn4');
let playerColumnr1c1El = document.querySelector('#playerColumnr1c1');
let playerColumnr1c2El = document.querySelector('#playerColumnr1c2');
let playerColumnr1c3El = document.querySelector('#playerColumnr1c3');
let playerColumnr1c4El = document.querySelector('#playerColumnr1c4');

/*----- event listeners -----*/
document.querySelector('#playerColumnr1c1').addEventListener('click', colorPick1)
document.querySelector('#playerColumnr1c2').addEventListener('click', colorPick2)
document.querySelector('#playerColumnr1c3').addEventListener('click', colorPick3)
document.querySelector('#playerColumnr1c4').addEventListener('click', colorPick4)
document.querySelector('#end').addEventListener('click', endTurn)
document.querySelector('#reset').addEventListener('click', reset)

/*----- functions -----*/

function reset(event) {
    if (!event.target.id.includes('reset')) return
    initialize()
    playerGuessHistory = {}
}

function endTurn(event) {
    if (!event.target.id.includes('end')) return
    currentGuessRow.forEach((el, idx) => {
        currentGuessRow[idx] = pColorIndexes[idx]
    })
    // evaluation time

    // console.log(currentGuessRow)
    // console.log(computerCode)

    let eval = []
    for (let i = 0; i < currentGuessRow.length; i++) {
        if (currentGuessRow[i] === computerCode[i]) {
            eval.push(1)
        } else if
            (currentGuessRow.includes(computerCode[i]) && currentGuessRow.indexOf(computerCode[i]) !== i) {
            eval.push(0)
        }
    }
    console.log(eval)
    turn = turn += 1;
    playerGuessHistory[turn] = currentGuessRow
    // console.log(playerGuessHistory)


}

initialize()

function initialize() {
    currentGuessRow = [null, null, null, null]
    computerCode = [null, null, null, null]
    turn = 0
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
        return Math.floor(Math.random() * 5) + 1;
    })
    console.log(computerCode)
    computerColumn1El.style.backgroundColor = playPegColors[computerCode[0]];
    computerColumn2El.style.backgroundColor = playPegColors[computerCode[1]];
    computerColumn3El.style.backgroundColor = playPegColors[computerCode[2]];
    computerColumn4El.style.backgroundColor = playPegColors[computerCode[3]];
}

function colorPick1(event) {
    if (!event.target.classList.contains('playerColumn')) return
    pColorIndexes[0] = (pColorIndexes[0] + 1) % playPegColors.length;
    playerColumnr1c1El.style.backgroundColor = playPegColors[pColorIndexes[0]];
}

function colorPick2(event) {
    if (!event.target.classList.contains('playerColumn')) return
    pColorIndexes[1] = (pColorIndexes[1] + 1) % playPegColors.length;
    playerColumnr1c2El.style.backgroundColor = playPegColors[pColorIndexes[1]];
}

function colorPick3(event) {
    if (!event.target.classList.contains('playerColumn')) return
    pColorIndexes[2] = (pColorIndexes[2] + 1) % playPegColors.length;
    playerColumnr1c3El.style.backgroundColor = playPegColors[pColorIndexes[2]];
}

function colorPick4(event) {
    if (!event.target.classList.contains('playerColumn')) return
    pColorIndexes[3] = (pColorIndexes[3] + 1) % playPegColors.length;
    playerColumnr1c4El.style.backgroundColor = playPegColors[pColorIndexes[3]];
}