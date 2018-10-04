<?php
	include 'init.php';
	session_start();

	if(isset($_POST['bst_score'], $_POST['bst_x'], $_POST['bst_y'])){
		
		//todo
		$lvl = $_POST['level'];
		$bst_score = $_POST['bst_score'];
		$bst_x = $_POST['bst_x'];
		$bst_y = $_POST['bst_y'];
		$bst_xs = explode(",", $bst_x);
		$bst_ys = explode(",", $bst_y);

		$player_id = $_SESSION['playerid'];
		mysqli_query($link, "DELETE FROM `facilities` WHERE `player`=$player_id AND `level`=$lvl");
		
		for($i = 0; $i < sizeof($bst_xs); $i++){
			$bstx = $bst_xs[$i];
			$bsty = $bst_ys[$i];			
			$result = mysqli_query($link, "INSERT INTO `facilities` 
				(`player`, `level`, `number`, `bestx`, `besty`)
			VALUES ($player_id, $lvl, $i, $bstx, $bsty)");
		}
		
		mysqli_query($link, "DELETE FROM `scores` WHERE `player`=$player_id AND `level`=$lvl");
		mysqli_query($link, "INSERT INTO `scores` VALUES ($player_id, $lvl, $bst_score)");

		$sql3 = "SELECT MIN(`bestscore`) AS minScore FROM `scores` WHERE `level`=$lvl";
		$result3 = mysqli_query($link,$sql3);
		$obj = mysqli_fetch_object($result3);
		$minScore = $obj->minScore;

	
		$sql1 = "SET @rownum := 0";
		$sql2 = "SELECT rank, bestscore FROM (
					SELECT @rownum := @rownum + 1 AS rank, bestscore, player, level
					FROM scores WHERE `level`=$lvl ORDER BY bestscore ASC
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

		echo (string)$minScore.",".(string)$data[0]['rank'];
	}
?>