<?php
	include 'connection.php';

	$vote1 = 	$_POST['vote1'];
	$vote2 = 	$_POST['vote2']; 
	$vote3 = 	$_POST['vote3']; 
	
	try {
    $dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    /*** echo a message saying we have connected ***/
    echo 'Connected to database<br />';

    /*** INSERT data ***/
    $count = $dbh->exec("INSERT INTO vote_feedback (vID,vote) VALUES ('10','$vote1')");
   
    echo $count;

    /*** close the database connection ***/
    $dbh = null;
    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }
	
?>