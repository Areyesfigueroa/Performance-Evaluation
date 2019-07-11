<?php

//TODO: DELETE urltest value

if(isset($_POST['reset-request-submit']))
{
    /*
        Protection from timing attacks

        My Logic:
        Timing attacks are based on how long it takes to process the information given to us by the tokens.
        Theoretically, creating two will increase the speed. So 2 tokens are created here to 
        avoid any possible timing attacks. 

        tokens - allows us to give user's access to our site for a limited amount of time. 
                - There can only be one token per user. 

        1. Create a crptographically secure token 
            - random_bytes(8) is our cryptographic token
            - bin2hex() converts our bytes into hexidecimal characters.

        2. Created the URL that we will send via email
            - $token is converted to hex just this once since in the db it will be bytes.

        3. Set token expiration date:
            - "U" format means today's date in seconds since 1970
            - 1800 seconds which mean we are adding one hour from now. To make sure
            the date has not passed what we have inserted into our database. 

        4. Insert data into pwdReset DB Table
            - Establish Connection
            - Get data from the form
            - Delete any previous token from the user. In case the user is already trying to reset password we do
            not want them to get more than one token. 
            - Insert the new token info. 
        
        5. Send user email with the url
        6. Set the current page to the reset-password page. 

    */

    $selector = bin2hex(random_bytes(8)); //This token is the one we use to send our email with. Hence the token needs to be in the url which means convert to bytes to hex.
    $token = random_bytes(32); //This token is to authenticate the user. No conversion needed. 

    //Link sent to user via email.
    $url = "localhost/authentication/LoginSystem/create-new-password.php?selector=" . $selector . "&validator=" . bin2hex($token);

    $expires = date("U") + 1800;


    //DB Connection.
    require "db_connection.php";

    $userEmail = $_POST['email'];
    
    $conn = OpenCon();

    //QUERY #1 Delete previous token.
    $sql = "DELETE FROM pwdReset WHERE pwdResetEmail=?"; 
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql))
    {
        echo("There was a sql stmt error");
    }
    else
    {
        //Statement succeess
        mysqli_stmt_bind_param($stmt, 's', $userEmail);
        mysqli_stmt_execute($stmt);
    }

    //QUERY #2 Insert new token. 
    $sql = "INSERT INTO pwdReset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?,?,?,?);";

    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql))
    {
        echo "There was a sql error when preparing stmt.";
    }
    else
    {
        //Hash sensitive data to be protected in the Database.
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);
        
        //Successful
        mysqli_stmt_bind_param($stmt, 'ssss', $userEmail, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    CloseCon($conn);

    //Send EMAIL with our url.
    $to = $userEmail;
    $subject = 'Reset your password for performanceevaluation';
    $message = '<p>We received a password request. The link to reset your password is below. 
    If you did not make this request, you can ignore this email</p>';
    $message .= '<p>Here is your password reset link: <br>';
    $message .= '<a href="' . $url . '">' . $url . '</a></p>';

    $headers = "From: Aliel Reyes <alielreyes@gmail.com>\r\n";
    $headers .= "Reply-to: alielreyes@gmail.com\r\n";
    $headers .= "Content-type: text/html\r\n";

   // mail($to, $subject, $message, $headers);

    //Send user to the reset password page. 
    //TODO: DELETE urltest value
    header('Location: ../LoginSystem/reset-password.php?reset=success&useremail='.$userEmail.'&urltest='. $url);
    exit();
}
else 
{
    header("Location: ../LoginSystem/lookup.php");
    exit();
}

?>