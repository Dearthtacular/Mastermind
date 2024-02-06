/*----- constants -----*/

const playPegColors = ['white', 'red', 'blue', 'green', 'yellow', 'black']
const ePegColors = ['', 'white', 'black']

/*----- app's state (variables) -----*/

let pColorIndexes = [0, 0, 0, 0] // counter / interface for player color selection / player interface step 1

let currentGuessRow = [] // An array that is created each turn to record each individual peg placement'

let playerGuessHistory = {} // an object that holds arrays of player guesses submitted for evaluation

let computerCode = [] // where the computer creates the code to be guessed upon initialization

let computerReport = [] // where the computer stores it's report each turn

let responseHistory = {} // an object that holds arrays of the history of guess evaluation

let turn = 0 //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

let win = '' // null on initialize 0 or 1 - triggers win status



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
    const computerPositions = [...computerCode] // temporary array where matched values can be nullified without modifying the original array
    // const resultObj = {
    //     index: 0,
    //     isPartial: true,
    //     isExact: false,
    //     color: '4',
    //     points: 1,
    // }
    pColorIndexes.forEach(function (colorInt, idx) {
        // Create the result object
        const resultObj = {}
        resultObj.color = playPegColors[colorInt]
        resultObj.isExact = computerPositions[idx] === colorInt
        resultObj.isPartial = computerPositions[idx] !== colorInt && computerPositions.includes(colorInt)
        // Update the computerPositions array removing instances of exact or partial matches
        if (resultObj.isExact) {
            computerPositions[idx] = null
        }
        // NEED TO SEPARATE isExact from isPartial.  I'm guessing a nested function or two separate.  
        if (resultObj.isPartial) {
            const compPartialIdx = computerPositions.findIndex(function (compInt) {
                return compInt === colorInt
            })
            computerPositions[compPartialIdx] = null
        }
        guesses.push(resultObj)
    })
    console.log(guesses)


    // call upon renderReport function

    createReport(guesses)
}
// create new function called renderReport to update the computer report.  Ensure it is not within this function
// pass 'guesses' into the new function
// guesses is an array of objects with all of the necessary information to render the computer report
// function will loop through guesses and look at properties of each object and update UI accordingly 

function createReport(guesses) {
    computerReport = []
    guesses.forEach(function (obj) {
        if (obj.isExact) {
            computerReport.push('black')
        }
        if (obj.isPartial) {
            computerReport.push('red')
        }        
    })
    if (computerReport.length < 4) {
        const transparentCount = 4 - computerReport.length
        for (let i = 0; i < transparentCount; i++) {
            computerReport.push('transparent');
        }
    }
    // const shuffledReport = computerReport.slice().sort(() => Math.random() - 0.5)
    console.log(computerReport)
    renderReport(computerReport)
}

function renderReport(computerReport) {
    const reportDots = document.querySelectorAll('.reports')
    const shuffledDots = Array.from(reportDots).slice().sort(() => Math.random() - 0.5)
    shuffledDots.forEach(function (quadrant, idx) {
        shuffledDots[idx].style.backgroundColor = computerReport[idx]
    })
    // console.log(reportDots)
    // console.log(shuffledDots)
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

function render() {
    renderComputerCode()
}

function renderComputerCode() {
    computerCode = computerCode.map(() => {
        return Math.floor(Math.random() * 6);
    })
    computerColumn1El.style.backgroundColor = playPegColors[computerCode[0]];
    computerColumn2El.style.backgroundColor = playPegColors[computerCode[1]];
    computerColumn3El.style.backgroundColor = playPegColors[computerCode[2]];
    computerColumn4El.style.backgroundColor = playPegColors[computerCode[3]];
}



// let pColorIndexes = [0, 0, 0, 0]
// pColorIndexes.forEach(function(colorInt, idx) {
// playerColumns.forEach(function (col, idx) {
//     col.addEventListener('click', (event) => selectColor(event, idx))
// })


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

// if 1(true) = 1 >= (6-1)(false) -> set index to 0 else 1 + 1