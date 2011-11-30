<?php
	require_once 'connection.php';
	
	$message = 	$_POST['message'];

	try {
		$dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    	/*** echo a message saying we have connected ***/
    	echo 'Connected to database<br />';

    	/*** INSERT data ***/
    	$count = $dbh->exec("INSERT INTO feedback_message (message) VALUES ('$message')");

    	/*** echo the number of affected rows ***/
    	echo $count;

    	/*** close the database connection ***/
    	$dbh = null;
    }
	
    catch(PDOException $e){
    	echo $e->getMessage();
    }
?>