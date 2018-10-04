<?php
    session_start();
    //this is commented because of the problems that were issues by some users that opened multiple games in multiple tabs
    //upon this time we aren't going to use sessions for this purpose
    //$_SESSION['level'] = $_GET['level'];
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>SolveIt- Play Game</title>
        <meta name="generator" content="WYSIWYG Web Builder 11 - http://www.wysiwygwebbuilder.com">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/solveit.css" rel="stylesheet">
        <link href="css/solveIt.css" rel="stylesheet">
        <link href="css/selectGameCSS.css" rel="stylesheet">
        <link href="css/playGameCSS.css" rel="stylesheet">
        <script type="text/javascript" src="js/jquery.js"></script>
        <!--Bootstrap fils-->
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/scripts.js"></script>
        <script type="text/javascript" src="d3/d3.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>        
    </head>
    <body style="background-color: rgb(164,255,170)">
        <!--Navigation-->
        <header class="row">
            <nav class="navbar navbar-default" id="nav">
                <div class="navbar-header" id="header">
                    <button type="button" class="navbar-toggle collapsed btn btn-default" data-toggle="collapse" data-target="#menu">
                        <span class=" icon-bar"></span>
                        <span class=" icon-bar"></span>
                        <span class=" icon-bar"></span>
                    </button>
                    <a href="selectGame.php" title="home">
                        <img src="images/Capture.PNG" alt="this is a site's logo">
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="menu">
                    <ul class="nav navbar-nav navbar-right" id="collaps" style="">
                        <li><a href="#">BLOG</a></li>
                        <li><a href="#">ABOUT</a></li>
                        <li><a href="#">PLAYERS</a></li>
                        <li><a href="#">CATEGORIES</a></li>
                        <li><a href="#">FORUM</a></li>
                        <li><a href="#">FEEDBACK</a></li>
                        <li><a href="#">CONTESTS</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <main>
            
            <!--
            <div class="col-xs-3 thumbnail" id="bord" style="float:right">
                <label>Your Score: </label>
                <span>0.98541265895</span><hr style="margin: 5px 40px">
                <label>Benefit: </label>
                <span>144.26</span><hr style="margin: 5px 40px">
                <label>Benefit: </label>
                <span>144.26</span><hr style="margin: 5px 40px">
                <button class="col-xs-8 col-xs-offset-2">Take to your best score</button><br><hr style="margin: 18px 0 5px 0">
                <label>Best Score: </label>
                <span>0.98541265895</span><hr style="margin: 5px 40px">
                <button class="col-xs-8 col-xs-offset-2">Save & Exit</button>
            </div>
            -->
            <?php
                if($_GET['level']<200){
                    echo "<div id='wb_Image1' class='d3div' style='width:90%; align:middle'>
                        <script type='text/javascript' src='js/d3Script.js'></script>
                    </div>";
                }

                else if($_GET['level']<300){
                    echo "<div id='wb_Image1' class='d3div' style='width:90%; align:middle'>
                        <script type='text/javascript' src='js/myScript-advanced.js'></script>
                    </div>";
                }
            ?>
            <script type="text/javascript" src="js/jqScript.js"></script>
        </main>
    </body>
</html>
