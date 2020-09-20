<?php
include "config.php";
$sql = $conn->query("DELETE FROM record");
if($sql)
{
	echo("Deleted");
}
?>
