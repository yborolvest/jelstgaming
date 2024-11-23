<!DOCTYPE html>
<html lang="nl" >
<head>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/head.php'); ?>
  	<title>Jelst Plinko</title>
	<link rel="stylesheet" href="assets/style.css">
    
</head>
<body>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/jelst-nav.php'); ?>

<div class="header">
	<img class="logo" src="assets\img\jeroenplinko.gif" style="text-align: center;">
</div>

<div class="controls">
	<div></div>
	<div>
		<div id="balls">-</div>
	</div>
	<div class="drop-container">
		<div class="drop">
			<button id="drop-button" type="button" onclick="">Drop</button>
			<input id="checkbox" type="checkbox" />
			<label for="checkbox">
				<div class="box">
					<svg class="checked" xmlns="http://www.w3.org/2000/svg" width="8px" height="8px" viewBox="0 0 24 24">
						<path fill="#ffffff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
					</svg>
				</div>
			</label>
		</div>
	</div>
	<div></div>
</div>
<div class="canvas-container">
	<canvas id="canvas"></canvas>
</div>
<div class="notes">
	<div type="button" class="note" id="note-0">0</div>
	<div type="button" class="note" id="note-1">5</div>
	<div type="button" class="note" id="note-2">2</div>
	<div type="button" class="note" id="note-3">1</div>
	<div type="button" class="note" id="note-4">1</div>
	<div type="button" class="note" id="note-5">1.5x</div>
	<div type="button" class="note" id="note-6">1x</div>
	<div type="button" class="note" id="note-7">.5x</div>
	<div type="button" class="note" id="note-8">.3x</div>
	<div type="button" class="note" id="note-9">.5x</div>
	<div type="button" class="note" id="note-10">1x</div>
	<div type="button" class="note" id="note-11">1.5x</div>
	<div type="button" class="note" id="note-12">3x</div>
	<div type="button" class="note" id="note-13">5x</div>
	<div type="button" class="note" id="note-14">10x</div>
	<div type="button" class="note" id="note-15">41x</div>
	<div type="button" class="note" id="note-16">0</div>
</div>
<div id="BuySellBalls">
	<h2>Buy/Sell Balls</h2>
	<p>Current Credits: <span id="credits">0</span></p>
	<p>Balls are worth 1 credit each</p>
	<section class="BuySellControl">
		<div id="BuyBalls" class="buySellBtns">
			<button class="btn-BuyBalls" data-buy="1">Buy 1 ball</button>
			<button class="btn-BuyBalls" data-buy="10">Buy 10 balls</button>
			<button class="btn-BuyBalls" data-buy="100">Buy 100 balls</button>
		</div>
		<div id="SellBalls" class="buySellBtns">
			<button class="btn-SellBalls" data-sell="1">Sell 1 ball</button>
			<button class="btn-SellBalls" data-sell="10">Sell 10 balls</button>
			<button class="btn-SellBalls" data-sell="100">Sell 100 balls</button>
			<button class="btn-SellBalls" data-sell="all">Sell all balls</button>
		</div>
	</section>

</div>

<script src='https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js'></script>
<script src="./assets/script.js"></script>
<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php'); ?>
</body>
</html>
