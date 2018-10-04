<?php
	include 'init.php';
	session_start();

	$lvl = $_POST['level'];
	$player_id = $_SESSION['playerid'];

	////////////////////////Grab Best Game Values From Scores Table////////////////
	//$tmpStr="";
	//$zero = 0;
	//$zillion = 1000000;
	/*$sql3 = "SELECT MIN(`distance`) FROM `scores-advanced` WHERE `level`=$lvl";
	$result3 = mysqli_query($link,$sql3);
	while($row = mysqli_fetch_row($result3)){
		$str=$row[0];
	}
	if($str == ""){
		$str = $zillion;
	}
	$tmpStr = $tmpStr.$str;

	$sql3 = "SELECT MAX(`benefit`) FROM `scores-advanced` WHERE `level`=$lvl";
	$result3 = mysqli_query($link,$sql3);
	while($row = mysqli_fetch_row($result3)){
		$str=$row[0];
	}
	if($str == ""){
		$str = $zero;
	}
	$tmpStr = $tmpStr.",".$str;

	$sql3 = "SELECT MAX(`bestscore`) FROM `scores-advanced` WHERE `level`=$lvl";
	$result3 = mysqli_query($link,$sql3);
	//$str ="";
	while($row = mysqli_fetch_row($result3)){
		$str=$row[0];
	}
	if($str == ""){
		$str = $zero;
	}
	$tmpStr = $tmpStr.",".$str;
*/
	///////////////////////////////Grab the Location for Facilities////////////////////
	$query1 = mysqli_query($link, "SELECT `timestamp`, `score`
									FROM `scores-advanced`
									WHERE `player`=$player_id AND `level` = $lvl");
	$row1 = mysqli_fetch_row($query1);
	$tstamp = $row1[0];
	$score = $row1[1];

	$query1 = mysqli_query($link, "SELECT `player`,`score`
									FROM `scores-advanced`
									WHERE `level` = $lvl
									ORDER BY `score` DESC
									LIMIT 1");
	$row1 = mysqli_fetch_row($query1);
	$bestPlayerId = $row1[0];
	$maxScore = $row1[1];

	$query1 = mysqli_query($link, "SELECT `username`
									FROM `players`
									WHERE `id` = $bestPlayerId");
	$row1 = mysqli_fetch_row($query1);
	$bestPlayerName = $row1[0];

	$result = mysqli_query($link, "SELECT `x`, `y`
									FROM `facilities-advanced` 
									WHERE `player`=$player_id AND `level`=$lvl AND `timestamp`=$tstamp");
	$firstTime = false;

	$postString = ""; 

	while ($row = mysqli_fetch_row($result)) {
		if($postString!="") 
			$postString = $postString.",".$row[0].",".$row[1];
		else
			$postString = $row[0].",".$row[1];
	}
/*
	if($postString==""){
		$firstTime = true;
		$file = fopen($lvl.".csv","r");
		$i = 0;
		while(!feof($file))
  		{
  			$point = fgetcsv($file);

  			if($postString!="") 
				$postString = $postString.",".$point[0].",".$point[1];
			else
				$postString = $point[0].",".$point[1];

  			$x = $point[0];
  			$y = $point[1];
  			$result = mysqli_query($link, "INSERT INTO `facilities-advanced` 
				(`player`, `level`, `timestamp`, `number`, `x`, `y`)
			VALUES ($player_id, $lvl,0, $i, $x, $y)");
			$i++;
  		}
		fclose($file);
		//mysqli_query($link, "INSERT INTO `scores-advanced` VALUES ($player_id, $lvl, $zillion, $zero, $zero)");

	}
*/
	//$postString = $postString.",".$tmpStr;

	//////////////////////////////////Grab Users Best Value Scores////////////////////////
	/*$query3 = mysqli_query($link, "SELECT Max(`score`)
										FROM `scores-advanced` 
										WHERE `player`=$player_id AND `level`=$lvl");

	if(!firstTime){
		$query2 = mysqli_query($link, "SELECT `distance`, `benefit`, `score`
										FROM `scores-advanced` 
										WHERE `player`=$player_id AND `level`=$lvl AND `timestamp`=$max_timestamp");
		$row2 = mysqli_fetch_row($query2);
		$postString2 = $row2[0].",".$row2[1].",".$row2[2];
	}
	else{}*/
	
	$postString = $postString.",".$score.",".$maxScore.",".$bestPlayerName;
	
	echo $postString;//.",".$postString2;
?>