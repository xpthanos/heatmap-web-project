<?php
include "config.php";

if(isset($_SESSION['userid'] and isset($SESSION['usertype'])){
  if($_SESSION['usertype']=='user'){
    //get username
    $sql = $conc->query("SELECT name,lastname FROM user WHERE userid='$userid'");
    if($sql){
      $output['username'] = $sql->fetch_assoc();
    }
    //get earliest activity timestamp
    $sql = $conc->query("SELECT MIN(activity_timestamp) FROM record WHERE userid='$userid'");
    if($sql){
      $output['data_start'] = $sql->fetch_assoc();
    }
    //get latest activity timestamp
    $sql = $conc->query("SELECT MAX(activity_timestamp) FROM record WHERE userid='$userid'");
    if($sql){
      $output['data_end'] = $sql->fetch_assoc();
    }
    //get latest record timestamp
    $sql = $conc->query("SELECT MAX(record_timestamp) FROM record WHERE userid='$userid'");
    if($sql){
      $output['last_upload'] = $sql->fetch_assoc();
    }
    //get count of user records with physical acticity
    $sql = $conc->query("SELECT COUNT(*) FROM record WHERE userid='$userid' AND (activity_type='ON_BICYCLE' OR activity_type='ON_FOOT' OR activity_type='RUNNING' OR activity_type='WALKING')");
    if($sql){
      $physical = $sql->fetch_assoc();
    }
    //get count of user records with vehicle acticity
    $sql = $conc->query("SELECT COUNT(*) FROM record WHERE userid='$userid' AND activity_type='IN_VEHICLE'");
    if($sql){
      $vehicle = $sql->fetch_assoc();
    }
    //calculate score
    $output['score'] = $physical / $vehicle

    echo json_encode($output);
  }
}

echo json_encode($result);
?>
