<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


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
    $url = "https://performance-eval.000webhostapp.com/LoginSystem/create-new-password.php?selector=" . $selector . "&validator=" . bin2hex($token);

    $expires = date("U") + 1800;


    //DB Connection.
    require "db_connection.php";

    $userEmail = $_POST['email'];
    
    $conn = OpenCon();

    //QUERY #1 Delete previous token.
    $sql = "DELETE FROM pwdreset WHERE pwdResetEmail=?"; 
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
    $sql = "INSERT INTO pwdreset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?,?,?,?);";

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


    
    // Load Composer's autoloader
    require '../vendor/autoload.php';

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
        $mail->Port       = 465;                                    // TCP port to connect to
        $mail->isHTML();
        $mail->Username   = 'mailrobot27@gmail.com';                     // SMTP username
        $mail->Password   = 'X4CCrN^9NuY7';                               // SMTP password
    
        //Recipients
        $mail->setFrom('no-reply@mail.com', 'Mailer');
        $mail->addAddress($userEmail);     // Add a recipient
    
        //Email Formatting
        $subject = 'Reset your password for performanceevaluation';
        $message = '<p>We received a password request. The link to reset your password is below. 
        If you did not make this request, you can ignore this email</p>';
        $message .= '<p>Here is your password reset link: <br>';
        $message .= '<a href="' . $url . '">' . $url . '</a></p>';

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = 'We received a password request. The link to reset your password is below. 
        If you did not make this request, you can ignore this email, Here is your password reset link.
        ' . $url;
    
        $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    
    //echo $url;
    header('Location: ../LoginSystem/reset-password.php?reset=success&useremail='.$userEmail);
    exit();
}
else 
{
    header("Location: ../LoginSystem/login.php");
    exit();
}

?>