<?php
include "config.php";

$userid = $_SESSION['userid'];
$usertype = $_SESSION['usertype'];

$output[] = array();

$input = json_decode(file_get_contents('php://input'),TRUE);
$activity = $input['activity'];

if(isset($userid) and isset($usertype)){
  //calculate records for every day
  for ($i=1; $i<8; $i++){
    //get count of user records
    $sql = $conn->query("SELECT COUNT(*) as records FROM record WHERE DAYOFWEEK(activity_timestamp)='$i' AND activity_type='$activity' AND userid='$userid'");
    if($sql){
        array_push($output, intval($sql->fetch_assoc()['records']));
    }
  }
}
$output = array_slice($output, 1);

#shift array left
$first_element = array_shift($output);
array_push($output,$first_element);

echo json_encode($output);
?>
