<?php 
require "includes/header.php";
?>
    <link rel="stylesheet" href="css/mainStyle.css">

    <div id="container">
            <main class="site-main">

                <!--Check if someone has logged into our site-->
                <?php
                    if(!isset($_SESSION['employee_email']))
                    {
                        //You are not logged in. Redirect the user so that he mail log in.
                        header("Location: LoginSystem/lookup.php");
                        exit();
                    }
                ?>

                <!--Page Title LAYOUT-->
                <h2 id="page-title" class="title">Page title</h2>

                <!--FILTERS LAYOUT-->
                <section class="filter-bar">
                    <div class="search-form">
                        <input type="text" name="searchbar" id="search-bar" class="search" placeholder="Search...">
                    </div>
                    <div>
                        Date: <select id="dateSelect">
                            <option value="Show All" selected="true">Show All</option>
                        </select>
                    </div>
                </section>
                <!--Performance Table LAYOUT-->
                <div class="main-table">
                    <table id="performance-table">
                        <tr>
                            <th>Report Tier</th>
                            <th>Submitted By</th>
                            <th>Details</th>
                            <th>Score</th>
                            <th>Date of submission</th>
                        </tr>
                    </table>
                </div>

                <!--Overall Score Table LAYOUT-->
                <div class="total-grid">
                    Overall Score: <span id="total-score">10</span>
                </div>

                <!--TODO: DELETE WHEN COMPLETED-->
                <button id="createTable-button">Create Table</button>
                    
                <!--Table Page Nav-->
                <div class="table-nav inline-container">
                    <button id="previous-btn" class="table-nav-btn">Prev</button>
                        <!--Button Nav-->
                        <div id="table-nav-container"></div>
                    <button id="next-btn" class="table-nav-btn">Next</button>
                </div>
            </main>
        </div>
<?php 
require "includes/footer.php";
?>

<!--
TODO: Add functions to script one by one
            testing(<?= json_encode($_SESSION) ?>); //Use this function to initiate the table creation.

//loadUserInfo(<?= json_encode($employeeDatas) ?>);
            //createHTMLTable(<?= json_encode($reportDatas) ?>);
            //initializeDateFilter(<?= json_encode($reportDatas) ?>);
            //calculateOverallScore();-->