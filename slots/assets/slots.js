const canvas = document.getElementById('slots');
const ctx = canvas.getContext('2d');

const reelSymbols = [
    { src: '../assets/img/jeroen.png', rarity: 3, payout: 50 },
    { src: 'assets/img/devcoin.png', rarity: 5, payout: 20 },
    { src: 'assets/img/jeroenwatermeloen.png', rarity: 10, payout: 10 },
];

const reelCount = 3;
const symbolSize = 100;
const credits = 100;
let currentCredits = credits;
const rows = 3; // Number of visible rows

function drawReel(x, y, symbol) {
    const img = new Image();
    img.src = symbol.src;
    img.onload = () => {
        ctx.drawImage(img, x, y, symbolSize, symbolSize);
    };
}

function getRandomSymbol() {
    const totalRarity = reelSymbols.reduce((sum, symbol) => sum + symbol.rarity, 0);
    let random = Math.floor(Math.random() * totalRarity);
    for (const symbol of reelSymbols) {
        if (random < symbol.rarity) {
            return symbol;
        }
        random -= symbol.rarity;
    }
}

function spinReels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const results = [];
    for (let i = 0; i < reelCount; i++) {
        const columnResults = [];
        for (let j = 0; j < rows; j++) {
            const symbol = getRandomSymbol();
            drawReel(i * symbolSize, j * symbolSize, symbol);
            columnResults.push(symbol);
        }
        results.push(columnResults);
    }
    return results;
}

function checkWin(results) {
    const firstSymbol = results[0][0];
    if (results.every(column => column.every(symbol => symbol.src === firstSymbol.src))) {
        return firstSymbol.payout;
    }
    return 0;
}

function updateCredits(payout) {
    if (payout > 0) {
        currentCredits += payout;
    } else {
        currentCredits -= 1;
    }
    document.getElementById('credits').innerText = `Credits: ${currentCredits}`;
}

document.getElementById('spinButton').addEventListener('click', () => {
    if (currentCredits > 0) {
        animateReels();
    } else {
        alert('Out of credits!');
    }
});

// Initial draw
document.getElementById('credits').innerText = `Credits: ${currentCredits}`;

function animateReels() {
    const spinDuration = 2000; // Duration of the spin in milliseconds
    const startTime = Date.now();

    function animate() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < spinDuration) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < reelCount; i++) {
                for (let j = 0; j < rows + 1; j++) {
                    const symbol = getRandomSymbol();
                    const y = (elapsedTime / spinDuration) * canvas.height - symbolSize;
                    drawReel(i * symbolSize, (j * symbolSize + y) % canvas.height, symbol);
                }
            }
            requestAnimationFrame(animate);
        } else {
            const results = spinReels();
            const payout = checkWin(results);
            updateCredits(payout);
        }
    }

    animate();
}