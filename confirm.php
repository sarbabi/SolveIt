<?php
include('init.php');
$passkey = $_GET['passkey'];
$sql = "UPDATE `players` SET `confirmed`=NULL WHERE `confirmed`='$passkey'";
$result = mysqli_query($link,$sql) or die("database error: confirm");
if($result)
{
echo '<div>Your account is now active. You may now <a href="login_signup.php">Log in</a></div>';
}
else
{
echo "Some error occur.";
}
?>