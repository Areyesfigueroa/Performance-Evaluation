<?php
// include_once('db_connection.php');
?>

<!Doctype html>
<html>
    <head>
        <title>Signup Page</title>
        <link rel="stylesheet" href="css/login-system.css">
        <link rel="stylesheet" href="css/login-queries.css">
    </head>
    <body>
       <main>
            <section class= "login-section">
                <div>
                    <img class="logo" src="../resources/img/AAP-logo.png" alt="Company Logo">
                </div>
                <div>
                    <?php
                        if(!isset($_SESSION))
                        {
                            //You are a regular user. 
                            echo "<h2> Member Signup </h2>";
                        } else {

                            //You are an admin user.
                            echo "<h2> Member Signup - Admin </h2>";
                        }
                    ?>
                </div>
                <div>    
                    <form action="../includes/signup.inc.php?" method="POST">
                        <input type="email" name="mailuid" placeholder="Email...">
                        <input type="password" name="pwd" placeholder="Password...">
                        <input type="password" name="confirmpwd" placeholder="Confirm Password...">
                        <input type="text" name="name" placeholder="Name...">
                        <input type="text" name="position" placeholder="Position...">
                        <select name="role">
                            <?php
                                if(!isset($_SESSION))
                                {
                                    //You are a regular user. 
                                    echo '<option value="User">User</option>';
                                } else {

                                    //You are an admin user.
                                    echo '<option value="Admin">Admin</option>';
                                    echo '<option value="User">User</option>';
                                }
                            ?>
                        </select>
                        <button type="submit" name="signup-submit">Signup User</button>
                        <?php
                            if(isset($_GET['error']))
                            {
                                echo "<p class='status-message'>Sign up failed: " . $_GET['error'] . "</p>";
                            }
                        ?>
                    </form>
                </div>
            </section>
       </main> 
    </body>
</html>