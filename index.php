<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SolveIt- Play Game for Solving Problems</title>
        <meta name="generator" content="WYSIWYG Web Builder 11 - http://www.wysiwygwebbuilder.com">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/SolveIt.css" rel="stylesheet">
        <link href="css/solveIt.css" rel="stylesheet">
        <script type="text/javascript" src="js/jquery.js"></script>
        <!--Bootstrap fils-->
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/scripts.js"></script>
        <script type="text/javascript" src="d3/d3.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script language="javascript">
            function emailCurrentPage(){
                var email_adress = document.getElementById("email_of_friend").value;
                window.location.href="mailto:"+email_adress+"?subject="+document.title+"&body="+escape(window.location.href);
            }
            function redirect_page(){
                window.location.href = 'www.yoursite.com';
            }
        </script>
    </head>
    <body>
        <!--Navigation-->
        <header class="row">
            <nav class="navbar navbar-default" id="nav">
                <div class="navbar-header" id="header">
                    <button type="button" class="navbar-toggle collapsed btn btn-default" data-toggle="collapse" data-target="#menu">
                        <span class=" icon-bar"></span>
                        <span class=" icon-bar"></span>
                        <span class=" icon-bar"></span>
                    </button>
                    <a href="#" title="home">
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
        <main id="index">
            <div class="row">
                <div class="col-xs-3 pull-right thumbnail" id="getStarted">
                    <b>Get Started with SolveIt</b><br><br>
                    <span> Are you new to SolveIt?</span><a href="#"> Click here</a>
                </div>
            </div>
           
            <div class="row">
                <div class="col-xs-3 pull-right thumbnail" id="logIn">
                     <form name="loginform" method="post" accept-charset="UTF-8" action="login.php" id="loginform">
                        <div class="text-center">Log In</div><br>
                        <input type="email" name="email" placeholder="Email">
                        <input type="password" name="password" placeholder="Password">
                        <input class="col-xs-offset-7" type="submit" name="submit" value="Log In" id="logInBtn" style="width: 40%">
                        <input class="col-xs-offset-0" type="submit" name="register" value="Create Account" id="logInBtn1" style="width: 40%" onclick="location.href = 'register.php';">                        
                </div>
            </div>
            
            <div class="row">
                <div class="col-xs-3 pull-right thumbnail" id="recommend">
                    <label>Recommend Solved</label>
                    <input type="text" name="email_of_friend" placeholder="">
                    <a href="javascript:emailCurrentPage()">
                        <input type="button" value="Send Invitation Email" />
                    </a>
                </div>
            </div>
            <!--
            <div class="d3div">
                <script type="text/javascript" src="js/gameDemo.js"></script>
            </div>
            -->
        </main>
    </body>
</html>