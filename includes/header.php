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
        <link rel="stylesheet" href="resources/css/headerStyle.css">
        <link rel="stylesheet" href="resources/css/mainStyle.css">
        <link rel="stylesheet" href="resources/css/admin.css">
        <link rel="stylesheet" href="resources/css/footerStyle.css">

        <!-- Fonts & Icons -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap" rel="stylesheet">    
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    </head>
    <body>
        <header>
            <!--Navigation Bar Section-->
            <section class="site-header">
                
                <img class="logo" src="https://www.dropbox.com/s/j8qocfcdccb8x5m/logo-dark.png?raw=1" alt="">
                
                <!--MOBILE ONLY-->
                <div class="mobile-navbar">
                    <a class="mobile-nav-icon js--nav-icon"></a>
                </div>
            </section>

            <!--Navigation Modal Section-->
            <section>
                <!-- Navbar -->
                <ul id="navbar-modal" class="navbar js--mobile-navbar">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="admin.php">Manage Users</a></li>
                    <li><a href="includes/logout.inc.php">Sign Out</a></li>
                </ul>
            </section>

        </header>
                

