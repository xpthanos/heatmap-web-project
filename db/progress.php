<?php
include "config.php";

$vehicle_scores[] = array();
$physical_scores[] = array();
$scores[] = array();
$userid = $_SESSION['userid'];
$usertype = $_SESSION['usertype'];

$input = json_decode(file_get_contents('php://input'),TRUE);

if(isset($userid) and isset($usertype)){
  #//calculate score for each month
  for ($k=1; $k<13; $k++){
    //set month range for data
    $start_date = date('Y-m-d H:i:s', strtotime($input['curr_year']."-".$k."-1"));
    $end_date = date('Y-m-d H:i:s', strtotime($input['curr_year']."-".$k."-".(cal_days_in_month(CAL_GREGORIAN, $k, intval($input['curr_year']))-1)));
    //get count of user records with vehicle activity in the specific month
    $sql = $conn->query("SELECT COUNT(*) as vscore FROM record WHERE activity_type='IN_VEHICLE' AND activity_timestamp>'$start_date' AND activity_timestamp<'$end_date' AND userid='$userid'");
    if($sql){
      while($row = $sql->fetch_assoc()) {
        array_push($vehicle_scores, $row['vscore']);
      }
    }
    //get count of user records with physical activity in the last month
    $sql = $conn->query("SELECT COUNT(*) as pscore FROM record WHERE (activity_type='ON_BICYCLE' OR activity_type='ON_FOOT' OR activity_type='RUNNING' OR activity_type='WALKING') AND activity_timestamp>'$start_date' AND activity_timestamp<'$end_date' AND userid='$userid'");
    if($sql){
      while($row = $sql->fetch_assoc()) {
        array_push($physical_scores, $row['pscore']);
      }
    }
    //calculate scores
    for ($i=0; $i <sizeof($vehicle_scores)-1; $i++) {
      if(intval($vehicle_scores[$i+1])==0 and intval($physical_scores[$i+1])==0){
        $scores[$i] = 0;
      }
      else{
        $scores[$i] = intval(intval($physical_scores[$i+1]) * 100 / (intval($vehicle_scores[$i+1])+intval($physical_scores[$i+1])));
      }
    }
  }
}

echo json_encode($scores);
?>
