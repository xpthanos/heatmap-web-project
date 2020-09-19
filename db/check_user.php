<?php
include "config.php";

$usertype = null;
if(isset($_SESSION['userid']) and isset($_SESSION['usertype'])){
  $usertype = $_SESSION['usertype'];
}

echo json_encode($usertype);
?>
