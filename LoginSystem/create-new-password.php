<!Doctype html>
<html>
    <head>
        <title>Create new password page</title>
        <link rel="stylesheet" href="css/login-system.css">
    </head>
    <body>
       <main class= "site">
            <div class="login">
                <div>
                    <img src="http://placehold.jp/75x75.png" alt="Company Logo">
                </div>
                <div>
                    <h2>Create new password</h2>
                </div>
                <div>
                    <?php
                        $selector = $_GET['selector'];
                        $validator = $_GET['validator'];

                        if(empty($selector || $validator))
                        {
                            echo "Could not validate your request";
                        }
                        else
                        {
                            //Check that the values are of the right type.
                            if(ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false)
                            {
                                ?>
                                
                                <form action="../includes/reset-password.inc.php" method="post">
                                    <input type="hidden" name="selector" value="<?php echo $selector ?>">
                                    <input type="hidden" name="validator" value="<?php echo $validator ?>">
                                    <input type="password" name="pwd" placeholder="Enter a new password...">
                                    <input type="password" name="pwd-repeat" placeholder="Confirm password...">
                                    <button type="submit" name="reset-password-submit">Reset password</button>
                                </form>

                                <?php
                            }
                        }
                    ?>
                </div>
            </div>
       </main> 
    </body>
</html>