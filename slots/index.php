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
        <div class="slotsHeader">
            <img src="assets/img/JelstSlots.png" alt="Slots">
            
        </div>
        <div class="paytable">
                <table>
                    <thead>
                        <tr>
                            <th style="opacity: 0;"></th>
                            <th class="symbol-head">x3</th>
                            <th class="symbol-head">x4</th>
                            <th class="symbol-head">x5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Dynamic rows -->
                    </tbody>
                </table>
            </div>
        <div class="slotcontainer">
            <div class="slotcontainer-inner">
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
            </div>

            <div class="levercontainer">
                <div class="levertip"></div>
                <div class="lever"></div>
            </div>
        </div>

        <div style="display: flex;">
        </div>

        <div class="slotInformation">
            <span class="slotsCounterTitle">Cost per spin: <div class="slotsCounter"><span id="costPerSpin">0</span></div></span>
            <span class="slotsCounterTitle">Credits <div class="slotsCounter"><span id="credits">0</span></div></span>
            <span class="slotsCounterTitle"> Session profit: <div class="slotsCounter"><span id="sessionProfit">0</span></div></span>
        </div>    
    
    </div>
    

    <script src="assets/slots.js"></script>
	<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php'); ?>
</body>