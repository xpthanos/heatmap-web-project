<?php
include "config.php";

$input = json_decode(file_get_contents('php://input'),TRUE);
$name = $input['name'];
$email = $input['email'];
$password = $input['password'];
$userid = openssl_encrypt($email, "AES-128-CTR", $password,0, openssl_random_pseudo_bytes(16));
$type = 'user';

$sql = $conn->query("INSERT INTO user (userid,username,password,email,type) VALUES('$userid','$name',MD5('$password'), '$email', '$type')");
if($sql){
	echo 'ok';
}
else{
	echo mysqli_error($conn);
}
?>
