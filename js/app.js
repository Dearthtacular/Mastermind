/*----- constants -----*/

const playPegColors = ['white', 'red', 'blue', 'green', 'yellow', 'black']
const ePegColors = ['', 'white', 'black']

/*----- app's state (variables) -----*/

let pColorIndexes = [null, null, null, null] // counter / interface for player color selection / player interface step 1

let currentGuessRow = [] // An array that is created each turn to record each individual peg placement'

let playerGuessHistory = {} // an object that holds arrays of player guesses submitted for evaluation

let computerCode = [] // where the computer creates the code to be guessed upon initialization

let computerReport = [] // where the computer stores it's report each turn

let responseHistory = {} // an object that holds arrays of the history of guess evaluation

let turn = 0 //Will determine current player row / prohibits changing guesses from prior turns / will end game if > 10

console.log(pColorIndexes)

/*----- cached element references -----*/
let computerColumn1El = document.querySelector('#computerColumn1');
let computerColumn2El = document.querySelector('#computerColumn2');
let computerColumn3El = document.querySelector('#computerColumn3');
let computerColumn4El = document.querySelector('#computerColumn4');

const codeRow = document.querySelector('#codeRow')

const overlay = document.querySelector('#overlay');
const message = document.querySelector('#message')

const cloneRow = document.querySelector('#row0')
const h2TurnMarker = cloneRow.querySelector('h2');
const styledReports = document.querySelectorAll('.reports');
const styledRow1 = document.querySelectorAll('.guess');

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
document.querySelector('#overlay').addEventListener('click', reset)
/*----- functions -----*/

function reset() {
    pColorIndexes = [null, null, null, null]
    styledReports.forEach(report => {
        report.removeAttribute('style');
    });
    styledRow1.forEach(col => {
        col.removeAttribute('style');
    });
    turn = 1;
    h2TurnMarker.textContent = `Turn ${[turn]}`;
    codeRow.style.display = 'none'
    hideMessage()
    const clonedRows = document.querySelectorAll('.cloned')
    clonedRows.forEach(function (row) {
        row.remove()
    })
    initialize()
    playerGuessHistory = {}
}

function endTurn(event) {
    if (!event.target.id.includes('end')) return

    const guesses = []

    const computerPositionsExact = [...computerCode]

    pColorIndexes.forEach(function (colorInt, idx) {

        const resultObj = {}
        resultObj.color = playPegColors[colorInt]
        resultObj.isExact = computerPositionsExact[idx] === colorInt
        if (resultObj.isExact) {
            computerPositionsExact[idx] = null;

        }
        guesses.push(resultObj)
        // console.log(computerPositionsExact)
    })

    const computerPositionsPartial = [...computerPositionsExact]

    pColorIndexes.forEach(function (colorInt, idx) {
        const resultObj = {}
        resultObj.color = playPegColors[colorInt]
        resultObj.isPartial = computerPositionsPartial[idx] !== colorInt && computerPositionsPartial.includes(colorInt)
        if (resultObj.isPartial) {
            const compPartialIdx = computerPositionsPartial.findIndex(function (compInt) {
                return compInt === colorInt
            })
            computerPositionsPartial[compPartialIdx] = null
        }
        guesses.push(resultObj)
    })

    pColorIndexes = [null, null, null, null]



    console.log(guesses)

    createReport(guesses)
    if (gameWin(guesses)) {
        return
    }
    if (gameOver()) {
        return
    }
    populatePlayerHistory()

    turn++
    renderNewRow()
}

function clearGuesses() {

}

function renderNewRow() {
    const clonedRow = cloneRow.cloneNode(true)
    clonedRow.id = `row${[turn]}`;
    clonedRow.classList.add('cloned');
    const squaresWithinClonedRow = cloneRow.querySelectorAll('div');
    squaresWithinClonedRow.forEach(div => {
        div.style = '';
    });
    // const dotsWithin
    cloneRow.insertAdjacentElement('afterend', clonedRow);
    // const h2TurnMarker = cloneRow.querySelector('h2');
    h2TurnMarker.textContent = `Turn ${[turn]}`;
}

function populatePlayerHistory() {
    playerGuessHistory[turn] = pColorIndexes
    console.log(playerGuessHistory)
}

function gameWin(guesses) {
    const countTrue = guesses.filter(obj => obj.isExact === true).length
    if (countTrue === 4) {
        showMessage('You Win!') // And gray out screen with WIN message and next click re-initializes
        codeRow.style.display = 'flex'
        return true;
    }
    gameOver(countTrue)
}

function gameOver(countTrue) {
    if (turn >= 10) {
        showMessage('Out of turns.  Game Over.')
        codeRow.style.display = 'flex'
        return true;
    }
}

function createReport(guesses) {
    computerReport = []
    guesses.forEach(function (obj) {
        if (obj.isExact) {
            computerReport.push('black')
        }
        if (obj.isPartial) {
            computerReport.push('white')
        }
    })
    if (computerReport.length < 4) {
        const transparentCount = 4 - computerReport.length
        for (let i = 0; i < transparentCount; i++) {
            computerReport.push('transparent');
        }
    }
    const shuffledReport = computerReport.slice().sort(() => Math.random() - 0.5)
    renderReport(shuffledReport)
}

function renderReport(shuffledReport) {
    const reportDots = document.querySelectorAll('.reports')
    reportDots.forEach(function (quadrant, idx) {
        reportDots[idx].style.backgroundColor = shuffledReport[idx]
    })
}

initialize()

function initialize() {
    currentGuessRow = [null, null, null, null]
    computerCode = [null, null, null, null]
    turn = 1
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

function showMessage(msg) {
    overlay.style.display = 'flex';
    message.innerHTML = `${msg}<br><br>(Click to try again)`;
};

function hideMessage() {
    overlay.style.display = 'none';
}
