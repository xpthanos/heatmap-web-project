<?php
include "config.php";

$userid = $_SESSION['userid'];
$usertype = $_SESSION['usertype'];
$output[] = array();
$all = 0;

//$input = json_decode(file_get_contents('php://input'),TRUE);
if(isset($userid) and isset($usertype)){
  #calculate records
  $sql = $conn->query("SELECT COUNT(*) as records FROM record WHERE NOT(activity_type='STILL') AND userid='$userid'");
  if($sql){
    $all = intval($sql->fetch_assoc()['records']);
  }
  if($all != 0){
    #calculate vehicle activities
    $sql = $conn->query("SELECT COUNT(*) as vehicle FROM record WHERE activity_type='IN_VEHICLE' AND userid='$userid'");
    if($sql){
      array_push($output, round(intval($sql->fetch_assoc()['vehicle'])*100/$all,2));
    }
    #calculate bike activities
    $sql = $conn->query("SELECT COUNT(*) as bike FROM record WHERE activity_type='ON_BICYCLE' AND userid='$userid'");
    if($sql){
      array_push($output, round(intval($sql->fetch_assoc()['bike'])*100/$all,2));
    }
    #calculate on foot activities
    $sql = $conn->query("SELECT COUNT(*) as foot FROM record WHERE (activity_type='ON_FOOT' OR activity_type='RUNNING' OR activity_type='WALKING') AND userid='$userid'");
    if($sql){
      array_push($output, round(intval($sql->fetch_assoc()['foot'])*100/$all,2));
    }
    $output = array_slice($output, 1);
  }
}
echo json_encode($output);
?>
