let puzzle;
let puzzleMusic = new Audio('/daily/audio/ACGC_5_PM.mp3');
puzzleMusic.volume = 0.2;
puzzleMusic.loop = true;

let completeSound = new Audio('/daily/audio/puzzle_complete.mp3');
completeSound.volume = 0.2;


class JigsawPuzzle {
    constructor(imageSrc, rows, cols, canvasId) {
        this.imageSrc = imageSrc;
        this.rows = rows;
        this.cols = cols;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.pieces = [];
        this.image = new Image();
        this.image.onload = () => this.initPuzzle();
        this.image.src = this.imageSrc;
        this.selectedPiece = null;
        this.snapTolerance = 30; // Tolerance for snapping
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        //this.checkWin();
    }

    onMouseDown(event) {
        const { offsetX, offsetY } = event;
        for (let i = this.pieces.length - 1; i >= 0; i--) {
            const piece = this.pieces[i];
            if (
                offsetX > piece.dx && offsetX < piece.dx + piece.width &&
                offsetY > piece.dy && offsetY < piece.dy + piece.height &&
                (piece.dx !== piece.sx || piece.dy !== piece.sy) // Check if the piece is not in the correct position
            ) {
                this.selectedPiece = piece;
                this.pieces.splice(i, 1);
                this.pieces.push(this.selectedPiece);
                break;
            }
        }
    }

    onMouseMove(event) {
        if (!this.selectedPiece) return;
        const { offsetX, offsetY } = event;
        this.selectedPiece.dx = offsetX - this.selectedPiece.width / 2;
        this.selectedPiece.dy = offsetY - this.selectedPiece.height / 2;
        this.drawPuzzle();
    }

    onMouseUp() {
        if (this.selectedPiece) {
            const { dx, dy, sx, sy } = this.selectedPiece;
            if (Math.abs(dx - sx) < this.snapTolerance && Math.abs(dy - sy) < this.snapTolerance) {
                this.selectedPiece.dx = sx;
                this.selectedPiece.dy = sy;
                this.selectedPiece.correct = true; // Tag the piece as correctly placed
            }
            // Push the piece to the back of the canvas
            this.pieces.unshift(this.pieces.pop());
            this.selectedPiece = null;
            this.drawPuzzle();
        }
        
        this.checkWin();
    }

    initPuzzle() {
        // Set canvas dimensions to match the image dimensions
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
        this.pieceWidth = this.canvas.width / this.cols;
        this.pieceHeight = this.canvas.height / this.rows;
        document.getElementById("puzzleBg").style.background = `url(${this.imageSrc})`;
        const puzzleBg = document.getElementById("puzzleBg");
        puzzleBg.style.width = `${this.canvas.width}px`;
        puzzleBg.style.height = `${this.canvas.height}px`;
        this.createPieces();
        this.shufflePieces();
        this.drawPuzzle();
    }

    createPieces() {
        this.pieces = []; // Clear the pieces array
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const piece = {
                    sx: col * this.pieceWidth,
                    sy: row * this.pieceHeight,
                    dx: col * this.pieceWidth,
                    dy: row * this.pieceHeight,
                    width: this.pieceWidth,
                    height: this.pieceHeight,
                    correct: false
                    
                };
                this.pieces.push(piece);
            }
        }
    }

    shufflePieces() {
        for (let i = this.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.pieces[i];
            this.pieces[i] = this.pieces[j];
            this.pieces[j] = temp;
        }
        // Ensure the pieces array has the correct number of pieces
        this.pieces.forEach(piece => {
            piece.dx = Math.random() * (this.canvas.width - piece.width);
            piece.dy = Math.random() * (this.canvas.height - piece.height);
        });
        this.drawPuzzle();
    }

    drawPuzzle() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const piece of this.pieces) {
            this.context.drawImage(
                this.image,
                piece.sx, piece.sy, piece.width, piece.height,
                piece.dx, piece.dy, piece.width, piece.height
            );
            if (piece.correct) {
                this.context.zIndex = -1;
            }
        }
        
    }

    checkWin() {
        const isWin = this.pieces.every(piece => piece.correct);
        if (isWin) {
            // stop the game when won
            this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
            this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this));
            // credits based on amount of pieces
            const pieceWorth = 20;
            const totalPieces = this.pieces.length;
            const credits = pieceWorth * totalPieces;
            completeSound.play();
            // add credits to player
            CheckDailyAvailable().then(available => {
                if(available){
                    AdjustCredits(credits);
                    SetDailyUsed();
                }
            });
            // show win message
            const winMessage = document.createElement('div');
            winMessage.classList.add('winMessage');
            winMessage.innerHTML = `<h2>Congratulations! You've completed the puzzle!</h2><p>You've earned ${credits} credits!</p>`;
            document.body.appendChild(winMessage);
            setTimeout(() => {
                // send user to home page
                window.location.href = '/';
            }, 8000);
        }
    }
}

// read attributes from choice buttons and apply to setupPuzzle function
const choiceBtns = document.querySelectorAll('.choiceBtns');
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const rows = btn.getAttribute('data-puzzle-diff');
        const cols = btn.getAttribute('data-puzzle-diff');
        setupPuzzle(rows, cols);
        puzzleMusic.play();
    });
});

// setup puzzle by function
function setupPuzzle(rows, cols){
    // Random image from array
    const images = [
        "/assets/img/slots.jpeg",
        "/assets/img/pachinko.jpeg"
    ];
    const img = images[Math.floor(Math.random() * images.length)];
    puzzle = new JigsawPuzzle(img, rows, cols, 'puzzleCanvas');
    puzzle.initPuzzle();

    // remove choice buttons with class .choiceBtns after selecting puzzle

    choiceBtns.forEach(btn => {
        btn.remove();
    });
}

// check if daily is available
CheckDailyAvailable().then(available => {
    if (!available) {
        // change daily link to "Check back tomorrow" and remove href
        const dailyLink = document.querySelector('.dailynotice');
        dailyLink.innerText = "You already claimed your daily reward today! So you won't gain any credits.";
    }
});