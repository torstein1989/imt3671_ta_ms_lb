<?php
include 'connection.php';
mysql_connect($host,$user,$pass);
mysql_select_db($dbname);
 
$q=mysql_query("SELECT * FROM feedback_qvote ORDER BY qID DESC LIMIT 1");
while($e=mysql_fetch_assoc($q))
        $output[]=$e;
 
print(json_encode($output));
 
mysql_close();
?>