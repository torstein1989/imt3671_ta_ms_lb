<?php
	require_once 'connection.php';

	$question= 	$_POST['question'];
	$qA = 		$_POST['qA'];
	$qB = 		$_POST['qB'];
	$qC = 		$_POST['qC'];
	$qD = 		$_POST['qD'];
	
	try {
		$dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    	/*** echo a message saying we have connected ***/
    	echo 'Connected to database<br />';

    	/*** INSERT data ***/
    	$count = $dbh->exec("INSERT INTO feedback_qvote (question,qA,qB,qC,qD) VALUES ('$question','$qA','$qB','$qC','$qD')");

    	/*** echo the number of affected rows ***/
    	echo $count;

    	/*** close the database connection ***/
    	$dbh = null;
    }
	
    catch(PDOException $e){
    	echo $e->getMessage();
    }
?>