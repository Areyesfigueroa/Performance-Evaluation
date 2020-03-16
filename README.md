# Performance-Evaluation

## Description
Demo project that allows for All About Parking employees to login and see their performance evaluation results. On the other hand admin users get to manage or add other users into the system. 

The project's primary goal was to create a login system for the employees in order to separate their data from other employees. The secondary objective was to create roles and allow admin users to system create, remove and modify other users. 

## Technologies/Design

###### Design Pattern
For this project I decided to use the MVC pattern which improved code's readability. 

###### Technology Stack
- Frontend: HTML, CSS, JavaScript, JQuery
- Backend: PHP
- Database: MySQL
- Database Service/Hosting Platform: Heroku

###### Libraries/Frameworks
- BootStrap for the Table search with pagination and button design. 
- JQuery for table logic as well as for mobile menu animations. 
- PHP Mailer for when the user requests to reset their password. 

###### Other Tools
- Trello for keeping track of my tasks
- Google's Draw.IO to help with project design
- SQL Pro for Create/Modifying the tables and testing queries

## Demo Usage
First navigate to the following site: https://performance-eval.herokuapp.com/LoginSystem/login.php
Once there, login using the following credentials.

For a Non-admin User:
Username: guestuser@mail.com
Password: guest123

For an Admin User:
Username: guestadmin@mail.com
Password: guest123

## Installation
This project is not meant to be installed publicly due to the db_connection file not being in the repository. This is to keep my database credentials safe. However, if this were to be installed you would also need composer to download the php packages such as PHPMailer. 




