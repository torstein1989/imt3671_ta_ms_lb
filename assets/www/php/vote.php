<?php
	include 'connection.php';

	$vote = 	$_POST['vote'];
	$vID = 		$_POST['vID'];
	
	try {
    $dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
    /*** echo a message saying we have connected ***/
    echo 'Connected to database<br />';

    /*** INSERT data ***/
    $count = $dbh->exec("INSERT INTO feedback_vote (vote, vID) VALUES ('$vote','$vID')");
   
    echo $count;

    /*** close the database connection ***/
    $dbh = null;
    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }
	
?>