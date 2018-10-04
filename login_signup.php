<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Welcome to Solve It!</title>
    <link rel="stylesheet" type="text/css" href="css/login_st.css">
    <script type="text/javascript" src="d3/d3.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>    
  </head>
  <body>

  <?php
  session_start();
  if(isset($_SESSION['error']))
  {
    if(isset($_SESSION['error']['username']))
      echo '<p>'.$_SESSION['error']['username'].'</p>';
    if(isset($_SESSION['error']['email']))
      echo '<p>'.$_SESSION['error']['email'].'</p>';
    if(isset($_SESSION['error']['password']))
      echo '<p>'.$_SESSION['error']['password'].'</p>';
    unset($_SESSION['error']);
  }
  ?>

  <div class="login-box">
    <div class="lb-header">
      <a href="#" class="active" id="login-box-link">Login</a>
      <a href="#" id="signup-box-link">Sign Up</a>
    </div>
    <form class="email-login" action="login.php" method="POST">
      <div class="u-form-group">
        <input name="email" type="email" id="email" placeholder="Email"/>
      </div>
      <div class="u-form-group">
        <input name="password" type="password" id="password" placeholder="Password"/>
      </div>
      <div class="u-form-group">
        <input name="submit" type="submit" value="Login"/>
      </div>
      <div class="u-form-group">
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
    </form>
    <form class="email-signup" action="register.php" method="POST" >
      <div class="u-form-group">
        <input name="username" type="username" id="username" placeholder="Username"/>
      </div>
      <div class="u-form-group">
        <input name="email" type="email" id="email" placeholder="Email"/>
      </div>
      <div class="u-form-group">
        <input name="password" type="password" id="password" placeholder="Password"/>
      </div>
      <div class="u-form-group">
        <input name="password" type="password" id="password" placeholder="Confirm Password"/>
      </div>
      <div class="u-form-group">
        <input name="submit" type="submit" value="Sign Up"/>
      </div>
    </form>
  </div>
  <script type="text/javascript" src="js/login_sc.js"></script>
  </body>
  </html>