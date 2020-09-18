<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);
$input = json_decode(file_get_contents('php://input'),TRUE);
$userid = rand(1,100000);
$name = $input['name'];
$email = $input['email'];
$password = $input['password'];
$type = 'user';

$sql = $conn->query("INSERT INTO user (userid,username,password,email,type) VALUES('$userid','$name','$password', '$email', '$type')");

echo json_encode($sql);
?>
