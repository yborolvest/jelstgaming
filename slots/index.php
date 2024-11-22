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
        <div class="slotcontainer">
            <div class="slot">
                <div class="symbols" id="slot1Symbols"></div>
            </div>

            <div class="slot">
                <div class="symbols" id="slot2Symbols"></div>
            </div>

            <div class="slot">
                <div class="symbols" id="slot3Symbols"></div>
            </div>

            <div class="slot">
                <div class="symbols" id="slot4Symbols"></div>
            </div>

            <div class="slot">
                <div class="symbols" id="slot5Symbols"></div>
            </div>

            <div class="levercontainer">
                <div class="levertip"></div>
                <div class="lever"></div>
            </div>
        </div>

        <div style="display: flex;">
        </div>
    <p>Credits: <span id="credits">0</span></p>
    <p> Session profit: <span id="sessionProfit">0</span></p>
    </div>
    <div class="paytable">
        <h2>Paytable</h2>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>3 Match</th>
                    <th>4 Match</th>
                    <th>5 Match</th>
                </tr>
            </thead>
            <tbody>
                <!-- Dynamic rows -->
            </tbody>
        </table>
    </div>

    <script src="assets/slots.js"></script>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php'); ?>
</body>