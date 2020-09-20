<?php
include "config.php";

//$input = json_decode(file_get_contents('php://input'),TRUE);
//$start_date = date('Y-m-d H:i:s', strtotime($input['curr_year']."-".$input['last_month']."-1"));
//$end_date = date('Y-m-d H:i:s', strtotime($input['curr_year']."-".$input['last_month']."-".(cal_days_in_month(CAL_GREGORIAN, $input['last_month'], intval($input['curr_year']))-1)));
$start_date = date('Y-m-d H:i:s', strtotime("2018-2-1")); // for testing
$end_date = date('Y-m-d H:i:s', strtotime("2018-2-30")); // for testing

$usernames[] = array();
$userids[] = array();
$vehicle_scores[] = array();
$physical_scores[] = array();
$scores[] = array();
$ranked_users[] = array();
$leaderboard[] = array();

$userid = $_SESSION['userid'];
$usertype = $_SESSION['usertype'];

if(isset($userid) and isset($usertype)){

  //get usernames
  $sql = $conn->query("SELECT DISTINCT username,user.userid as user_id FROM user INNER JOIN record on user.userid=record.userid WHERE activity_timestamp>='$start_date' AND activity_timestamp<='$end_date'");
  if($sql){
    while($row = $sql->fetch_assoc()) {
      preg_match ( '/.+[\s]./u' , $row['username'], $matches);
    	array_push($usernames, $matches[0].".");
      array_push($userids, $row['user_id']);
    }
  }
  $usernames = array_slice($usernames, 1);
  $userids = array_slice($userids, 1);
  //get count of user records with vehicle activity in the last month
  $sql = $conn->query("SELECT COUNT(*) as vscore FROM record WHERE activity_type='IN_VEHICLE' AND activity_timestamp>='$start_date' AND activity_timestamp<='$end_date' GROUP BY userid");
  if($sql){
    while($row = $sql->fetch_assoc()) {
    	array_push($vehicle_scores, $row['vscore']);
    }
  }
  //get count of user records with physical activity in the last month
  $sql = $conn->query("SELECT COUNT(*) as pscore FROM record WHERE (activity_type='ON_BICYCLE' OR activity_type='ON_FOOT' OR activity_type='RUNNING' OR activity_type='WALKING') AND activity_timestamp>='$start_date' AND activity_timestamp<='$end_date' GROUP BY userid");
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
  //find user rank and rank users
  array_multisort($scores,$usernames,$userids);
  $scores = array_reverse($scores);

  $usernames = array_reverse($usernames);
  $userids = array_reverse($userids);
  foreach ($userids as $key => $val){
    if($userid == $val){
      $curr_user['rank']=$key+1;
      $curr_user['name']=$usernames[$key];
      $curr_user['score']=$scores[$key];
      $curr_user['_rowVariant']='primary';
    }
    if($key<3){
      $other_user['rank']=$key+1;
      $other_user['name']=$usernames[$key];
      $other_user['score']=$scores[$key];
      array_push($leaderboard,$other_user);
    }
  }
  array_push($leaderboard,$curr_user);
  $leaderboard = array_slice($leaderboard, 1);
}
?>
