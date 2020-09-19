<?php
include "config.php";

$userid = $_SESSION['userid'];
$usertype = $_SESSION['usertype'];
if(isset($userid) and isset($usertype)){
  if($_SESSION['usertype']=='user'){
    //get username
    $sql = $conn->query("SELECT username FROM user WHERE userid='$userid'");
    if($sql){
      $output['username'] = $sql->fetch_assoc()['username'];
    }
    //get earliest activity timestamp
    $sql = $conn->query("SELECT MIN(activity_timestamp) as data_start FROM record WHERE userid='$userid'");
    if($sql){
      $output['data_start'] = date('Y-m-d',strtotime($sql->fetch_assoc()['data_start']));
    }
    //get latest activity timestamp
    $sql = $conn->query("SELECT MAX(activity_timestamp) as data_end FROM record WHERE userid='$userid'");
    if($sql){
      $output['data_end'] = date('Y-m-d',strtotime($sql->fetch_assoc()['data_end']));
    }
    //get latest record timestamp
    $sql = $conn->query("SELECT MAX(record_timestamp) as last_upload FROM record WHERE userid='$userid'");
    if($sql){
      $output['last_upload'] = date('Y-m-d',strtotime($sql->fetch_assoc()['last_upload']));
    }
    //get count of user records with physical activity
    $sql = $conn->query("SELECT COUNT(*) as physical FROM record WHERE userid='$userid' AND (activity_type='ON_BICYCLE' OR activity_type='ON_FOOT' OR activity_type='RUNNING' OR activity_type='WALKING')");
    if($sql){
      $physical = $sql->fetch_assoc()['physical'];
    }
    //get count of user records with vehicle activity
    $sql = $conn->query("SELECT COUNT(*) as vehicle FROM record WHERE userid='$userid' AND activity_type='IN_VEHICLE'");
    if($sql){
      $vehicle = $sql->fetch_assoc()['vehicle'];
    }
    //calculate score
    if(intval($vehicle)==0){
      $output['score'] = 100;
    }
    else{
      $output['score'] = intval(intval($physical) * 100 / intval($vehicle));
    }
    echo json_encode($output);
  }
}
?>
