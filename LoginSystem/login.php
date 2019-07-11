
<!Doctype html>
<html>
    <head>
        <title>Login Page</title>
        <link rel="stylesheet" href="css/login-system.css">
    </head>
    <body>
       <main class= "site">
        <div class="login">
            <img src="http://placehold.jp/75x75.png" alt="Company Logo">
            <div>
                <h2>Member Login</h2>
            </div>
            <div>    
                <form action="../includes/login.inc.php" method="POST">
                    <input type="text" name="mailuid" placeholder="Username/Email...">
                    <input type="password" name="pwd" placeholder="Password...">
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
                <a href="reset-password.php">Forgot Password</a>
            </div>
        </div>
       </main> 
    </body>
</html>