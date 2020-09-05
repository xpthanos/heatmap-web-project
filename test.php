<?php

$input = file_get_contents("test.json");
$test = json_decode($input,true);
$locations = $test["locations"];
$max_confidence = 1;
for ($i=0; $i < sizeof($locations) ; $i++) { 
	$output[$i]["lat"] = $locations[$i]["latitudeE7"]/10000000;
	$output[$i]["lng"] = $locations[$i]["longitudeE7"]/10000000;
	$output[$i]["count"] = 1;
	if ($locations[$i][]) {
		# code...
	}

}

echo json_encode($output);

//var_dump($locations[0]['activity'][0]['activity'][0]['type']);
//var_dump($output);
?>
