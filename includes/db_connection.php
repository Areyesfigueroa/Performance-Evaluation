<?php

function OpenCon()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = ""; // *^59MVqs#1c8, Workbench DB Password.
    $db = "mydatabase";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn ->error);

    return $conn;
}

function CloseCon($conn){
    $conn -> close();
}

?>