<?php
	require_once 'connection.php';
	
	$qID = 		$_POST['qID'];
	$qID2 = 	$_POST['qID2'];

	try {
		$dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    	/*** echo a message saying we have connected ***/
    	echo 'Connected to database<br />';

    	/*** INSERT data ***/
    	if($qID2){
    		$count = $dbh->exec("UPDATE feedback_qvote SET nowVoting='no' WHERE qID='$qID'");
    	}
    	else {
    		$count = $dbh->exec("UPDATE feedback_qvote SET nowVoting='no'");
    		$count = $dbh->exec("UPDATE feedback_qvote SET nowVoting='yes' WHERE qID='$qID'");
    	}
	
	    /*** echo the number of affected rows ***/
	    echo $count;
	
	    /*** close the database connection ***/
	    $dbh = null;
    	}
	
    catch(PDOException $e){
    	echo $e->getMessage();
    }
?>