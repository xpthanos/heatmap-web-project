<?php
include "config.php";
$sql = $conn->query("DELETE FROM records");
if($sql)
{
	echo("Deleted")
}
?>
