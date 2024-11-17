const canvas = document.getElementById('slots');
const ctx = canvas.getContext('2d');

const reelSymbols = [
    { src: '../assets/img/jeroen.png', rarity: 3, payout: 50 },
    { src: 'assets/img/devcoin.png', rarity: 5, payout: 20 },
    { src: 'assets/img/jeroenwatermeloen.png', rarity: 10, payout: 10 },
];

let credits = 100;
let currentWin = 0;

const reelCount = 6;
const reelHeight = canvas.height;
const reelWidth = canvas.width / reelCount;
const symbolHeight = 100;
const spinSpeed = 10;

let reels = [];
let spinning = false;

function initializeReels() {
    for (let i = 0; i < reelCount; i++) {
        let reel = {
            symbols: [],
            position: 0,
            speed: Math.random() * spinSpeed + spinSpeed
        };
        for (let j = 0; j < reelHeight / symbolHeight; j++) {
            let symbol = reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
            reel.symbols.push(symbol);
        }
        reels.push(reel);
    }
}

function drawReels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < reelCount; i++) {
        let reel = reels[i];
        for (let j = 0; j < reel.symbols.length; j++) {
            let symbol = reel.symbols[j];
            let img = new Image();
            img.src = symbol.src;
            let y = (reel.position + j * symbolHeight) % reelHeight;
            ctx.drawImage(img, i * reelWidth, y, reelWidth, symbolHeight);
        }
    }
}

function updateReels() {
    for (let i = 0; i < reelCount; i++) {
        reels[i].position += reels[i].speed;
        if (reels[i].position >= reelHeight) {
            reels[i].position = 0;
            reels[i].symbols.shift();
            let symbol = reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
            reels[i].symbols.push(symbol);
        }
    }
}

function animate() {
    if (spinning) {
        drawReels();
        updateReels();
        requestAnimationFrame(animate);
    }
}

document.getElementById('spinButton').addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        animate();
    }
});

initializeReels();