<?php
$host = "localhost";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);
if(conn->connect_error)
{
	die("Connection failed!".$conn->connect_error);
}
echo("Success")


?>