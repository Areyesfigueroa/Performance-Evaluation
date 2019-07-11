<!Doctype html>
<html>
    <head>
        <title>Reset Password</title>
        <link rel="stylesheet" href="css/login-system.css">
    </head>
    <body>
       <main class= "site">
        <div class= "login">
            <img src="http://placehold.jp/75x75.png" alt="Company Logo">
            <div>
                <h2>Reset Your Password</h2>
            </div>
            <div>
                <p>An email will be sent to you with instructions on how to reset your password.</p>
            </div>
            <div>    
                <form action="../includes/reset-request.inc.php" method="POST">
                    <input type="text" name="email" placeholder="Email...">
                    <button type="submit" name="reset-request-submit">Receive new password by mail.</button>
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