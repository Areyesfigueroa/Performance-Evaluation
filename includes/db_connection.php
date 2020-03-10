<?php

function OpenCon()
{
    $dbhost = "us-cdbr-iron-east-04.cleardb.net";
    $dbuser = "b7a21ff66261c4";
    $dbpass = "9fd05532"; // *^59MVqs#1c8, Workbench DB Password, XAMPP = "".
    $db = "heroku_47446b38f6e78f3";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn ->error);

    return $conn;
}

function CloseCon($conn){
    $conn -> close();
}

?>