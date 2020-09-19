<?php
include "config.php";

$input = json_decode(file_get_contents('php://input'),TRUE);
$email = $input['email'];
$password = $input['password'];
$sql = $conn->query("SELECT userid,type FROM user WHERE email='$email' AND password=MD5('$password')");
if($sql){
  $result = $sql->fetch_assoc();
  $_SESSION['userid']=$result['userid'];
  $_SESSION['usertype']=$result['type'];
}
echo json_encode($result);
?>
