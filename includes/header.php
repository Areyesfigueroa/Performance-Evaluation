<?php
include_once('db_connection.php');
session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="This is an example of a meta description">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Performance Evaluation</title>

        <!-- Normalize -->
        <link rel="stylesheet" href="vendor/css/normalize.css">

        <!-- MDBootstrap Datatables  -->
        <link href="vendor/mdb/css/addons/datatables.min.css" rel="stylesheet">
        <!-- Bootstrap core CSS -->
        <link href="vendor/mdb/css/bootstrap.min.css" rel="stylesheet"> 
        <!-- Material Design Bootstrap -->
        <link href="vendor/mdb/css/mdb.min.css" rel="stylesheet">   
        
        <!--Custom CSS-->
        <link rel="stylesheet" href="css/headerStyle.css">
        <link rel="stylesheet" href="css/mainStyle.css">
        <link rel="stylesheet" href="css/footerStyle.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap" rel="stylesheet">    
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    </head>
    <body>
        <header>
            <section class="site-header">
                
                <img class="logo" src="https://www.dropbox.com/s/j8qocfcdccb8x5m/logo-dark.png?raw=1" alt="">
                
                <!--MOBILE ONLY-->
                <div class="mobile-navbar">
                    <button id="hamburger-btn" class="hamburger-menu-btn"></button>
                    <button id="profile-btn" class="profile-menu-btn"></button>
                </div>
            </section>
            <section>
                <!--Mobile Profile Modal-->
                <div id="profile-modal" class="profile-slide-menu">
                    <button id="change-profile-btn" class="profile-menu-btn"></button>
                    <div class="profile-info">    
                        <div id="user-name">Aliel Reyes</div>
                        <div id="user-email">alielreyes@gmail.com</div> 
                        <div id="user-position">IT Lead</div>
                    </div>
                    <button id="view-profile-btn" class="profile-modal-btn">View Profile</button>
                    <button id="sign-out-btn" class="profile-modal-btn">Sign Out</button>
                </div>

                <!--Mobile Navbar Modal-->
                <ul id="navbar-modal" class="navbar">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Manage Users</a></li>
                </ul>
            </section>

        </header>

