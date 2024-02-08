/*----- constants -----*/

const playPegColors = ['lightpink', 'firebrick', 'deepskyblue', 'olivedrab', 'gold', 'dimgrey']

/*----- app's state (variables) -----*/

let pColorIndexes = [null, null, null, null]

let computerCode = [] 

let computerReport = [] 

let turn = 0

/*----- cached element references -----*/

const codeRow = document.querySelector('#codeRow')
const cloneRow = document.querySelector('#row0')
const h2TurnMarker = cloneRow.querySelector('h2');
const reportDots = document.querySelectorAll('.reports')
const computerColumns = document.querySelectorAll('.code')
const playerColumns = document.querySelectorAll('.guess')
const overlay = document.querySelector('#overlay');
const message = document.querySelector('#message')

/*----- event listeners -----*/

playerColumns.forEach(function (col, idx) {
    col.addEventListener('click', (event) => selectColor(event, idx))
})
document.querySelector('#end').addEventListener('click', endTurn)
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#overlay').addEventListener('click', reset)

/*----- functions -----*/

function reset() {
    pColorIndexes = [null, null, null, null]
    playerColumns.forEach(report => {
        report.removeAttribute('style');
    });
    reportDots.forEach(col => {
        col.removeAttribute('style');
    });
    turn = 1;
    h2TurnMarker.innerHTML = `Turn<br>${[turn]}`;
    codeRow.style.display = 'none'
    const clonedRows = document.querySelectorAll('.cloned')
    clonedRows.forEach(function (row) {
        row.remove()
    })
    hideMessage()
    initialize()
}

function endTurn(event) {
    if (!event.target.id.includes('end')) return
    // if (pColorIndexes.includes(null)) return

    const guesses = []

    const computerPositionsExact = [...computerCode]
    const playerPositionsExact = [...pColorIndexes]

    playerPositionsExact.forEach(function (colorInt, idx) {

        const resultObj = {}
        resultObj.color = playPegColors[colorInt]
        resultObj.isExact = computerPositionsExact[idx] === colorInt
        if (resultObj.isExact) {
            computerPositionsExact[idx] = null
            playerPositionsExact[idx] = null
        }
        guesses.push(resultObj)
    })

    const computerPositionsPartial = [...computerPositionsExact]
    const playerPositionsPartial = [...playerPositionsExact]

    playerPositionsPartial.forEach(function (colorInt, idx) {
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

    createReport(guesses)
    if (gameWin(guesses)) {
        return
    }
    if (gameOver()) {
        return
    }
    turn++
    renderNewRow()
}

function renderNewRow() {
    const clonedRow = cloneRow.cloneNode(true)
    clonedRow.id = `row${[turn]}`;
    clonedRow.classList.add('cloned');
    const squaresWithinClonedRow = cloneRow.querySelectorAll('div');
    squaresWithinClonedRow.forEach(div => {
        div.style = '';
    });
    cloneRow.insertAdjacentElement('afterend', clonedRow);
    h2TurnMarker.innerHTML = `Turn <br> ${[turn]}`;

}

function gameWin(guesses) {
    const countTrue = guesses.filter(obj => obj.isExact === true).length
    if (countTrue === 4) {
        showMessage('You Win!')
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
            computerReport.push('#2E8B57')
        }
        if (obj.isPartial) {
            computerReport.push('#A0522D')
        }
    })
    if (computerReport.length < 4) {
        const nullCount = 4 - computerReport.length
        for (let i = 0; i < nullCount; i++) {
            computerReport.push(null);
        }
    }
    const shuffledReport = computerReport.slice().sort(() => Math.random() - 0.5)
    renderReport(shuffledReport)
}

function renderReport(shuffledReport) {
    reportDots.forEach(function (quadrant, idx) {
        reportDots[idx].style.backgroundColor = shuffledReport[idx]
    })
}

initialize()

function initialize() {
    computerCode = [null, null, null, null]
    turn = 1
    render()
}

function render() {
    renderComputerColor()
}

function renderComputerColor(event, idx) {
    computerCode = computerCode.map(() => {
        return Math.floor(Math.random() * 6);
    })
    computerCode.forEach(function(col, idx) {
    const computerColorIndex = computerCode[idx]
    const computerColorString = playPegColors[computerColorIndex]
    renderComputerSelection(idx, computerColorString)
})
}

function renderComputerSelection(idx, computerColorString) {
    computerColumns[idx].style.backgroundColor = computerColorString
}

function selectColor(event, idx) {
    pColorIndexes[idx] = pColorIndexes[idx] >= playPegColors.length - 1
        ? 0
        : pColorIndexes[idx] + 1
    const selectedColorIndex = pColorIndexes[idx]
    const selectedColorString = playPegColors[selectedColorIndex]
    renderPlayerSelection(idx, selectedColorString)
}

function renderPlayerSelection(idx, selectedColorString) {
    playerColumns[idx].style.backgroundColor = selectedColorString
}

function showMessage(msg) {
    overlay.style.display = 'flex';
    message.innerHTML = `${msg}<br><br>(Click to play again)`;
};

function hideMessage() {
    overlay.style.display = 'none';
}
