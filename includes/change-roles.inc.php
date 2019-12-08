<?php

if(isset($_POST['change-roles-submit'])) {

    require "db_connection.php";

    $email = $_POST['email'];
    $newRole = $_POST['newRole'];
    $rowIndex = $_POST['rowIndex'];
    $colIndex = 2;
    
    //Change Roles Query
    $sql = "UPDATE employees SET employee_role=? WHERE employee_email=?";

    $conn = OpenCon();
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: ../admin.php");
        exit();
    } else {

        //SQL Statement Successful
        mysqli_stmt_bind_param($stmt, "ss", $email, $newRole);
        mysqli_stmt_execute($stmt);
        
        //Update session data
        session_start();
        $_SESSION['allUsers'][$rowIndex][$colIndex] = $newRole;
        
        exit();
    }
} 
else {
    header("Location: ../admin.php");
    exit();
}

?>