<?php
require_once 'connection.php';
	
	try {
	    $dbh = new PDO("$dbtype:host=$host;dbname=$dbname", $user, $pass);
	    /*** echo a message saying we have connected ***/
	    //echo 'Connected to database<br />'; //remove for debug
	
	    /*** The SQL SELECT statement ***/
	    $sql = 'SELECT * FROM `feedback_mood` ORDER BY `feedback_mood`.`mID` DESC LIMIT 0, 10 ';
	    
	    /*** fetch into an PDOStatement object ***/
	    $stmt = $dbh->query($sql);
	
	    /*** echo number of columns ***/
	    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
	    /*** loop over the object directly (not used here) ***/
	    foreach($result as $key=>$val)
	    {
		    //echo json_encode($result);
	    }
	    
	    echo json_encode($result);//prints out the json array, multidimentional
	    
	    /*** close the database connection ***/
	    $dbh = null;
	}
	
	catch(PDOException $e){
		echo $e->getMessage();
    }

?>