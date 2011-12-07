<?php
	require_once 'connection.php';

	$statSlide 		= $_POST['statSlide'];
	$statUrl 		= $_POST['statUrl'];
	$statVote 		= $_POST['statVote'];
	$statVoteCount 	= $_POST['statVoteCount'];
	$statMood 		= $_POST['statMood'];
	$statMoodColor 	= $_POST['statMoodColor'];
	$statDifficulty = $_POST['statDifficulty'];
	
	try {
		$dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    	/*** echo a message saying we have connected ***/
    	echo 'Connected to database<br />';

    	/*** INSERT data ***/
    	$count = $dbh->exec("INSERT INTO feedback_stat (statSlide,statUrl,statVote,statVoteCount,statMood,statMoodColor,statDifficulty) VALUES ('$statSlide','$statUrl','$statVote','$statVoteCount','$statMood','$statMoodColor','$statDifficulty')");

    	/*** echo the number of affected rows ***/
    	echo $count;

    	/*** close the database connection ***/
    	$dbh = null;
    }
	
    catch(PDOException $e){
    	echo $e->getMessage();
    }
?>