<!Doctype html>
<html>
    <head>
        <title>Reset Password</title>
        <link rel="stylesheet" href="css/login-system.css">
        <link rel="stylesheet" href="css/login-queries.css">

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap" rel="stylesheet">
    </head>
    <body>
       <main>
        <div class="login-section">  
            <div>
                <img class="logo" src="../resources/img/AAP-logo.png" alt="Company Logo">
            </div>
            <div>
                <h2>Reset Your Password</h2>
            </div>

            <div>    
                <form action="../includes/reset-request.inc.php" method="POST">
                    <p>An email will be sent to you with instructions on how to reset your password.</p>

                    <input type="text" name="email" placeholder="Email...">
                    <button type="submit" name="reset-request-submit">Reset Password</button>
                </form>
                
                <?php
                
                    if(isset($_GET["reset"]))
                    {
                        if($_GET["reset"] == "success")
                        {
                            echo '<p>Check your e-mail</p>';
                        }
                    }
                ?>
            </div>
        </div>
       </main> 
    </body>
</html>