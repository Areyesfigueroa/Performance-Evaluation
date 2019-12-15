<?php

if(isset($_POST['remove-user-submit'])) {
    require "db_connection.php";

    $email = $_POST['email'];

    $sql = "DELETE FROM employees WHERE employee_email=?";

    $conn = OpenCon();
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: ../admin.php");
        exit();
    } else {

        //SQL Statement Successful
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        
        //Update session data
        session_start();
        unset($_SESSION['allUsers'][$email]);

        exit();
    }
} 
else {
    header("Location: ../admin.php");
    exit();
}

?>