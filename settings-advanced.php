<?php
	include 'init.php';
	session_start();

	$date = new DateTime();
	$timestamp = $date->getTimestamp();
	if(isset($_POST['x'], $_POST['y'])){
		
		//todo
		$lvl = $_POST['level'];
		//$score = $_POST['score'];
		$distance = $_POST['distance'];
		$benefit = $_POST['benefit'];
		$x = $_POST['x'];
		$y = $_POST['y'];
		$xs = explode(",", $x);
		$ys = explode(",", $y);
		
		$player_id = $_SESSION['playerid'];
		//mysqli_query($link, "DELETE FROM `facilities-advanced` WHERE `player`=$player_id AND `level`=$lvl");
		
		for($i = 0; $i < sizeof($xs); $i++){
			$xi = $xs[$i];
			$yi = $ys[$i];			
			$result = mysqli_query($link, "INSERT INTO `facilities-advanced` 
				(`player`, `level`, `timestamp`, `number`, `x`, `y`)
			VALUES ($player_id, $lvl, $timestamp, $i, $xi, $yi)");
		}
		//echo $player_id;
		$reslt = mysqli_query($link, "SELECT `distance`, `benefit` FROM `scores-advanced` WHERE `player`=$player_id AND `level`=$lvl");
		$row1 = mysqli_fetch_row($reslt);
		$myLastDist = $row1[0];
		$myLastBene = $row1[1];
		//$objct = mysqli_fetch_object($reslt);
		//$myLastDist = $objct->distance;
		//$myLastBene = $objct->benefit;
		$minDis = min($myLastDist, $distance);
		$maxBen = max($myLastBene, $benefit);
		$myLastScore = ($myLastBene/$maxBen + $minDis/$myLastDist)*0.5;
		$curScore = ($benefit/$maxBen + $minDis/$distance)*0.5;
		
		if($curScore > $myLastScore){
			mysqli_query($link, "DELETE FROM `scores-advanced` WHERE `player`=$player_id AND `level`=$lvl");

			mysqli_query($link, "INSERT INTO `scores-advanced` (`player`, `level`, `timestamp`, `distance`, `benefit`, `score`) VALUES ($player_id, $lvl, $timestamp, $distance, $benefit, $curScore)") or die(mysqli_error($link));

			$minDis = mysqli_query($link, "SELECT MIN(`distance`) AS mind from `scores-advanced` where `level`=$lvl");
			$maxBen = mysqli_query($link, "SELECT MAX(`benefit`) AS maxb from `scores-advanced` where `level`=$lvl");


			$row1 = mysqli_fetch_row($minDis);
			$mind = $row1[0];
			$row1 = mysqli_fetch_row($maxBen);
			$maxb = $row1[0];

			$mbscr = ($benefit/$maxb + $mind/$distance)*0.5;
			$mcscr = $mbscr;

			mysqli_query($link, "UPDATE `scores-advanced` SET `score`=(`benefit`/$maxb + $mind/`distance`)*0.5 WHERE `level`=$lvl");
		}
		else
		{
			$query = mysqli_query($link, "SELECT `score` from `scores-advanced` where `level`=$lvl AND `player`=$player_id");


			$row1 = mysqli_fetch_row($query);
			$mbscr = $row1[0];

			$minDis = mysqli_query($link, "SELECT MIN(`distance`) AS mind from `scores-advanced` where `level`=$lvl");
			$maxBen = mysqli_query($link, "SELECT MAX(`benefit`) AS maxb from `scores-advanced` where `level`=$lvl");


			$row1 = mysqli_fetch_row($minDis);
			$mind = $row1[0];
			$row1 = mysqli_fetch_row($maxBen);
			$maxb = $row1[0];
			
			$mcscr = ($benefit/$maxb + $mind/$distance)*0.5;			
		}

		/*
		$sql3 = "SELECT MAX(`score`) AS bestScore FROM `scores-advanced` WHERE `level`=$lvl";
		$result3 = mysqli_query($link,$sql3);
		$obj = mysqli_fetch_object($result3);
		$bestScore = $obj->bestScore;

		$sql3 = "SELECT MIN(`distance`) AS mindistance FROM `scores-advanced` WHERE `level`=$lvl";
		$result3 = mysqli_query($link,$sql3);
		$obj = mysqli_fetch_object($result3);
		$minDistance = $obj->mindistance;

		$sql3 = "SELECT MAX(`benefit`) AS maxbenefit FROM `scores-advanced` WHERE `level`=$lvl";
		$result3 = mysqli_query($link,$sql3);
		$obj = mysqli_fetch_object($result3);
		$maxBenefit = $obj->maxbenefit;
		*/
		
		$sql1 = "SET @rownum := 0";
		$sql2 = "SELECT rank, score FROM (
					SELECT @rownum := @rownum + 1 AS rank, score, player, level
					FROM `scores-advanced` WHERE `level`=$lvl ORDER BY score DESC
					) as result where player=$player_id";
		include_once "init.php";

        mysqli_query($link, $sql1); /*as mysql_query function can execute one query at a time */
        $result = mysqli_query($link, $sql2);
        $rows = '';
        $data = array();
        if (!empty($result))
            $rows = mysqli_num_rows($result);
        else
            $rows = '';
 
        if (!empty($rows)){
            while ($rows = mysqli_fetch_assoc($result)){
                $data[]   = $rows;
            }
        }
        else{
        	$data[0]['rank']=10;
		}
        $sql3 = mysqli_query($link, "SELECT `score` FROM `scores-advanced` WHERE `level`=$lvl and `player`=$player_id");
        $obj = mysqli_fetch_row($sql3);
        $s = $obj[0];

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

		echo (string)$mcscr.",".(string)$mbscr.",".(string)$maxScore.",".(string)$bestPlayerName.",".(string)$data[0]['rank'];
	}
?>