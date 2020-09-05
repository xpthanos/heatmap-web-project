<?php
$host = "127.0.0.1";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password, $dbname);

$sql = $conn->query("SELECT activity_type,COUNT(*) as count 
FROM userdata 
GROUP BY activity_type 
ORDER BY count DESC;");
echo $sql;

// run SQL statement
$result = mysqli_query($conn,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
	echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
}

?>