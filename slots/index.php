<!DOCTYPE html>
<html lang="nl">
<head>
	<?php include_once($_SERVER['DOCUMENT_ROOT'] . '/templates/head.php'); ?>
	<title>Jelst Slots</title>
    <link rel="stylesheet" href="assets/slots.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/jelst-nav.php'); ?>
    <div class="container">
      <div class="slots">
        <canvas id="slots" width="500" height="300">

        </canvas>
        <button id="spinButton" class="jelst-btn">Spin</button>
        <h2 id="credits">000</h2>
      </div>
      

    </div>
    <script src="assets/slots.js"></script>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php'); ?>
</body>