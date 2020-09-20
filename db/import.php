<?php
define("max_distanceE7",1132437);
define("centerE7",[382304620,217531500]);
require("../lib/JSON-Machine/JsonMachine.php");
require("../lib/JSON-Machine/Lexer.php");
require("../lib/JSON-Machine/Parser.php");
require("../lib/JSON-Machine/functions.php");
require("../lib/JSON-Machine/StreamBytes.php");
require("../lib/JSON-Machine/JsonDecoder/Decoder.php");
require("../lib/JSON-Machine/JsonDecoder/DecodingResult.php");
require("../lib/JSON-Machine/JsonDecoder/JsonDecodingTrait.php");
require("../lib/JSON-Machine/JsonDecoder/ExtJsonDecoder.php");
require("../lib/JSON-Machine/JsonDecoder/PassThruDecoder.php");

require("../lib/JSON-Machine/StringBytes.php");
require("../lib/JSON-Machine/Exception/SyntaxError.php");
include "config.php";

function normalize($type)
{
	if ($type!="IN_VEHICLE" and $type!="ON_FOOT" and $type!="STILL" and $type!="ON_BICYCLE" and $type!="RUNNING" and $type!="WALKING")
	{
		//echo "<br>" . $type . "<br>";
		return "STILL";
	}
	return $type;
}

function constrainArea(int $lat, int $lng, $box)
{
	if ($lat > $box[0] || $lat < $box[2] || $lng < $box[1] || $lng > $box[3])
	{
		return false;
	}
	return true;
}

function inArea(int $latE7, int $lngE7)
{
	$x = $latE7-centerE7[0];
	$y = $lngE7-centerE7[1];
	if(sqrt(pow($x,2)+pow($y,2))>max_distanceE7)
	{
		return false;
	}
	return true;
}

$ds = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = 'uploads';   //2
if(!empty($_FILES)) {
    $tempFile = $_FILES['file']['tmp_name'];
     $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4   
    $targetFile =  $targetPath. "new_file.json";  //5
 
    move_uploaded_file($tempFile,$targetFile); //6
}
	$jsonStream = \JsonMachine\JsonMachine::fromFile("uploads/new_file.json","/locations");
foreach ($jsonStream as $name => $data) {
	$activity_type = $data["activity"][0]["activity"][0]["type"];
	$latitude = intval($data["latitudeE7"]);
	$longitude = intval($data["longitudeE7"]);
	if($activity_type=="UNKNOWN" || is_null($activity_type) || !inArea($latitude,$longitude))
	{
		echo "0";
		continue;
	}
	$activity_type = normalize($activity_type);
	$record_timestamp = intval($data["timestampMs"]);
	$heading =  intval($data["heading"]);
	$accuracy =  intval($data["accuracy"]);
	$vertical_accuracy =  intval($data["vertical_accuracy"]);
	$velocity =  intval($data["velocity"]);
	$altitude =  intval($data["altitude"]);
	$activity_timestamp = intval($data['activity'][0]["timestampMs"]);
	$activity_confidence =  intval($data['activity'][0]['activity'][0]["confidence"]);

	$sql = $conn->query("INSERT INTO record(heading, activity_type, activity_confidence, activity_timestamp, vertical_accuracy, velocity, accuracy, longitude, latitude, altitude, record_timestamp, userid) VALUES ('$heading', '$activity_type', '$activity_confidence', FROM_UNIXTIME(0.001 * '$activity_timestamp'), '$vertical_accuracy', '$velocity', '$accuracy', '$longitude', '$latitude', '$altitude', FROM_UNIXTIME(0.001 * '$record_timestamp'), 0)");

	if($sql){
		echo ".";
	}

	else{
		echo "<br> Error:  " . mysqli_error($conn) . "<br>";
	}
	$k++;
}
?>
