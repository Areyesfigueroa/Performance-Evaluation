<?php

if(isset($_POST['login-submit']))
{
    require 'db_connection.php';

    $mailuid = $_POST['mailuid'];
    $password = $_POST['pwd'];

    //Error Handling
    if(empty($mailuid) || empty($password))
    {
        header("Location: ../LoginSystem/login.php?error=emptyfields");
        exit();
    }
    else if(!filter_var($mailuid, FILTER_VALIDATE_EMAIL)) //If email is not validated as email.
    {
        header("Location: ../LoginSystem/login.php?error=invalidmail");
        exit();
    }
    else 
    {
        $sql = "SELECT * FROM employees WHERE employee_email=?";
        
        $conn = OpenCon();
        $stmt = mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../LoginSystem/login.php?error=sqlerror");
            exit();
        }
        else 
        {
            //SQL Statement Successful
            mysqli_stmt_bind_param($stmt, "s", $mailuid);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if($row = mysqli_fetch_assoc($result))
            {
                $pwdCheck = password_verify($password, $row['employee_password']);
                if($pwdCheck == false)
                {
                    header("Location: ../LoginSystem/login.php?error=wrongpwd");
                    exit();
                }
                else if($pwdCheck == true)
                {
                    //Initialiaze Global Variable for the website to use.
                    session_start();
                    $_SESSION['employee_email'] = $row['employee_email'];
                    $_SESSION['employee_name'] = $row['employee_name'];
                    $_SESSION['employee_position'] = $row['employee_position'];
                    
                    //REPORT 1 QUERY
                    $sql = "SELECT * FROM report1responses WHERE employee_email=?;";
        
                    $conn = OpenCon();
                    $stmt = mysqli_stmt_init($conn);
            
                    if(!mysqli_stmt_prepare($stmt, $sql)){
                        header("Location: ../LoginSystem/login.php?error=sqlerror");
                        exit();
                    }
                    else 
                    {
                        //SQL Statement Successful
                        mysqli_stmt_bind_param($stmt, "s", $mailuid);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);

                        $report1Responses = [[]];
                        $row = $col = 0;

                        while($fetch = mysqli_fetch_assoc($result)){
                            $report1Responses[$row][$col++] = $fetch['entry_id'];
                            $report1Responses[$row][$col++] = $fetch['parked_within_lines'];
                            $report1Responses[$row][$col++] = $fetch['customer_service'];
                            $report1Responses[$row][$col++] = $fetch['on_time_attendance'];
                            $report1Responses[$row][$col++] = $fetch['dressed_up_to_code'];
                            $report1Responses[$row][$col++] = $fetch['submitter_name'];
                            $report1Responses[$row][$col++] = $fetch['notes'];
                            $report1Responses[$row][$col++] = $fetch['date_of_submission'];
                            $row++;
                            $col = 0;
                        }

                        $_SESSION["report_1_responses"] = $report1Responses;

                    }

                    //Success, Go to Main Site.
                    header("Location: ../index.php?login=success");
                    exit();
                }
                else
                {
                    //Unknown Error
                    header("Location: ../LoginSystem/login.php?error=unknown");
                    exit();
                }
            }
            else
            {
                header("Location: ../LoginSystem/login.php?error=nouser");
                exit();
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