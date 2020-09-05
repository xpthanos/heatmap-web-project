<?php

$input = file_get_contents("test.json");
$test = json_decode($input,true);
$locations = $test["locations"];
for ($i=0; $i < sizeof($locations) ; $i++) { 
	$output[$i]["lat"] = $locations[$i]["latitudeE7"];
	$output[$i]["lng"] = $locations[$i]["longitudeE7"];
	$output[$i]["count"] = 1;
}

echo json_encode($output);

//var_dump($locations[0]['activity'][0]['activity'][0]['type']);
//var_dump($output);
?>
