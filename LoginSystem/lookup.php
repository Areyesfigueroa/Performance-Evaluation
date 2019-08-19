<!Doctype html>
<html>
    <head>
        <title>Lookup</title>
        <link rel="stylesheet" href="css/login-system.css">
        <link rel="stylesheet" href="css/login-queries.css">

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap" rel="stylesheet">    
    </head>
    <body>
       <main>
            <section class="login-section">
                <div>
                    <img class="logo" src= "../resources/img/AAP-logo.png" alt="Logo">
                </div>
                <div>
                    <h2>Member Email</h2>
                </div>
                <div class="center-form">    
                    <form action="../includes/lookup.inc.php" method="POST">
                        <input type="text" name="mailuid" placeholder="Email...">

                        <p>Don't have an account? Contact your IT Department</p>

                        <?php
                            //Show error message to user. 
                            if(isset($_GET['error']))
                            {
                                echo "<p class='status-message'>There was an error: " . $_GET['error'] . '</p>';
                            }
                        ?>

                        <button type="submit" name="continue-submit"><p>Next</p></button>
                    </form>
                    <div>

                    </div>

                </div>
            </section>
       </main> 
    </body>
</html>