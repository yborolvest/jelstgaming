<!DOCTYPE html>
<html lang="nl">
<head>
    <?php  include_once($_SERVER['DOCUMENT_ROOT'] .'/templates/head.php');  ?>
    <script src="functions.js" defer></script>
    <title>Steen Papier Jelst</title>
	<style>
		body {
			background-color: cornflowerblue;
            background-image: none;
		}

		.homo {
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.noah {
			display: flex;
			align-items: center;
		}

		h1 {
			font-size: 80px;
		}

		h2 {
			font-size: 90px;
		}

		p {
			font-size: 50px;
		}

		button {
			margin: 5px;
			font-size: 40px;

			display: flex;
			flex-direction: column;
			align-items: center;
		}

		#yv {
			margin-right: 8px;
		}
	</style>

</head>

<body>
    <?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/jelst-nav.php'); ?>
	<div class="homo">

		<h1>Steen Papier Jelst</h1>
        <p>Je inzet: <input type="number"></p>

		<div class="noah">
            
			<p>Kies:</p>
			<button onclick="sps('Steen')" style="font-size: 30px"><img
					src="/spj/img/steen.png"
					style="height: 100px;">Steen</button>
			<button onclick="sps('Papier')" style="font-size: 30px"><img
					src="/spj/img/papier.png"
					style="height: 100px;">Papier</button>
			<button onclick="sps('Schaar')" style="font-size: 30px"><img
					src="/spj/img/schaar.png"
					style="height: 100px;">Schaar</button>
		</div>

		<div class="noah">
			<p id="yv">Computer: </p>
			<p id="comp"
				style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
			</p>
		</div>

		<h2 id="result"></h2>
	</div>
    <?php  include_once($_SERVER['DOCUMENT_ROOT'] .'/templates/footer.php');  ?>
</body>
</html>