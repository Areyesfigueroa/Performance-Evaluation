<!Doctype html>
<html>
    <head>
        <title>Lookup</title>
        <link rel="stylesheet" href="css/login-system.css">
    </head>
    <body>
       <main class= "site">
            <section class="login">
                <img src="http://placehold.jp/75x75.png" alt="Company Logo">
                <div>
                    <h2>Member Email</h2>
                </div>
                <div>    
                    <form action="../includes/lookup.inc.php" method="POST">
                        <input type="text" name="mailuid" placeholder="Email...">
                        <button type="submit" name="continue-submit">Continue</button>
                    </form>
                    <p>Don't have an account? Contact your IT Department</p>

                    <?php
                        //Show error message to user. 
                        if(isset($_GET['error']))
                        {
                            echo "<p class='status-message'>There was an error: " . $_GET['error'] . '</p>';
                        }
                    ?>
                </div>
            </section>
       </main> 
    </body>
</html>