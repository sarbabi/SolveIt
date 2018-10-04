<?php
include('init.php');
session_start();
if(isset($_POST['submit']))
{
	//whether the username is blank
	if($_POST['username'] == '')
	{
		$_SESSION['error']['username'] = "username is required.";
	}
	else
	{
		//whether the username has already exist
		$username= $_POST['username'];
		$sql1 = "SELECT * FROM players WHERE username = '$username'";
		$result1 = mysqli_query($link,$sql1) or die("database error:register");
		if (mysqli_num_rows($result1) > 0)
		{
			//used username
			$_SESSION['error']['username'] = "This username is already used.";
		}
	}
	
	//whether the email is blank
	if($_POST['email'] == '')
	{
		$_SESSION['error']['email'] = "E-mail is required.";
	}
	else
	{
		//whether the email format is correct
		if(preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/", $_POST['email']))
		{
			//if it has the correct format whether the email has already exist
			$email= $_POST['email'];
			$sql1 = "SELECT * FROM players WHERE email = '$email'";
			$result1 = mysqli_query($link,$sql1) or die("database error2");
			if (mysqli_num_rows($result1) > 0)
			{
				//used email
				$_SESSION['error']['email'] = "This Email is already used.";
			}
		}
		else
		{
			//this error will set if the email format is not correct
			$_SESSION['error']['email'] = "Your email is not valid.";
		}
	}
	//whether the password is blank
	if($_POST['password'] == '')
	{
		$_SESSION['error']['password'] = "Password is required.";
	}

	//if the error exist, we will go to registration form
	if(isset($_SESSION['error']))
	{
		header("Location: login_signup.php");
		exit;
	}
	else
	{
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$confirmed = md5(uniqid(rand()));

		$sql2 = "INSERT INTO `players` (`username`, `email`, `password`, `confirmed`) VALUES ('$username', '$email', '$password', '$confirmed')";
		$result2 = mysqli_query($link,$sql2) or die("database error3");

		$sql3 = "SELECT `id` FROM `players` WHERE `email` = '$email' limit 1";
		$result3 = mysqli_query($link,$sql3) or die("database error4");
		$obj = mysqli_fetch_object($result3);
		$reg_usr_id = $obj->id;

		////////////////////////////////////////////////////////////////////

		$lvls_adv= ["201", "202", "203"];
		for($i=0; $i<count($lvls_adv);$i++){
			$lvl = $lvls_adv[$i];
			$file = fopen("data_files/".$lvl.".csv","r");
			//$i = 0;

			$zero = 0;
			$j = 0;
			while(!feof($file))
  			{
  				$point = fgetcsv($file);

	  			$x = $point[0];
  				$y = $point[1];
  				$result = mysqli_query($link, "INSERT INTO `facilities-advanced` 
					(`player`, `level`, `timestamp`, `number`, `x`, `y`)
				VALUES ($reg_usr_id, $lvl, $zero, $j, $x, $y)")or die("database error5".$i);
				
				$j++;
  			}
			$result = mysqli_query($link, "INSERT INTO `scores-advanced` 
					(`player`, `level`, `timestamp`, `distance`, `benefit`, `score`)
				VALUES ($reg_usr_id, $lvl,$zero, 1000000, $zero, $zero)")or die(mysqli_error($link));
			fclose($file);

		}
			//mysqli_query($link, "INSERT INTO `scores-advanced` VALUES ($player_id, $lvl, $zillion, $zero, $zero)");

	}


		//$sql4 = "INSERT INTO `facilities` (`number`, `level`, `player`, `bestx`, `besty`) VALUES ('$reg_usr_id', 0,0,100000.01)";
		//$result4 = mysqli_query($link,$sql4) or die(mysqli_error());

		if($result2)
		{
			$to = $email;
			$subject = "Confirmation from SolveIt";
			$header = "SolveIt Team: Confirmation from SolveIt!";
			$message = "Thanks for collaborating, Please click the link below to verify and activate your account. \n";
			$message .= "http://saeed.arbabi.org/projects/solve-it/confirm.php?passkey=$confirmed";

			$sentmail = mail($to,$subject,$message,$header);
			if($sentmail)
			{
				$_SESSION['error']['email'] = "Your Confirmation link Has Been Sent To Your Email Address.";
			}
			else
			{
				$_SESSION['error']['email'] = "Cannot send Confirmation link to your e-mail address.";
			}
		
			header("Location: login_signup.php");
		}
		header("Location: login_signup.php");
	//}
}
?>