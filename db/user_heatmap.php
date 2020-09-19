<?php
include "config.php";

$sql = $conn->query("SELECT latitude, longitude FROM record WHERE userid = $_SESSION['userid']");
$coordinates[] = array();
if ($sql->num_rows > 0) {
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
