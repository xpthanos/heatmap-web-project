<?php
include "config.php";

$from = array
(
	"year" => null,
	"month" => null,
	"day" => null,
	"hour" => null
);

$to = array
(
	"year" => null,
	"month" => null,
	"day" => null,
	"hour" => null
);


$from["year"] = $_GET["from_year"];
$to["year"] = $_GET["to_year"];
$from["month"] = $_GET["from_month"];
$to["month"] = $_GET["to_month"];
$from["day"] = $_GET["from_day"];
$to["day"] = $_GET["to_day"];
$from["hour"] = $_GET["from_hour"];
$to["hour"] = $_GET["to_hour"];

$selected = $_GET["selected"];

foreach ($to as $k => &$v) {
	if($v == null)
	{
		if($k=="year")
		{
			if($from["year"]!=null)
			{
				$v=$from["year"];
			}
			else
			{
				$v = date("Y",strtotime("+1 year"));
			}
		}
		if($k=="month")
		{
			if($from["month"]!=null)
			{
				$v=$from["month"];
			}
			else
			{
				$v = 12;
			}
		}
		if($k=="day")
		{
			if($from["day"]!=null)
			{
				$v = $from["day"];
			}
			else
			{
				$v = 6;
			}
			//$v = cal_days_in_month(CAL_GREGORIAN, $to["month"], $to["year"]);
		}
		if($k=="hour")
		{
			$v = 23;
		}
	}
}

foreach ($from as $k => &$v) {
	if($v == null)
	{
		if($k=="year")
		{
			$v = "1980";
		}
		if($k=="month")
		{
			$v = 1;
		}
		if($k=='day')
		{
			$v = 0;
		}
		if($k=="hour")
		{
			$v = 0;
		}
	}
}

/* DEBUGGING BLOCK

$filter= array
(
	"from" => null,
	"to" => null
);

$filter["from"] = $from["year"]."-".$from["month"]."-".$from["day"]." ".$from["hour"].":00";
echo $filter["from"]."\n";
$filter["to"] = $to["year"]."-".$to["month"]."-".$to["day"]." ".$to["hour"].":59";
echo $filter["to"];
*/

$sql = $conn->query("SELECT latitude, longitude FROM record where YEAR(activity_timestamp) >= '".$from["year"]."' AND YEAR(activity_timestamp) <= '".$to["year"]."' AND MONTH(activity_timestamp) >= '".$from["month"]."' AND MONTH(activity_timestamp) <= '".$to["month"]."' AND WEEKDAY(activity_timestamp) >= '".$from["day"]."' AND WEEKDAY(activity_timestamp) <='" .$to["day"]."' AND HOUR(activity_timestamp) >='".$from["hour"]."' AND HOUR(activity_timestamp) <='".$to["hour"]."' AND activity_type IN ('". implode( '\',\'', $selected)."')");
// OLD MEMORIES // $sql = $conn->query("SELECT latitude, longitude FROM record where activity_timestamp > '".$filter["from"]."' AND activity_timestamp < '".$filter["to"]."'");
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
else
  {
  	echo mysqli_error($conn);
  }
echo json_encode($output);
?>
