<!DOCTYPE html>
<?php
include "init.php";
session_start();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>SolveIt- Select Game</title>
        <meta name="generator" content="WYSIWYG Web Builder 11 - http://www.wysiwygwebbuilder.com">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/solveIt.css" rel="stylesheet">
        <!--<link href="css/index.css" rel="stylesheet">-->
        <link href="css/selectGameCSS.css" rel="stylesheet">
        <script type="text/javascript" src="js/jquery.js"></script>
        <!--Bootstrap fils-->
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/scripts.js"></script>
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
                    <a href="index.php" title="home">
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
            <div class="row"> 
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=101">
                        Level: Basic 01
                    </a>
                    <a href="playGame.php?level=101">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl101_data = mysqli_query($link, "SELECT player, bestscore FROM `scores` WHERE `level`=101 ORDER BY bestscore ASC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse1" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of a facility to serve 3 identical customers. 
                                        the goal is to minimize the sum of distances for customers with their nearest facility while serving all of them.
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=102">
                        Level: Basic 02
                    </a>
                    <a href="playGame.php?level=102">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl101_data = mysqli_query($link, "SELECT player, bestscore FROM `scores` WHERE `level`=102 ORDER BY bestscore ASC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse2" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of two facilities to serve 5 identical customers. 
                                        the goal is to minimize the sum of distances for customers with their nearest facility while serving all of them.
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=102">
                        Level: Basic 03
                    </a>
                    <a href="playGame.php?level=103">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse103">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl101_data = mysqli_query($link, "SELECT player, bestscore FROM `scores` WHERE `level`=103 ORDER BY bestscore ASC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl101_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse103" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of two facilities to serve 5 identical customers. 
                                        the goal is to minimize the sum of distances for customers with their nearest facility while serving all of them.
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=201">
                        Level: Intermediate 01
                    </a>
                    <a href="playGame.php?level=201">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl_data = mysqli_query($link, "SELECT player, score FROM `scores-advanced` WHERE `level`=201 ORDER BY score DESC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse3" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of one facility to serve 3 not evenly critical customers. 
                                        the goal is to maximize the score, minimizing the sum of distances while maximizing the sum of benefits customers gain from their nearest facilities (the more close a facility is to a customer, the highter will the benefit will be gained).
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=202">
                        Level: Intermediate 02
                    </a>
                    <a href="playGame.php?level=202">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse4">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl_data = mysqli_query($link, "SELECT player, score FROM `scores-advanced` WHERE `level`=202 ORDER BY score DESC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse4" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of two facilities to serve 5 not evenly critical customers. 
                                        the goal is to maximize the score, minimizing the sum of distances while maximizing the sum of benefits customers gain from their nearest facilities (the more close a facility is to a customer, the highter will the benefit will be gained).
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
                <div class="col-xs-6 col-xs-offset-3 thumbnail">
                    <a class="headGame" href="playGame.php?level=202">
                        Level: Advanced 01
                    </a>
                    <a href="playGame.php?level=203">
                        <img class="imageGame" src="images/map1.PNG">
                    </a>
                    <div class="panel-group" id="accordion">

                        <div class="panel panel-default">
                            <div class="panel-heading" style="height: 3em;">
                                <a class="col-xs-12 panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse5">
                                    read more about this level
                                    <span class="pull-right glyphicon glyphicon-triangle-bottom"></span></a>
                            </div>
                            <!--getting data about this level-->
                            <?php
                                $lvl_data = mysqli_query($link, "SELECT player, score FROM `scores-advanced` WHERE `level`=203 ORDER BY score DESC LIMIT 3")  or die(mysqli_error($link));
                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $first_player = mysqli_fetch_row($resultplayername);
                                $first_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $second_player = mysqli_fetch_row($resultplayername);
                                $second_score = $row[1];

                                $row = mysqli_fetch_row($lvl_data);
                                $resultplayername = mysqli_query($link, "SELECT username FROM `players` WHERE `id`=$row[0]");
                                $third_player = mysqli_fetch_row($resultplayername);
                                $third_score = $row[1];
                            ?>
                            <div id="collapse5" class="panel-collapse collapse ">
                                <div class="panel-body">
                                    <p>
                                        In this game you are going to find the best location of three facilities to serve 7 not evenly critical customers. 
                                        the goal is to maximize the score, minimizing the sum of distances while maximizing the sum of benefits customers gain from their nearest facilities (the more close a facility is to a customer, the highter will the benefit will be gained).
                                    </p>  
                                    <p>here are top players of the level up to now</p>
                                    <p>
                                        <strong>Top Player:</strong> <?php echo $first_player[0];?>    <strong>Distance: </strong><?php echo $first_score; ?><br>
                                        <strong>2nd Player:</strong> <?php echo $second_player[0];?>   <strong>Distance: </strong><?php echo $second_score; ?><br>
                                        <strong>3rd Player:</strong> <?php echo $third_player[0];?>    <strong>Distance: </strong><?php echo $third_score; ?><br>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--****************************************-->
            </div>
        </main>
    </body>
</html>
