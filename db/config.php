<?php
session_start();
$host = "127.0.0.1";
$user = "root";
$password = "Take@DeepBreath";
$dbname = "userdata";

$conn = mysqli_connect($host, $user, $password,$dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
