<!DOCTYPE html>
<html lang="nl">
<head>
    <?php  include_once($_SERVER['DOCUMENT_ROOT'] .'/templates/head.php');  ?>
    <title>Jelst Daily</title>
    <link rel="stylesheet" href="/daily/daily.css">
</head>
<body>
    <?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/jelst-nav.php'); ?>

    <div class="daily-container">
        <div id="puzzleContainer">
            <canvas id="puzzleCanvas" width="auto" height="auto">
                
            </canvas>
            <div id="puzzleBg"></div>
        </div>
        <p class="dailynotice"></p>
        <button class="choiceBtns" data-puzzle-diff="3">3x3 puzzle (180 credits)</button>
        <button class="choiceBtns" data-puzzle-diff="4">4x4 puzzle (320 credits)</button>
        <button class="choiceBtns" data-puzzle-diff="6">6x6 puzzle (720 credits)</button>
        <button class="choiceBtns" data-puzzle-diff="8">8x8 puzzle (1280 credits)</button>
        <button class="choiceBtns" data-puzzle-diff="10">10x10 puzzle (2000 credits)</button>
    </div>

    <script src="/daily/daily.js"></script>
    
    <?php  include_once($_SERVER['DOCUMENT_ROOT'] .'/templates/footer.php');  ?>
</body>
</html>