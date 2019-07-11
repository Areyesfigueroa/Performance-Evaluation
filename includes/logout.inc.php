<?php

session_start(); //in order to end the session we need to start it. 
session_unset(); //This will delete all the session variables.
session_destroy(); //Destroy the current session within the main site. 


//Redirect user to the lookup page. 
header("Location: ../LoginSystem/lookup.php?logout=successful");
exit();

?>