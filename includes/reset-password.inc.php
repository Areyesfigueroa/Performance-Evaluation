<?php

    //TODO: Change the header for it to go to create-new-password but insert the tokens within the url.

    if(isset($_POST["reset-password-submit"]))
    {
        //Get Data
        $selector = $_POST['selector'];
        $validator = $_POST['validator'];
        $password = $_POST['pwd'];
        $passwordRepeat = $_POST['pwd-repeat'];

        //Password Error Handlers. 
        if(empty($password) || empty($passwordRepeat))
        {
            header("Location: ../LoginSystem/lookup.php?newpwd=empty");
            exit();
        }
        else if($password != $passwordRepeat)
        {
            header("Location: ../LoginSystem/lookup.php?newpwd=pwdnotsame");
            exit();
        }

        //Check for token expiration date. 
        $currentDate = date("U"); 

        //DB Connection
        require "db_connection.php";

        $sql = "SELECT * FROM pwdreset WHERE pwdResetSelector=? AND pwdResetExpires>=?;";

        $conn = OpenCon();
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql))
        {
            echo "Error during sql stamement 1";
            exit();
        }        
        else
        {
            //Success
            mysqli_stmt_bind_param($stmt, 'ss', $selector, $currentDate);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            if(!$row = mysqli_fetch_assoc($result))
            {
                //No rows where returned.
                echo "You need to re-submit your reset request";
                exit();
            }
            else
            {
                //We have rows from the DB.
                $tokenBin = hex2bin($validator); 
                $tokenCheck = password_verify($tokenBin, $row["pwdResetToken"]);

                if($tokenCheck === false)
                {
                    echo "You need to re-submit your reset request";
                    exit();
                }
                else if($tokenCheck === true)
                {
                    //We have the correct token get user email to use on the employees db
                    $tokenEmail = $row['pwdResetEmail'];

                    $sql = "SELECT * FROM employees WHERE employee_email=?;";

                    $conn = OpenCon();
                    $stmt = mysqli_stmt_init($conn);
                    if(!mysqli_stmt_prepare($stmt, $sql))
                    {
                        echo "Error during sql statement 2";
                        exit();
                    }
                    else
                    {
                        //Success
                        mysqli_stmt_bind_param($stmt, 's', $tokenEmail);
                        mysqli_stmt_execute($stmt);

                        $result = mysqli_stmt_get_result($stmt);
                        if(!$row = mysqli_fetch_assoc($result))
                        {
                            echo "There was a sql error on the tokenEmail() statement";
                            exit();
                        }
                        else 
                        {
                            //Update user info inside the Employee's table.
                            $sql = "UPDATE employees SET employee_password=? WHERE employee_email=?;";

                            $conn = OpenCon();
                            $stmt = mysqli_stmt_init($conn);
                            if(!mysqli_stmt_prepare($stmt, $sql))
                            {
                                echo "Error during sql stamement 3";
                                exit();
                            }
                            else
                            {
                                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                                //Success
                                mysqli_stmt_bind_param($stmt, 'ss', $hashedPassword, $tokenEmail);
                                mysqli_stmt_execute($stmt);

                                //Delete the user's information within the ResetPassword once they have reset their password.
                                $sql = "DELETE FROM pwdreset WHERE pwdResetEmail=?;";

                                $conn = OpenCon();
                                $stmt = mysqli_stmt_init($conn);
                                if(!mysqli_stmt_prepare($stmt, $sql))
                                {
                                    echo "Error during sql stamement 4";
                                    exit();
                                }
                                else
                                {
                                    //Success
                                    mysqli_stmt_bind_param($stmt, 's', $tokenEmail);
                                    mysqli_stmt_execute($stmt);

                                    //Navigate to the main screen
                                    header("Location: ../LoginSystem/login.php?newpwd=passwordupdated");
                                    exit();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else
    {
        header("Location: ../LoginSystem/login.php");
        exit();
    }

?>