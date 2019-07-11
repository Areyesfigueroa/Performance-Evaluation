
<!Doctype html>
<html>
    <head>
        <title>Signup Page</title>
        <link rel="stylesheet" href="css/login-system.css">
    </head>
    <body>
       <main class= "site">
            <section class="login">
                <img src="http://placehold.jp/75x75.png" alt="Company Logo">
                <div>
                    <h2>Member Signup - Admin</h2>
                </div>
                <div>    
                    <form action="../includes/signup.inc.php" method="POST">
                        <input type="text" name="mailuid" placeholder="Email...">
                        <input type="password" name="pwd" placeholder="Password...">
                        <input type="password" name="confirmpwd" placeholder="Confirm Password...">
                        <input type="text" name="name" placeholder="Name...">
                        <input type="text" name="position" placeholder="Position...">
                        <input type="text" name="phonenum" placeholder="Phone Number...">
                        <input type="number" step="any" name="score" placeholder="Initial Score...">
                        <button type="submit" name="signup-submit">Signup User</button>
                    </form>
                </div>
            </section>
       </main> 
    </body>
</html>