<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);
$sql = $conn->query("SELECT latitude, longitude FROM record");
$coordinates[] = array();
if ($sql->num_rows > 0) {
  // output data of each row
  while($row = $sql->fetch_assoc()) {
  	array_push($coordinates, $row);
  }
  for ($i=0; $i <sizeof($coordinates)-1; $i++) {
  	$output[$i]["lng"]= $coordinates[$i+1]["longitude"]/10000000;
  	$output[$i]["lat"]= $coordinates[$i+1]["latitude"]/10000000;
  	$output[$i]["count"] = 1;
  }
}
echo json_encode($output);
?>
