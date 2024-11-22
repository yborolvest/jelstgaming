const spinSound = new Audio('assets/audio/spin.mp3');
const smallWinSound = new Audio('assets/audio/small_win.mp3');
const bigWinSound = new Audio('assets/audio/big_win.mp3');
const leverSound = new Audio('assets/audio/lever.mp3');
const slots = document.querySelectorAll('.slot');
const transitionDelay = 1000;
const spinPrice = 10;
const bigWin = 1000;
let spun = false;
let creditsEl = document.querySelector('#credits')

GetCredits().then((credits) => {
    creditsEl.innerHTML = credits.toString();
});

const paylines = [
    [0, 1, 2, 3, 4],   // Top row
    [5, 6, 7, 8, 9],   // Middle row
    [10, 11, 12, 13, 14], // Bottom row
    [0, 6, 12, 8, 4],        // V Shape
    [10, 6, 2, 8, 14],        // ^ Shape
];

const symbols = [
    { img: "./assets/img/cherry.webp", payout: [0, 0, 50, 100, 500] }, // [0-match, 1-match, 2-match, 3-match, 4-match, 5-match]
    { img: "./assets/img/coconut.webp", payout: [0, 0, 75, 150, 750] },
    { img: "./assets/img/orange.webp", payout: [0, 0, 100, 200, 1000] },
    { img: "./assets/img/watermelon.png", payout: [0, 0, 125, 250, 1250] },
    { img: "./assets/img/grape.webp", payout: [0, 0, 150, 300, 1500] },
    { img: "./assets/img/seven.png", payout: [0, 0, 5000, 10000, 50000] }
];


function generateWeightedSymbols() {
    const weightedSymbols = [];
    symbols.forEach(symbol => {
        const weight = Math.max(1, 500 / symbol.payout[3]); // Adjust weight calculation as needed
        for (let i = 0; i < weight; i++) {
            weightedSymbols.push(symbol.img);
        }
    });
    return weightedSymbols;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createSymbolElement(symbolUrl) {
    const div = document.createElement('div');
    div.classList.add('symbol');
    const img = document.createElement('img');
    img.src = symbolUrl;
    div.appendChild(img);
    return div;
}

function generate() {
    const weightedSymbols = generateWeightedSymbols();
    slots.forEach((slot, index) => {
        shuffleArray(weightedSymbols);

        const symbolsContainer = slot.querySelector('.symbols');
        symbolsContainer.innerHTML = '';

        let lastSymbol = null;
        weightedSymbols.forEach(symbolUrl => {
            if (symbolUrl !== lastSymbol) {

                symbolsContainer.appendChild(createSymbolElement(symbolUrl));
                lastSymbol = symbolUrl;
            } else {
                for (let i = 0; i < weightedSymbols.length; i++) {
                    if (weightedSymbols[i] !== lastSymbol) {
                        symbolsContainer.appendChild(createSymbolElement(weightedSymbols[i]));
                        lastSymbol = weightedSymbols[i];
                        break;
                    }
                }
            }
        });

        symbolsContainer.style.transitionDelay = `${transitionDelay * index}ms`;
    });
}

function spin() {
    return new Promise(resolve => {
        if (spun) {
            reset();
        }
        let completedSlots = 0;

        spinSound.volume = 0.05;
        spinSound.play();


        slots.forEach((slot, index) => {
            const symbolsContainer = slot.querySelector('.symbols');
            const symbolHeight = symbolsContainer.querySelector('.symbol')?.clientHeight+1;
            const symbolCount = symbolsContainer.childElementCount;

            // Set initial position to show the bottom elements, adjusted by index
            symbolsContainer.style.top = `-${(symbolCount - 1) * symbolHeight}px`;


            // Force reflow to apply the initial position
            symbolsContainer.offsetHeight;

            // Calculate the offset to scroll up
            const randomOffset = (symbolCount - 3) * symbolHeight;
            symbolsContainer.style.transition = `top ${transitionDelay * (index + 1)}ms ease-in-out`;
            symbolsContainer.style.top = `-${randomOffset + 11}px`;

            symbolsContainer.addEventListener('transitionend', () => {
                completedSlots++;
                if (completedSlots === slots.length) {
                    spun = true;
                    spinSound.pause();
                    spinSound.currentTime = 0;
                    resolve();
                }
            }, { once: true });
        });
    });
}

const spinAmountInput = document.querySelector('.spinAmount');

function reset() {
    const slots = document.querySelectorAll('.slot');

    slots.forEach(slot => {
        const symbolsContainer = slot.querySelector('.symbols');
        symbolsContainer.style.transition = 'none';
        symbolsContainer.style.top = '0';
        symbolsContainer.offsetHeight;
        symbolsContainer.style.transition = '';
    });

    generate();
}

document.querySelector('.levertip').addEventListener('click', function () {
    spin();
});

function getVisibleSymbols() {
    // Extract the visible symbols in each column after spin
    const visibleSymbols = [];
    slots.forEach(slot => {
        const symbolsContainer = slot.querySelector('.symbols');
        const symbolCount = symbolsContainer.childElementCount;

        // Push the last 3 visible symbols in the slot window
        visibleSymbols.push([
            symbolsContainer.children[symbolCount - 3],
            symbolsContainer.children[symbolCount - 2],
            symbolsContainer.children[symbolCount - 1]
        ]);
    });
    return visibleSymbols;
}

function checkWin() {
    const visibleSymbols = getVisibleSymbols();
    smallWinSound.pause();
    smallWinSound.currentTime = 0;
    bigWinSound.pause();
    bigWinSound.currentTime = 0;

    // Flatten the visible symbols into a single array (row-major order)
    const flattenedSymbols = [
        visibleSymbols[0][0], visibleSymbols[1][0], visibleSymbols[2][0], visibleSymbols[3][0], visibleSymbols[4][0], // Top row
        visibleSymbols[0][1], visibleSymbols[1][1], visibleSymbols[2][1], visibleSymbols[3][1], visibleSymbols[4][1], // Middle row
        visibleSymbols[0][2], visibleSymbols[1][2], visibleSymbols[2][2], visibleSymbols[3][2], visibleSymbols[4][2], // Bottom row
    ];

    let totalPayout = 0;

    // Helper function to extract the filename (e.g., "orange.webp")
    function getFilenameFromURL(url) {
        return url.split('/').pop();
    }

    // Clear previous winning symbols
    document.querySelectorAll('.winning-symbol').forEach(el => el.classList.remove('winning-symbol'));

    // Check each payline
    paylines.forEach(payline => {
        let matchCount = 1; // Start with the first symbol in the payline
        let currentSymbol = flattenedSymbols[payline[0]]; // The first symbol of the payline
        let currentSymbolFilename = getFilenameFromURL(currentSymbol.querySelector('img').src); // Extract the filename for comparison

        let winningSymbols = [currentSymbol];
        // Go through the payline and check for matching consecutive symbols
        for (let i = 1; i < payline.length; i++) {
            const currentIndex = payline[i];
            const nextSymbol = flattenedSymbols[currentIndex];
            const nextSymbolFilename = getFilenameFromURL(nextSymbol.querySelector('img').src); // Extract the filename for comparison

            if (nextSymbolFilename === currentSymbolFilename) {
                winningSymbols.push(nextSymbol);
                matchCount++; // Increase the match count for consecutive symbols
            } else {
                // If we find a mismatch, check if the match count is 3 or more
                if (matchCount >= 3) {
                    // Find the corresponding symbol in the symbols array by its filename
                    const winningSymbol = symbols.find(symbol => getFilenameFromURL(symbol.img) === currentSymbolFilename);
                    if (winningSymbol) {
                        totalPayout += winningSymbol.payout[matchCount - 1]; // Payout based on match count
                        winningSymbols.forEach(symbol => symbol.classList.add('winning-symbol'));
                    }
                }
                // Reset match count and current symbol
                currentSymbol = nextSymbol;
                currentSymbolFilename = nextSymbolFilename; // Update the current symbol
                matchCount = 1; // Reset to 1 because this is the first symbol in a new sequence
                winningSymbols = [currentSymbol];
            }
        }

        // After finishing the loop, check the last sequence if it matched 3 or more symbols
        if (matchCount >= 3) {
            const winningSymbol = symbols.find(symbol => getFilenameFromURL(symbol.img) === currentSymbolFilename);
            if (winningSymbol) {
                totalPayout += winningSymbol.payout[matchCount - 1]; // Payout based on match count
            }
        }
    });

    // Update credits and display the result
    if (totalPayout > 0) {
        if(totalPayout > bigWin){
            bigWinSound.volume = 0.05;
            bigWinSound.play();
        }
        else
        {
            smallWinSound.volume = 0.05;
            smallWinSound.play();
        }
        totalPayout -= spinPrice;
        document.querySelector('#sessionProfit').textContent = (parseInt(document.querySelector('#sessionProfit').textContent) + totalPayout).toString();
        AdjustCredits(totalPayout).then(credits => {
            creditsEl.innerHTML = credits;
        });
        alert(totalPayout);
    }
    else{
        AdjustCredits(-spinPrice).then(credits => {
            creditsEl.innerHTML = credits;
        });
    }
}

function spinAndCheck() {
    GetCredits().then((credits) => {
       if(credits >= spinPrice){
           spin().then(() => {
               checkWin();
           });
       }
    });

}

const leverTip = document.querySelector('.levertip');
const lever = document.querySelector('.lever');
let isDragging = false;
let startY = 0;
let currentY = 0;

leverTip.addEventListener('mousedown', (event) => {
    isDragging = true;
    leverSound.play();
    startY = event.clientY;
    leverTip.style.transition = 'none';
    lever.style.transition = 'none';
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        currentY = event.clientY;
        const offsetY = currentY - startY;
        if (offsetY > 0 && offsetY < 150) { // Limit the lever's movement
            leverTip.style.transform = `translateY(${offsetY}px)`;
            lever.style.transform = `scaleY(${(250 - offsetY) / 250})`; // Adjust the lever's height
        }
    }
});

document.addEventListener('mouseup', async () => {
    if (isDragging) {
        isDragging = false;
        leverTip.style.transition = '';
        leverTip.style.transform = '';
        lever.style.transition = '';
        lever.style.transform = ''; // Reset the lever's transform

        if (currentY - startY > 100) { // Threshold to trigger the spin
            await spinAndCheck();
        }
    }
});

generate();


function populatePaytable() {
    const paytableBody = document.querySelector('.paytable tbody');
    paytableBody.innerHTML = '';

    symbols.forEach(symbol => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${symbol.img}" alt="symbol" class="paytable-symbol"></td>
            <td>${symbol.payout[2]}</td>
            <td>${symbol.payout[3]}</td>
            <td>${symbol.payout[4]}</td>
        `;
        paytableBody.appendChild(row);
    });
}

// Call this function to populate the paytable on page load
populatePaytable();