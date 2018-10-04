<?php
	include 'init.php';
	//session_start();

	$lvl = $_POST['level'];

	$result = mysqli_query($link, "SELECT x, y, weight FROM `customers` WHERE `level`='$lvl'");

	$postString = ""; 

	while ($row = mysqli_fetch_row($result)) {
		if($postString!="") 
			$postString = $postString.",".$row[0].",".$row[1].",".$row[2];
		else
			$postString = $row[0].",".$row[1].",".$row[2];
	}

	echo $postString;
?>