<?php

function OpenCon()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "tUtYmttgIapLF8CJ"; // *^59MVqs#1c8, Workbench DB Password, XAMPP = "".
    $db = "performance_evaluation";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn ->error);

    return $conn;
}

function CloseCon($conn){
    $conn -> close();
}

?>