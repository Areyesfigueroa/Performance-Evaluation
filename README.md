# Performance-Evaluation
Demo project that allows for managers to evaluate their employees by filling out and creating their own forms.

This project only includes the htdocs folder from the apache web server. An apache webserver with php enviroment is needed to run these files since they connect to mysql

I have also omitted my db_connection file so that I can keep mysql server credentials to myself. 

//PHP Mailer
Install phpmailer using composer by referring to the composer.json file. 

//COMMENTS FOR MYSELF
Activate Hot Reloader with using the following code snippet. Must go after the body in your main page.
require "../hotreloader.php";
$reloader = new HotReloader();
$reloader->init(); 
