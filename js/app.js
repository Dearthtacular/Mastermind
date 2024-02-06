/*----- constants -----*/

const playPegColors = ['white', 'red', 'blue', 'green', 'yellow', 'black']
const ePegColors = ['', 'black', 'white']

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

/*----- event listeners -----*/

const playerColumns = document.querySelectorAll('.guess')
playerColumns.forEach(function (col, idx) {
    // Looping through a collection of divs, this gives us access to the index of each div
    // Adding an event listener to each div.  When the div is clicked on call upon selectColor,
    // and pass in the click event object and the index
    col.addEventListener('click', (event) => selectColor(event, idx))
})
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

    const guesses = []
    const computerPositions = [...computerCode]
    // const resultObj = {
    //     index: 0,
    //     isPartial: true,
    //     isExact: false,
    //     color: '4',
    //     points: 1,
    // }
    pColorIndexes.forEach(function(colorInt, idx) {
        // Create the result object
        const resultObj = {}
        resultObj.color = playPegColors[colorInt]
        resultObj.isExact = computerPositions[idx] === colorInt
        resultObj.isPartial = computerPositions[idx] !== colorInt && computerPositions.includes(colorInt)
        // Update the computerPositions array removing instances of exact or partial matches
        if (resultObj.isExact) {
            computerPositions[idx] = null
        }
        if (resultObj.isPartial) {
            const compPartialIdx = computerPositions.findIndex(function(compInt){
                return compInt === colorInt
            })
            computerPositions[compPartialIdx] = null
        }
        guesses.push(resultObj)
    })
    console.log(guesses)
    // call upon renderComputerReport function
}
    // create new function called render score (or something) to update the computer report.  Ensure it is not within this function
    // pass 'guesses' into the new function
    // guesses is an array of objects with all of the necessary information to render the computer report
    // function will loop through guesses and look at properties of each object and update UI accordingly 


    // record two divs at the same position are exact matches

    // currentGuessRow.forEach((el, idx) => {
    //     currentGuessRow[idx] = pColorIndexes[idx]
    // })

    // let eval = new Set()
    // let whitePeg = 0
    // let blackPeg = 0
    // for (let i = 0; i < currentGuessRow.length; i++) {
    //     if (currentGuessRow[i] === computerCode[i]) {
    //         blackPeg++
    //         eval.add(currentGuessRow[i])
    //     }
    // }
    // for (let i = 0; i < currentGuessRow.length; i++) {
    //     if (currentGuessRow[i] !== computerCode[i] && computerCode.includes(currentGuessRow[i]) && !eval.has(currentGuessRow[i])) {
    //         whitePeg++
    //         eval.add(currentGuessRow[i]);
    //     }
    // }
    // console.log('whitePeg ', whitePeg)
    // console.log('blackPeg ', blackPeg)
    // console.log(eval)
    // turn = turn += 1;
    // playerGuessHistory[turn] = currentGuessRow


initialize()

function initialize() {
    currentGuessRow = [null, null, null, null]
    computerCode = [null, null, null, null]
    turn = 0
    win = 0
    render()
    //clear win or loss message
}

function render() {
    renderComputer()
}

function renderComputer() {
    computerCode = computerCode.map(() => {
        return Math.floor(Math.random() * 6);
    })
    computerColumn1El.style.backgroundColor = playPegColors[computerCode[0]];
    computerColumn2El.style.backgroundColor = playPegColors[computerCode[1]];
    computerColumn3El.style.backgroundColor = playPegColors[computerCode[2]];
    computerColumn4El.style.backgroundColor = playPegColors[computerCode[3]];
}

function selectColor(event, idx) {
    pColorIndexes[idx] = pColorIndexes[idx] >= playPegColors.length - 1
        ? 0
        : pColorIndexes[idx] + 1
    const selectedColorIndex = pColorIndexes[idx]
    const selectedColorString = playPegColors[selectedColorIndex]
    renderSelection(idx, selectedColorString)
}

function renderSelection(idx, selectedColorString) {
    playerColumns[idx].style.backgroundColor = selectedColorString
}

// function colorPick1(event) {
//     if (!event.target.classList.contains('playerColumn')) return
//     pColorIndexes[0] = (pColorIndexes[0] + 1) % playPegColors.length;
//     playerColumnr1c1El.style.backgroundColor = playPegColors[pColorIndexes[0]];
// }

// function colorPick2(event) {
//     if (!event.target.classList.contains('playerColumn')) return
//     pColorIndexes[1] = (pColorIndexes[1] + 1) % playPegColors.length;
//     playerColumnr1c2El.style.backgroundColor = playPegColors[pColorIndexes[1]];
// }

// function colorPick3(event) {
//     if (!event.target.classList.contains('playerColumn')) return
//     pColorIndexes[2] = (pColorIndexes[2] + 1) % playPegColors.length;
//     playerColumnr1c3El.style.backgroundColor = playPegColors[pColorIndexes[2]];
// }

// function colorPick4(event) {
//     if (!event.target.classList.contains('playerColumn')) return
//     pColorIndexes[3] = (pColorIndexes[3] + 1) % playPegColors.length;
//     playerColumnr1c4El.style.backgroundColor = playPegColors[pColorIndexes[3]];
// }

/*----- event listeners -----*/

// document.querySelector('#playerColumnr1c1').addEventListener('click', colorPick1)
// document.querySelector('#playerColumnr1c2').addEventListener('click', colorPick2)
// document.querySelector('#playerColumnr1c3').addEventListener('click', colorPick3)
// document.querySelector('#playerColumnr1c4').addEventListener('click', colorPick4)

// /*----- cached element references -----*/

// let playerColumnr1c1El = document.querySelector('#playerColumnr1c1');
// let playerColumnr1c2El = document.querySelector('#playerColumnr1c2');
// let playerColumnr1c3El = document.querySelector('#playerColumnr1c3');
// let playerColumnr1c4El = document.querySelector('#playerColumnr1c4');