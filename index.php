<!DOCTYPE html>
<html lang="nl">
<head>
    <?php require_once('templates/head.php'); ?>
    <title>Jelst Gaming</title>
    <style>* {cursor: none} html, body {overflow: hidden;}</style>
</head>
<body>
    <div class="intro-sequence-container">
        <h2>⚠️ WARNING-HEALTH AND SAFETY</h2>
        <p>BEFORE PLAYING, READ YOUR OPERATIONS<br>MANUAL FOR IMPORTANT INFORMATION<br>ABOUT YOUR HEALTH AND SAFETY.</p>
        <p>Also online at <br> <a href="/healthsafety/" target="_blank">www.jeroenelst.nl/healthsafety/</a></p>
        <a onclick="removeIntro()">Press <span class="circleAround">A</span> to continue</a>
    </div>
    <div class="game-container">        
        <div class="game-container-inner">
            <a class="jelst-home-btn btn-plinko" href="/plinko/">Jelst Plinko</a>
            <a class="jelst-home-btn btn-slots" href="/slots/">Jelst Slots</a>
            <a class="jelst-home-btn btn-cases" href="/cases/">CS:Jelst Cases</a>
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
        <div class="footer-username wii-menu-btn footer-username-btn"><img src="/assets/img/person.svg"></div>
        <div class="footer-username-form hidden">
            <div class="footer-username-form-inner">
                <h3>Edit your username</h3>
                <input id="userName" type="text" placeholder="E.g. jeroenelst">
                <button id="saveUserName">Save</button>
                <p id="userNameAlert" class="alert"></p>
            </div>
        </div>
        <div class="footer-credits wii-menu-btn footer-leaderboard-btn"><img src="/assets/img/leaderboard.svg"></div>
        <div class="footer-credits-container">
            <div class="footer-credits-count">0</div>
            <div class="footer-credits-daily">
                <a class="footer-credits-daily-link">
                    <img src="/assets/img/credit.svg">
                    <span>Get daily credits</span>
                </a>
            </div>	
        </div>
        <div class="footer-leaderboard hidden">
            <div class="footer-leaderboard-inner">
                <h3>Leaderboard</h3>
                <ul id="leaderboardList">

                </ul>
            </div>
        </div>
    </footer>
    <script src="/assets/jelst.js"></script>
    <?php require_once('templates/footer.php'); ?>
</body>
</html>