<!DOCTYPE html>
<html lang="nl">
<head>

    <?php 

        include_once($_SERVER['DOCUMENT_ROOT'] .'/templates/head.php'); 
        
    ?>

    <title>Jelst Cases</title>
    <link rel="stylesheet" href="./assets/cases.css">
</head>
<body>
    <?php require_once($_SERVER['DOCUMENT_ROOT'] . '/templates/jelst-nav.php'); ?>
   
    <div class="container">
        <div class="case-picker">
            <form class="case-picker-form">
                <input type="radio" name="caseSelect" id="jelstcase" class="csbox-checkbox" value="jelstcase">
                <label for="jelstcase" class="csbox-checkbox-label"><img src="https://pub-5f12f7508ff04ae5925853dee0438460.r2.dev/data/csgo/resource/flash/econ/weapon_cases/crate_community_34_png.png">Jelst Case<br>(20 credits)</label>
                <input type="radio" name="caseSelect" id="chromacase" class="csbox-checkbox" value="chroma">
                <label for="chromacase" class="csbox-checkbox-label"><img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFEuh_KQJTtEuI63xIXbxqOtauyClTMEsJV1jruS89T3iQKx_BBqa2j3JpjVLFH1xpp0EQ">Chroma Case <br>(40 credits)</label>
            </form>
        </div>
        <div class="case-opener">
            <div class="case-spinner">
                <div class="case-spinner-inner">

                </div>
            </div>                                                                                                               
        </div>
        <div class="case-controls">
            <a id="openCaseButton" class="jelst-btn open-case">Open case</a>
            <p>Session Profit: <span class="profit">0</span> credits</p>
        </div>
        <div class="case-history">
            <h2>You unboxed:</h2>
            <div class="last-case">

            </div>
            <h2 style="margin-top: 16px;">Case history</h2>
            
            <ul class="case-history-list">

            </ul>
        </div>
    </div>
    <img class="ohnepixel-live-reaction" src="https://media1.tenor.com/m/fcWCX1eB0NMAAAAd/ohnepixel-ohne.gif"> 
    <script src="./assets/cases.js"></script>
    <?php include_once($_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php'); ?>
</body>