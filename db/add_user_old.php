<?php
$host = "127.0.0.1";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);

$result = array('error'=>false);
$action = '';
if(isset($_GET['action']))
{
$action = $_GET['action'];
}

if($action == 'read'){
$sql = $conn->query("SELECT * FROM user");
$users = array();
while($row = $sql->fetch_assoc())
{
array_push($users, $row);
}
$result['user'] = $users;
}
if($action == 'create'){
$randid = rand(1,100000);
$type = 'user';
$sql = $conn->query("INSERT INTO user (userid,username,password,email,type) VALUES('$randid',$name','$pass', '$email', $type)");
$name = $_POST['name'];
$pass = $_POST['pass'];
$email = $_POST['email'];
$users = array();
while($row = $sql->fetch_assoc()){
array_push($users, $row);
}
$result['users'] = $users;


if($sql){
$result[ 'message'] = "User added successfully!";}

else{
$result['error'] = true;
$result['message'] = "Failed to add user!";
}
}
echo json_encode($result);
?>