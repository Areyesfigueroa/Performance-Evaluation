
<!Doctype html>
<html>
    <head>
        <title>Login Page</title>
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
                <h2>Member Login</h2>
            </div>
            <div>    
                <form action="../includes/login.inc.php" method="POST">
                    <input type="text" name="mailuid" placeholder="Username/Email...">
                    <input type="password" name="pwd" placeholder="Password...">
                    <a href="reset-password.php">Forgot Password</a>

                    <button type="submit" name="login-submit">Login</button>
                </form>
            </div>
            <div>

                <?php
                //Password success message.
                    if(isset($_GET["newpwd"]))
                    {
                        if($_GET["newpwd"] == "passwordupdated") 
                        {
                            echo '<p>Your password has been reset</p>';
                        }
                    }
                ?>
            </div>
        </div>
       </main> 
    </body>
</html>