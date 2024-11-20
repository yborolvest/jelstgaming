<!DOCTYPE html>
<html lang="nl">
<head>
    <?php require_once('templates/head.php'); ?>
    <title>jelst gaming</title>
    <style>* {cursor: none} </style>
</head>
<body>
    <div class="intro-sequence-container">
        <h2 class="">⚠️ WARNING-HEALTH AND SAFETY</h1>
        <p>BEFORE PLAYING, READ YOUR OPERATIONS<br>MANUAL FOR IMPORTANT INFORMATION<br>ABOUT YOUR HEALTH AND SAFETY.</p>
        <p>Also online at <br> <a href="/healthsafety/" target="_blank">www.jeroenelst.nl/healthsafety/</a></p>
        <a onclick="removeIntro()">Press <span class="circleAround">A</span> to continue</a>
        <script>
            const clickaudio = new Audio('/assets/audio/WSD-SELECT.mp3');
            const hoveraudio = new Audio('/assets/audio/Sample_0003.mp3');
            hoveraudio.volume = 0.5;
            clickaudio.volume = 0.3;
            document.addEventListener('keydown', (e) => {
                if (e.key === 'a') {
                    removeIntro();
                }
            });
            function removeIntro() {
                const bgaudio = new Audio('/assets/audio/wii-ambient.mp3');
                // bg audio volume
                bgaudio.volume = 0.1;
                bgaudio.play();
                document.querySelector('.intro-sequence-container').style.opacity = '0';
                setTimeout(() => {
                    document.querySelector('.intro-sequence-container').style.display = 'none';
                }, 1000);
            }
            // on mouse click, play click sound
            document.addEventListener('click', () => {
                clickaudio.play();
            });



        </script>
    </div>
    <div class="game-container">        
        <div class="game-container-inner">
            <a class="jelst-home-btn btn-plinko" href="/plinko/">Plinko</a>
            <a class="jelst-home-btn btn-slots" href="/slots/">Slots</a>
            <a class="jelst-home-btn btn-cases" href="/cases/">CS Cases</a>
            <a class="jelst-home-btn btn-cs"></a>
            <a class="jelst-home-btn btn-cs"></a>
            <a class="jelst-home-btn btn-cs"></a>
            <a class="jelst-home-btn btn-cs"></a>
            <a class="jelst-home-btn btn-cs"></a>
            <a class="jelst-home-btn btn-cs"></a>
        </div>
    </div>
    <footer>
        <div class="footer-current-time">00:00</div>
    </footer>
    <script>
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });
        document.addEventListener('click', () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 200);
        });

        const footerTime = document.querySelector('.footer-current-time');
        setInterval(() => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            footerTime.innerText = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }, 1000);
    </script>
    <?php require_once('templates/footer.php'); ?>
</body>
</html>