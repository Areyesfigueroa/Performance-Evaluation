
<?php

$conn = OpenCon();

//Employee ID who we are querying from. 
//TODO: Make this dynamic by using the authentication library.
$employeeID = 1112321;

/*Select from the reports all the reports associated with Aliel Reyes. TODO: Change the employee to a variable that you get from the authentication.*/

$reportQuery = "SELECT reports.question_id, reports.score, employees.employee_name, reports.submitter_notes, reports.date_of_submission
FROM reports INNER JOIN employees ON reports.submitter_id = employees.employee_id
WHERE reports.employee_id = $employeeID;";

/*Select from the employees table the row with the employee's information. To be used to populate employee information.*/
$employeeQuery = "SELECT * FROM employees WHERE employees.employee_id = $employeeID;";

//Get the result object
$reportResult = mysqli_query($conn, $reportQuery);
$employeeResult = mysqli_query($conn, $employeeQuery); 

//Validate Query
validateQuery($reportResult);
validateQuery($employeeResult);

//Retrieve Data.
$reportDatas = array();
$index = 0;
while($row = mysqli_fetch_assoc($reportResult)){
    $reportDatas[$index]= [$row['question_id'], $row['score'], $row['employee_name'], $row['submitter_notes'], $row['date_of_submission']];  
    $index++;
}

//Retrieve Data
$employeeDatas = array();
while($row = mysqli_fetch_assoc($employeeResult)){
    $employeeDatas[0] = $row['employee_id'];
    $employeeDatas[1] = $row['employee_name'];
    $employeeDatas[2] = $row['employee_email'];
    $employeeDatas[3] = $row['employee_phone'];
    $employeeDatas[4] = $row['employee_position_id'];
    $employeeDatas[5] = $row['employee_score'];  
}

function validateQuery($result){
    //Check if mysql result object has been returned.
    if(!$result) {
        exit();
    }
    //Check if there is data in the result object
    if(mysqli_num_rows($result) == 0){
        exit();
    }
}

CloseCon($conn);

?>