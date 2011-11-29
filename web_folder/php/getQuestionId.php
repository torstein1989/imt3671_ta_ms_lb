<?php
require_once 'connection.php';
	
	try {
	    $dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
	    /*** echo a message saying we have connected ***/
	    //echo 'Connected to database<br />'; //remove for debug
	
	    /*** The SQL SELECT statement ***/
	    $sql = "SELECT * FROM feedback_qvote WHERE nowVoting='yes' ";
	    foreach ($dbh->query($sql) as $row)
	        {
	        	echo json_encode($row);
	        }
	
	    /*** close the database connection ***/
	    $dbh = null;
	}
	
	catch(PDOException $e){
		echo $e->getMessage();
    }

?>