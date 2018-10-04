<?php
	include 'init.php';
	session_start();
	
	$lvl = $_POST['level'];
	$player_id = $_SESSION['playerid'];

	$result = mysqli_query($link, "SELECT bestx, besty FROM `facilities` WHERE `player`=$player_id AND `level`=$lvl");
	
	$postString = "";
		
	while ($row = mysqli_fetch_row($result)) {
		if($postString!="") 
			$postString = $postString.",".$row[0].",".$row[1];
		else
			$postString = $row[0].",".$row[1];
	}

	if($postString!=""){
		$result2 = mysqli_query($link, "SELECT bestscore FROM `scores` WHERE `player`=$player_id AND `level`=$lvl");
		$row2 = mysqli_fetch_row($result2);
		$postString2 = $row2[0];
		echo $postString.",".$postString2;
	}
	else{
		echo "0";
	}	
?>