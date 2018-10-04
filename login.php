<?php
include('init.php');
session_start();

if(isset($_POST['submit']))
{
	$email = trim($_POST['email']);
	$password = trim($_POST['password']);

	$query = "SELECT * FROM players WHERE email='$email' AND password='$password'";

	$result = mysqli_query($link,$query)or die("database error.");
	$num_row = mysqli_num_rows($result);
	$row=mysqli_fetch_array($result);

	$_SESSION['username'] = $row['username'];

	if( $num_row == 1 )
	{
		if(is_null($row['confirmed'])){
			$_SESSION['playerid']=$row['id'];
			header("location: selectGame.php");
			exit;
		}
		else
		{
			$_SESSION['error']['email'] = "your email address has not been confirmed yet. find the confirmation message in your email inbox.";
		}
	}
	else
	{
		$_SESSION['error']['email'] = "your email or password is not correctly typed.";
	}
	if(isset($_SESSION['error']))
	{
		header("Location: login_signup.php");
		exit;
	}
}
else if(isset($_POST['register'])){
	header("Location: login_signup.php");
	exit;
}
?>