<?php

//TODO: Have more checkups to increase password security.
//TODO: Some of the new fields will need some validation to make sure they are the correct data. 

//Make sure the user presses the submit button. 
if(isset($_POST['signup-submit']))
{
    require 'db_connection.php';

    $mailuid = $_POST['mailuid'];
    $password = $_POST['pwd'];
    $confirmPassword = $_POST['confirmpwd'];
    $name = $_POST['name']; //Needs check
    $position = $_POST['position']; //Needs Check
    $role = $_POST['role']; //Needs Check
    
    //Make sure to error check.
    if(empty($mailuid) || empty($password) || empty($confirmPassword))
    {
        header("Location: ../admin.php?error=emptyfields");
        exit();
    }
    else if(!filter_var($mailuid, FILTER_VALIDATE_EMAIL))
    {
        header("Location: ../admin.php?error=invalidmail");
        exit();
    }
    else if($password !== $confirmPassword) //validate password
    {
        header("Location: ../admin.php?error=passwordcheck&mailuid=".$mailuid);
        exit();
    } 
    else
    {
        $sql = "SELECT employee_email FROM employees WHERE employee_email=?;";
        
        $conn = OpenCon();
        $stmt = mysqli_stmt_init($conn);

        //Verify the statement works with our query.
        if(!mysqli_stmt_prepare($stmt, $sql))
        {
            header("Location: ../admin.php?error=sqlerror");
            exit();
        }
        else 
        {
            //SQL Statement successful.
            mysqli_stmt_bind_param($stmt, 's', $mailuid); //bind
            mysqli_stmt_execute($stmt);//execute
            mysqli_stmt_store_result($stmt); //store result object
            $resultCheck = mysqli_stmt_num_rows($stmt); //get the number of rows from the result object

            if($resultCheck > 0)
            {
                //We have a match redirect
                header("Location: ../admin.php?error=usertaken&mailuid=".$mailuid);
                exit();
            }
            else
            {
                //User does not exist. Add to database.
                $sql = "INSERT INTO employees(employee_email, employee_name, employee_password, employee_position, employee_role) 
                VALUES(?, ?, ?, ?, ?);";

                //Prepare statement
                $stmt = mysqli_stmt_init($conn);

                if(!mysqli_stmt_prepare($stmt, $sql))
                {
                    header("Location: ../admin.php?error=sqlerror");
                    exit();
                }
                else
                {
                    //Hash Password
                    $hashed_pwd = password_hash($password, PASSWORD_DEFAULT);

                    //Bind and Execute.
                    //SQL Statement successful.
                    mysqli_stmt_bind_param($stmt, 'sssss', $mailuid, $name, $hashed_pwd, $position, $role); //bind
                    mysqli_stmt_execute($stmt);//execute

                    //Update Session Data with new user.
                    session_start();
                    array_push($_SESSION['allUsers'], [$_POST['name'], $_POST['mailuid'], $_POST['role']]);

                    header("Location: ../admin.php?signup=success");
                    exit();
                }
            }
        }
    }
    //Close connection and statement.
    mysqli_stmt_close($stmt);
    CloseCon($conn);
}
else
{
    header("Location: ../admin.php");
    exit();
}

?>