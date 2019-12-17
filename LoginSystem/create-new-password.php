<!Doctype html>
<html>
    <head>
        <title>Create new password page</title>
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