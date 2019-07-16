<?php
include_once('db_connection.php');
session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="This is an example of a meta description">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Performance Evaluation</title>
        <link rel="stylesheet" href="css/headerStyle.css">
        <link rel="stylesheet" href="css/footerStyle.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
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

                <!--TODO: Dynamically Changes-->
                <!--<div class="profile-info">    
                    <div id="user-name"></div>
                    <div id="user-email"></div> 
                    <div id="user-position"></div>
                </div>-->

                <!--<button id="user-profile-button" class="profile-button">
                </button>-->
            </section>

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
            <!--Outside the header border-->
            <!--<ul id="dropdown-menu">
                <li><a href="#">Profile</a></li>
                <li><a href="includes/logout.inc.php">Sign out</a></li>
            </ul>-->
        </header>

