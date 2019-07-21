<?php

//TODO: Check if this is the user's first time logging in. That way the password can be reset when doing this the first time.


if(isset($_POST['continue-submit']))
{

    require 'db_connection.php';

    $email=$_POST['mailuid'];

    //Error Handlers

    //If the field is empty.
    if(empty($email))
    {
        header("Location: ../LoginSystem/lookup.php?error=emptyfields&mailuid=".$email);
        exit();
    }
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) //If email is not validated as email.
    {
        header("Location: ../LoginSystem/lookup.php?error=invalidmail");
        exit();
    }
    else 
    {
        //Query must be ran within the database by using a statement.
        $sql = "SELECT employee_email FROM employees WHERE employee_email=?;";

        $conn = OpenCon(); //Establish SQL Connection
        $stmt = mysqli_stmt_init($conn); //Initialize statement, statment allows for queries to run within the database.
        
        //TEST:
        //echo $conn;

        //If statement failed.
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../LoginSystem/lookup.php?error=sqlerror");
            exit();
        }
        else {
            //Statement Successful, bind statement with query.
            mysqli_stmt_bind_param($stmt, "s", $email); //bind statement with the variable we want to use. 
            mysqli_stmt_execute($stmt); //Execute the statement.
            mysqli_stmt_store_result($stmt); //Store the result within statement variable.
            $resultCheck = mysqli_stmt_num_rows($stmt); //get the result in row format. Should be one row only.

            //TODO: Check if this is the user's first time logging in. That way the password can be reset when doing this the first time.
            //Check that there is only one user with that email in the database.
            if($resultCheck !== 1){
                //User is not in the system.
                header("Location: ../LoginSystem/lookup.php?error=invaliduser&mailuid=".$email);
                exit();
            }
            else if($resultCheck === 1){
                //User found. Send to login credentials.
                header("Location: ../LoginSystem/login.php?lookup=success&mailuid=".$email);
                exit();
            }
            else {
                //Unknown error occured.
                header("Location: ../LoginSystem/lookup.php?error=unknown&mailuid=".$email);
                exit();
            }
        }
    }

    mysqli_stmt_close($stmt); //close statement manually to save on resources.
    CloseCon($conn);

}
else 
{
    //User is not login in using the form.
    header("Location: ../LoginSystem/lookup.php");
    exit();
}
?>