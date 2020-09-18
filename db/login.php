<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);
$input = json_decode(file_get_contents('php://input'),TRUE);
$email = $input['email'];
$password = $input['password'];
$sql = $conn->query("SELECT userid,type FROM user WHERE email='$email' AND password='$password'");
if($sql){
  $result = $sql->fetch_assoc();
}
echo json_encode($result);
?>
