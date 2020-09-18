<?php
$host = "localhost";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);

$result = array('error'=>false);
$name = $_POST['name'];
$pass = $_POST['pass'];
$email = $_POST['email'];
$randid = openssl_encrypt($email, "AES-128-CTR", $pass);
$type = 1;
$sql = $conn->query("INSERT INTO user (userid,username,password,email,type) VALUES('$randid','$name',MD5('$pass'), '$email', '$type')");
echo $sql;
if($sql)
{
$users = array();
while($row = $sql->fetch_assoc()){
array_push($users, $row);
}
$result['users'] = $users;
}

if($sql){
$result[ 'message'] = "User added successfully!";}

else{
$result['error'] = true;
$result['message'] = "Failed to add user!";
}

echo json_encode($result);
?>
