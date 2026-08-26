// ==========================================
// 👑 LUDO CROWN
// COMPLETE GAME JAVASCRIPT
// ==========================================


// ==========================================
// HTML ELEMENTS
// ==========================================

const board = document.getElementById("board");
const dice = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const message = document.getElementById("message");


// ==========================================
// PLAYERS
// ==========================================

const players = [
    "RED",
    "GREEN",
    "YELLOW",
    "BLUE"
];

let currentPlayer = 0;


// ==========================================
// GAME VARIABLES
// ==========================================

let selectedToken = null;

let waitingForTokenSelection = false;

let lastRoll = 0;

let gameOver = false;

// Number of consecutive sixes
let consecutiveSixes = 0;


// ==========================================
// DICE
// ==========================================

const diceFaces = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
];


// ==========================================
// 52 OUTER PATH POSITIONS
// ==========================================

const path = [

    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],

    [5, 6],
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6],
    [0, 6],

    [0, 7],

    [0, 8],

    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],

    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [6, 14],

    [7, 14],

    [8, 14],

    [8, 13],
    [8, 12],
    [8, 11],
    [8, 10],
    [8, 9],

    [9, 8],
    [10, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [14, 8],

    [14, 7],

    [14, 6],

    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [9, 6],

    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],

    [7, 0],

    [6, 0]
];


// ==========================================
// STARTING POSITIONS
// ==========================================

const startPosition = {

    RED: 0,
    GREEN: 13,
    YELLOW: 26,
    BLUE: 39

};


// ==========================================
// 🛡️ SAFE SQUARES
// ==========================================

const safeSquares = [
    0,
    8,
    13,
    21,
    26,
    34,
    39,
    47
];


// ==========================================
// 🏠 HOME PATHS
// ==========================================

const homePaths = {

    RED: [
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 5]
    ],

    GREEN: [
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7]
    ],

    YELLOW: [
        [7, 13],
        [7, 12],
        [7, 11],
        [7, 10],
        [7, 9]
    ],

    BLUE: [
        [13, 7],
        [12, 7],
        [11, 7],
        [10, 7],
        [9, 7]
    ]

};


// ==========================================
// TOKEN DATA
// -1 = HOME
// 0-51 = OUTER TRACK
// 52-56 = HOME PATH
// 57 = CROWN
// ==========================================

const tokenData = {

    RED: [
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false }
    ],

    GREEN: [
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false }
    ],

    YELLOW: [
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false }
    ],

    BLUE: [
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false },
        { position: -1, inHomePath: false }
    ]

};


// ==========================================
// 🏠 TOKEN HOME POSITIONS
// ==========================================

const homePositions = {

    RED: [
        [1, 1],
        [1, 4],
        [4, 1],
        [4, 4]
    ],

    GREEN: [
        [1, 10],
        [1, 13],
        [4, 10],
        [4, 13]
    ],

    YELLOW: [
        [10, 10],
        [10, 13],
        [13, 10],
        [13, 13]
    ],

    BLUE: [
        [10, 1],
        [10, 4],
        [13, 1],
        [13, 4]
    ]

};


// ==========================================
// CREATE BOARD
// ==========================================

function createBoard() {

    board.innerHTML = "";

    for (let row = 0; row < 15; row++) {

        for (let col = 0; col < 15; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");


            // RED HOME

            if (
                row <= 5 &&
                col <= 5
            ) {

                cell.classList.add("red-home");

            }


            // GREEN HOME

            else if (
                row <= 5 &&
                col >= 9
            ) {

                cell.classList.add("green-home");

            }


            // BLUE HOME

            else if (
                row >= 9 &&
                col <= 5
            ) {

                cell.classList.add("blue-home");

            }


            // YELLOW HOME

            else if (
                row >= 9 &&
                col >= 9
            ) {

                cell.classList.add("yellow-home");

            }


            // CENTER

            else if (
                row >= 6 &&
                row <= 8 &&
                col >= 6 &&
                col <= 8
            ) {

                cell.classList.add("center");

                if (
                    row === 7 &&
                    col === 7
                ) {

                    cell.textContent = "👑";

                }

            }


            // RED HOME PATH

            else if (
                row === 7 &&
                col >= 1 &&
                col <= 5
            ) {

                cell.classList.add("red-path");

            }


            // GREEN HOME PATH

            else if (
                col === 7 &&
                row >= 1 &&
                row <= 5
            ) {

                cell.classList.add("green-path");

            }


            // YELLOW HOME PATH

            else if (
                row === 7 &&
                col >= 9 &&
                col <= 13
            ) {

                cell.classList.add("yellow-path");

            }


            // BLUE HOME PATH

            else if (
                col === 7 &&
                row >= 9 &&
                row <= 13
            ) {

                cell.classList.add("blue-path");

            }


            // NORMAL PATH

            else {

                cell.classList.add("path");

            }


            board.appendChild(cell);

        }

    }

}


// ==========================================
// GET CELLS
// ==========================================

function getCells() {

    return document.querySelectorAll(".cell");

}


// ==========================================
// SHOW PATH
// ==========================================

function showPath() {

    const cells = getCells();

    path.forEach(function(position, index) {

        const row = position[0];
        const col = position[1];

        const cellIndex =
            row * 15 + col;

        cells[cellIndex].classList.add(
            "ludo-path"
        );


        if (
            safeSquares.includes(index)
        ) {

            cells[cellIndex].classList.add(
                "safe-square"
            );

        }

    });

}


// ==========================================
// CREATE TOKEN
// ==========================================

function createToken(color, number) {

    const token =
        document.createElement("div");

    token.classList.add("token");

    token.classList.add(
        color.toLowerCase() + "-token"
    );

    token.dataset.color = color;

    token.dataset.number = number;

    token.style.cursor = "pointer";

    return token;

}


// ==========================================
// PLACE TOKENS IN HOME
// ==========================================

function placeTokensInHome() {

    const cells = getCells();

    players.forEach(function(color) {

        homePositions[color].forEach(
            function(position, index) {

                const row = position[0];
                const col = position[1];

                const cellIndex =
                    row * 15 + col;

                const token =
                    createToken(
                        color,
                        index
                    );

                cells[cellIndex].appendChild(
                    token
                );

            }
        );

    });

    enableTokenSelection();

}


// ==========================================
// 🔍 CHECK IF TOKEN CAN MOVE
// ==========================================

function canTokenMove(color, number, steps) {

    const token =
        tokenData[color][number];


    // FINISHED TOKEN

    if (
        token.position === 57
    ) {

        return false;

    }


    // TOKEN AT HOME

    if (
        token.position === -1
    ) {

        return steps === 6;

    }


    // TOKEN IN HOME PATH

    if (
        token.position >= 52 &&
        token.position < 57
    ) {

        const finalPosition =
            token.position + steps;

        return finalPosition <= 57;

    }


    // TOKEN ON OUTER TRACK

    if (
        token.position >= 0 &&
        token.position < 52
    ) {

        const finalPosition =
            token.position + steps;

        return finalPosition <= 57;

    }


    return false;

}


// ==========================================
// ✨ REMOVE MOVABLE GLOW
// ==========================================

function clearMovableTokens() {

    document
        .querySelectorAll(".movable-token")
        .forEach(function(token) {

            token.classList.remove(
                "movable-token"
            );

        });

}


// ==========================================
// ✨ HIGHLIGHT MOVABLE TOKENS
// ==========================================

function highlightMovableTokens(
    color,
    steps
) {

    clearMovableTokens();

    tokenData[color].forEach(
        function(tokenDataItem, number) {

            if (
                canTokenMove(
                    color,
                    number,
                    steps
                )
            ) {

                const tokenElement =
                    document.querySelector(
                        `.token[data-color="${color}"][data-number="${number}"]`
                    );

                if (tokenElement) {

                    tokenElement.classList.add(
                        "movable-token"
                    );

                }

            }

        }
    );

}


// ==========================================
// 🎯 TOKEN SELECTION
// ==========================================

function enableTokenSelection() {

    const allTokens =
        document.querySelectorAll(".token");


    allTokens.forEach(function(token) {

        token.onclick =
            async function(event) {

                event.stopPropagation();


                // GAME OVER

                if (gameOver) {

                    return;

                }


                const color =
                    token.dataset.color;

                const number =
                    Number(
                        token.dataset.number
                    );


                // WRONG PLAYER

                if (
                    color !==
                    players[currentPlayer]
                ) {

                    message.textContent =
                        "It is " +
                        players[currentPlayer] +
                        "'s turn.";

                    return;

                }


                // MUST ROLL FIRST

                if (
                    !waitingForTokenSelection
                ) {

                    message.textContent =
                        "🎲 Roll the dice first.";

                    return;

                }


                const steps =
                    lastRoll;


                // TOKEN FINISHED

                if (
                    tokenData[color][number]
                        .position === 57
                ) {

                    message.textContent =
                        "🏆 Token " +
                        (number + 1) +
                        " has already reached the Crown.";

                    return;

                }


                // CHECK THIS TOKEN

                if (
                    !canTokenMove(
                        color,
                        number,
                        steps
                    )
                ) {

                    message.textContent =
                        color +
                        " Token " +
                        (number + 1) +
                        " cannot move " +
                        steps +
                        " spaces.";

                    return;

                }


                // ======================================
                // SELECT TOKEN
                // ======================================

                clearMovableTokens();


                allTokens.forEach(
                    function(item) {

                        item.classList.remove(
                            "selected-token"
                        );

                    }
                );


                selectedToken =
                    number;


                token.classList.add(
                    "selected-token"
                );


                waitingForTokenSelection =
                    false;


                rollButton.disabled =
                    true;


                message.textContent =
                    color +
                    " Token " +
                    (number + 1) +
                    " moving " +
                    steps +
                    " spaces...";


                // ======================================
                // MOVE TOKEN
                // ======================================

                const moved =
                    await moveToken(
                        color,
                        number,
                        steps
                    );


                // ======================================
                // MOVEMENT FAILED
                // ======================================

                if (!moved) {

                    selectedToken =
                        null;

                    token.classList.remove(
                        "selected-token"
                    );

                    waitingForTokenSelection =
                        true;

                    rollButton.disabled =
                        true;

                    highlightMovableTokens(
                        color,
                        steps
                    );

                    message.textContent =
                        color +
                        " cannot move this token. Choose another token.";

                    return;

                }


                // ======================================
                // MOVEMENT SUCCESSFUL
                // ======================================

                token.classList.remove(
                    "selected-token"
                );

                selectedToken =
                    null;

                clearMovableTokens();


                // ======================================
                // CHECK WINNER
                // ======================================

                if (gameOver) {

                    return;

                }


                // ======================================
                // CAPTURE CHECK
                // ======================================

                const captured =
                    checkCapture(
                        color,
                        number
                    );


                // ======================================
                // SIX
                // ======================================

                if (steps === 6) {

                    waitingForTokenSelection =
                        false;

                    message.textContent =
                        color +
                        " rolled 6! 🎲 Roll again.";

                    rollButton.disabled =
                        false;

                    return;

                }


                // ======================================
                // CAPTURE = EXTRA TURN
                // ======================================

                if (captured) {

                    waitingForTokenSelection =
                        false;

                    message.textContent =
                        "⚔️ " +
                        color +
                        " captured a token! Roll again.";

                    rollButton.disabled =
                        false;

                    return;

                }


                // ======================================
                // NORMAL TURN
                // ======================================

                waitingForTokenSelection =
                    false;

                nextPlayer();

                rollButton.disabled =
                    false;

            };

    });

}


// ==========================================
// 🚶 MOVE TOKEN
// ==========================================

async function moveToken(
    color,
    number,
    steps
) {

    const cells =
        getCells();

    const token =
        tokenData[color][number];

    const tokenElement =
        document.querySelector(
            `.token[data-color="${color}"][data-number="${number}"]`
        );


    if (!tokenElement) {

        message.textContent =
            "Token not found!";

        return false;

    }


    // ======================================
    // FINISHED TOKEN
    // ======================================

    if (
        token.position === 57
    ) {

        return false;

    }


    // ======================================
    // EXACT CROWN CHECK
    // ======================================

    if (
        token.position >= 52 &&
        token.position < 57
    ) {

        const remainingSteps =
            57 - token.position;

        if (
            steps >
            remainingSteps
        ) {

            message.textContent =
                "You need an exact roll to reach the Crown.";

            return false;

        }

    }


    // ======================================
    // TOKEN AT HOME
    // ======================================

    if (
        token.position === -1
    ) {

        if (
            steps !== 6
        ) {

            return false;

        }


        token.position =
            0;

        token.inHomePath =
            false;


        const globalPosition =
            startPosition[color];


        const row =
            path[globalPosition][0];

        const col =
            path[globalPosition][1];


        const cellIndex =
            row * 15 + col;


        cells[cellIndex].appendChild(
            tokenElement
        );


        await wait(300);


        return true;

    }


    // ======================================
    // MOVE ONE STEP AT A TIME
    // ======================================

    for (
        let i = 0;
        i < steps;
        i++
    ) {


        // ==================================
        // EXACT CROWN CHECK
        // ==================================

        if (
            token.position >= 52
        ) {

            const remaining =
                57 - token.position;

            if (
                remaining <= 0
            ) {

                token.position =
                    57;

                break;

            }

            if (
                steps - i >
                remaining
            ) {

                message.textContent =
                    "You need an exact roll to reach the Crown.";

                return false;

            }

        }

        // ==================================
        // MOVE TOKEN POSITION
        // ==================================

        token.position++;

        // ==================================
        // ENTER HOME PATH
        // ==================================

        if (
            token.position >= 52
        ) {

            token.inHomePath =
                true;


            const homeIndex =
                token.position - 52;


            // ==================================
            // CROWN
            // ==================================

            if (
                homeIndex >=
                homePaths[color].length
            ) {

                token.position =
                    57;

                token.inHomePath =
                    true;


                const crownCellIndex =
                    7 * 15 + 7;


                cells[
                    crownCellIndex
                ].appendChild(
                    tokenElement
                );


                message.textContent =
                    "🏆 " +
                    color +
                    " Token " +
                    (number + 1) +
                    " reached the Crown! 👑";


                checkWinner(color);


                await wait(500);

                continue;

            }


            // ==================================
            // HOME PATH CELL
            // ==================================

            const homeCell =
                homePaths[color][
                    homeIndex
                ];


            const row =
                homeCell[0];

            const col =
                homeCell[1];


            const cellIndex =
                row * 15 + col;


            cells[cellIndex].appendChild(
                tokenElement
            );


            message.textContent =
                color +
                " Token " +
                (number + 1) +
                " entering home path → " +
                (homeIndex + 1) +
                "/" +
                homePaths[color].length;


            await wait(250);

            continue;

        }


        // ==================================
        // OUTER TRACK
        // ==================================

        const globalPosition =
            (
                startPosition[color] +
                token.position
            ) % 52;


        const row =
            path[globalPosition][0];

        const col =
            path[globalPosition][1];


        const cellIndex =
            row * 15 + col;


        cells[cellIndex].appendChild(
            tokenElement
        );


        message.textContent =
            color +
            " Token " +
            (number + 1) +
            " → " +
            (i + 1) +
            "/" +
            steps;


        await wait(250);

    }


    tokenElement.classList.remove(
        "selected-token"
    );


    validateGameState();


    return true;

}


// ==========================================
// ⚔️ CHECK CAPTURE
// ==========================================

function checkCapture(
    color,
    number
) {

    const token =
        tokenData[color][number];


    // HOME / CROWN / HOME PATH
    // cannot capture

    if (
        token.position < 0 ||
        token.position >= 52
    ) {

        return false;

    }


    const currentGlobalPosition =
        (
            startPosition[color] +
            token.position
        ) % 52;


    // ======================================
    // SAFE SQUARE
    // ======================================

    if (
        safeSquares.includes(
            currentGlobalPosition
        )
    ) {

        return false;

    }


    let captured =
        false;


    // ======================================
    // CHECK OPPONENTS
    // ======================================

    players.forEach(
        function(opponentColor) {

            if (
                opponentColor === color
            ) {

                return;

            }


            tokenData[
                opponentColor
            ].forEach(
                function(
                    opponentToken,
                    opponentNumber
                ) {


                    if (
                        opponentToken.position < 0 ||
                        opponentToken.position >= 52
                    ) {

                        return;

                    }


                    const opponentGlobalPosition =
                        (
                            startPosition[
                                opponentColor
                            ] +
                            opponentToken.position
                        ) % 52;


                    // ==================================
                    // SAME SQUARE
                    // ==================================

                    if (
                        currentGlobalPosition ===
                        opponentGlobalPosition
                    ) {

                        sendTokenHome(
                            opponentColor,
                            opponentNumber
                        );

                        captured =
                            true;

                    }

                }
            );

        }
    );


    return captured;

}


// ==========================================
// 🏠 SEND TOKEN HOME
// ==========================================

function sendTokenHome(
    color,
    number
) {

    const cells =
        getCells();


    const token =
        tokenData[color][number];


    const tokenElement =
        document.querySelector(
            `.token[data-color="${color}"][data-number="${number}"]`
        );


    if (!tokenElement) {

        return;

    }


    token.position =
        -1;

    token.inHomePath =
        false;


    const home =
        homePositions[color][number];


    const row =
        home[0];

    const col =
        home[1];


    const cellIndex =
        row * 15 + col;


    cells[cellIndex].appendChild(
        tokenElement
    );


    tokenElement.classList.remove(
        "selected-token"
    );

    tokenElement.classList.remove(
        "movable-token"
    );

}

// ==========================================
// 🏆 CHECK WINNER
// ==========================================

function checkWinner(color) {

    let finishedTokens =
        0;


    tokenData[color].forEach(
        function(token) {

            if (
                token.position === 57
            ) {

                finishedTokens++;

            }

        }
    );


    if (
        finishedTokens === 4
    ) {

        gameOver =
            true;


        waitingForTokenSelection =
            false;


        clearMovableTokens();


        message.textContent =
            "🏆👑 " +
            color +
            " WINS THE GAME! 👑🏆";


        rollButton.disabled =
            true;


        const victoryScreen =
            document.getElementById(
                "victoryScreen"
            );


        const winnerText =
            document.getElementById(
                "winnerText"
            );


        if (winnerText) {

            winnerText.textContent =
                "🏆 " +
                color +
                " WINS! 🏆";

        }


        if (victoryScreen) {

            victoryScreen.style.display =
                "flex";

        }


        return true;

    }


    return false;

}


// ==========================================
// WAIT FUNCTION
// ==========================================

function wait(milliseconds) {

    return new Promise(
        function(resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}


// ==========================================
// 🔄 NEXT PLAYER
// ==========================================

function nextPlayer() {

    currentPlayer++;


    if (
        currentPlayer >=
        players.length
    ) {

        currentPlayer =
            0;

    }


    selectedToken =
        null;


    waitingForTokenSelection =
        false;


    lastRoll =
        0;


    consecutiveSixes =
        0;


    clearMovableTokens();


    message.textContent =
        players[currentPlayer] +
        " player's turn. Roll the dice.";

}


// ==========================================
// 🎲 DICE ROLL
// ==========================================

rollButton.onclick =
    async function() {


        if (gameOver) {

            return;

        }


        // ======================================
        // PREVENT DOUBLE CLICK
        // ======================================

        rollButton.disabled =
            true;


        const color =
            players[currentPlayer];


        // ======================================
        // ROLL
        // ======================================

        const number =
            Math.floor(
                Math.random() * 6
            ) + 1;


        lastRoll =
            number;


        dice.textContent =
            diceFaces[number - 1];


        // ======================================
        // SIX COUNTER
        // ======================================

        if (
            number === 6
        ) {

            consecutiveSixes++;

        } else {

            consecutiveSixes =
                0;

        }


        // ======================================
        // THIRD SIX
        // ======================================

        if (
            consecutiveSixes >= 3
        ) {

            message.textContent =
                color +
                " rolled three 6s! ❌ Turn passes.";


            await wait(700);


            nextPlayer();


            rollButton.disabled =
                false;


            return;

        }


        // ======================================
        // CHECK MOVABLE TOKENS
        // ======================================

        let movableTokenExists =
            false;


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            if (
                canTokenMove(
                    color,
                    i,
                    number
                )
            ) {

                movableTokenExists =
                    true;

                break;

            }

        }


        // ======================================
        // NO LEGAL MOVE
        // ======================================

        if (
            !movableTokenExists
        ) {

            clearMovableTokens();


            waitingForTokenSelection =
                false;


            selectedToken =
                null;


            message.textContent =
                color +
                " rolled " +
                number +
                ". No token can move.";


            await wait(700);


            nextPlayer();


            rollButton.disabled =
                false;


            return;

        }


        // ======================================
        // PLAYER MUST SELECT TOKEN
        // ======================================

        waitingForTokenSelection =
            true;


        selectedToken =
            null;


        highlightMovableTokens(
            color,
            number
        );


        message.textContent =
            color +
            " rolled " +
            number +
            ". ✨ Select a glowing token.";

    };


// ==========================================
// 🎮 PLAY AGAIN
// ==========================================

function playAgain() {


    // ======================================
    // HIDE VICTORY SCREEN
    // ======================================

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    if (victoryScreen) {

        victoryScreen.style.display =
            "none";

    }


    // ======================================
    // RESET VARIABLES
    // ======================================

    currentPlayer =
        0;

    selectedToken =
        null;

    waitingForTokenSelection =
        false;

    lastRoll =
        0;

    consecutiveSixes =
        0;

    gameOver =
        false;


    clearMovableTokens();


    // ======================================
    // RESET ALL TOKENS
    // ======================================

    const cells =
        getCells();


    players.forEach(
        function(color) {

            tokenData[color].forEach(
                function(
                    token,
                    number
                ) {


                    token.position =
                        -1;

                    token.inHomePath =
                        false;


                    const tokenElement =
                        document.querySelector(
                            `.token[data-color="${color}"][data-number="${number}"]`
                        );


                    if (!tokenElement) {

                        return;

                    }


                    tokenElement.classList.remove(
                        "selected-token"
                    );


                    tokenElement.classList.remove(
                        "movable-token"
                    );


                    const homeRow =
                        homePositions[
                            color
                        ][number][0];


                    const homeCol =
                        homePositions[
                            color
                        ][number][1];


                    const homeCellIndex =
                        homeRow * 15 +
                        homeCol;


                    cells[
                        homeCellIndex
                    ].appendChild(
                        tokenElement
                    );

                }
            );

        }
    );


    // ======================================
    // ENABLE DICE
    // ======================================

    rollButton.disabled =
        false;


    message.textContent =
        "RED player's turn. Roll the dice.";


    enableTokenSelection();

}


// ==========================================
// VALIDATE GAME STATE
// ==========================================

function validateGameState() {

    players.forEach(
        function(color) {

            tokenData[color].forEach(
                function(token) {


                    // HOME

                    if (
                        token.position === -1
                    ) {

                        return;

                    }


                    // CROWN

                    if (
                        token.position === 57
                    ) {

                        return;

                    }


                    // OUTER TRACK

                    if (
                        token.position >= 0 &&
                        token.position < 52
                    ) {

                        return;

                    }


                    // HOME PATH

                    if (
                        token.position >= 52 &&
                        token.position < 57
                    ) {

                        return;

                    }


                    // INVALID

                    console.error(
                        "Invalid token position:",
                        color,
                        token.position
                    );


                    token.position =
                        -1;

                    token.inHomePath =
                        false;

                }
            );

        }
    );

}


// ==========================================
// START GAME
// ==========================================

createBoard();

showPath();

placeTokensInHome();

message.textContent =
    "RED player's turn. Roll the dice.";


// ==========================================
// PLAY AGAIN BUTTON
// ==========================================

const playAgainButton =
    document.getElementById(
        "playAgainButton"
    );


if (playAgainButton) {

    playAgainButton.onclick =
        playAgain;

}
