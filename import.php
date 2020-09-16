<?php

$host = "127.0.0.1";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);

function normalize($type)
{
	if ($type!="IN_VEHICLE" and $type!="ON_FOOT" and $type!="STILL" and $type!="TILTING" and $type!="ON_BICYCLE")
	{
		echo "<br>" . $type . "<br>";
		return "UNKNOWN";
	}
	return $type;
}

function inArea(int $lat, int $lng, $box = [382952000,217055000,382035000,217924000])
{		
	if ($lat > $box[0] || $lat < $box[2] || $lng < $box[1] || $lng > $box[3])
	{
		return false;	
	}
	return true;
}


$file = file_get_contents("med.json");
$input = json_decode($file,true);
$locations = $input["locations"];
$max_confidence = 1;
$k=1;
echo (int)inArea(0,0); // FALSE
echo (int)inArea(382434000,217310000); // TRUE
echo (int)inArea(382456000,219346000); // FALSE
echo (int)inArea(381473000,217361000); // FALSE
for ($i=0; $i < sizeof($locations) ; $i++) {
	
	$activity_type = $locations[$i]["activity"][0]["activity"][0]["type"];
	$latitude = intval($locations[$i]["latitudeE7"]);
	$longitude = intval($locations[$i]["longitudeE7"]);
	if($activity_type=="UNKNOWN" || is_null($activity_type) || !inArea($latitude,$longitude))
	{
		echo "0";
		continue;
	}
	$activity_type = normalize($activity_type);
	$record_timestamp = date("Y-m-d H:i:s",intval($locations[$i]["timestampMs"]/1000));
	$heading =  intval($locations[$i]["heading"]);
	$accuracy =  intval($locations[$i]["accuracy"]);
	$vertical_accuracy =  intval($locations[$i]["vertical_accuracy"]);
	$velocity =  intval($locations[$i]["velocity"]);
	$altitude =  intval($locations[$i]["altitude"]);
	$activity_timestamp = date("Y-m-d H:i:s",intval($locations[$i]['activity'][0]["timestampMs"]/1000));
	$activity_confidence =  intval($locations[$i]['activity'][0]['activity'][0]["confidence"]);

	$sql = $conn->query("INSERT INTO record(heading, activity_type, activity_confidence, activity_timestamp, vertical_accuracy, velocity, accuracy, longitude, latitude, altitude, record_timestamp, userid) VALUES ('$heading', '$activity_type', '$activity_confidence', '$activity_timestamp', '$vertical_accuracy', '$velocity', '$accuracy', '$longitude', '$latitude', '$altitude', '$record_timestamp', 9872)");

	if($sql){
		echo ".";
	}

	else{
		echo "<br> Error:  " . mysqli_error($conn) . "<br>";
	}
	$k++; 
}
?>