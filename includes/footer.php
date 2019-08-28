
        <footer class="site-footer">
            <ul id="footer" class="footer-nav">
                <li id="copyright-date">&copy; (year) AAP Productions</li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </footer>

        <!-- VENDOR SCRIPTS -->
        <!-- JQuery -->
        <script type="text/javascript" src="vendor/mdb/js/jquery-3.4.1.min.js"></script>

        <!-- MDBootstrap Datatables  -->
        <script type="text/javascript" src="vendor/mdb/js/addons/datatables.min.js"></script>
        <script>
            $(document).ready(function () {
            $('#performance-table').DataTable();
            $('.dataTables_length').addClass('bs-select');
            });

            $(document).ready(function () {
            $('#admin-table').DataTable();
            $('.dataTables_length').addClass('bs-select');
            });
        </script>

        <!-- CUSTOM SCRIPTS -->
        <!-- Load Header Script -->
        <script src="resources/js/header.js" type="text/javascript"></script>

        <!-- Load Index Script-->
        <script src= "resources/js/index.js"></script>

        <!-- PHP TO JS CALLS -->
        <script type="text/javascript">
            //Load user data
            loadUserInfo(<?= json_encode($_SESSION) ?>);

            //Load Reports
            //QUESTIONS
            let report1Questions = ["Parked within the lines?", "Customer Service?", "On time attendance", "Dressed up to code?"];
            
            //CREATE REPORT
            let report1 = createReport(<?= json_encode($_SESSION['report_1_responses'])?>, report1Questions, modal, 1);
            
            //Populate main table with report summary entries. 
            createRows(performanceTable, report1.getSummary().length, report1.getSummary()[0].length, report1.getSummary());
        </script>

        <!-- Load Footer Script -->    
        <script src="resources/js/footer.js" type="text/javascript"></script>
            <script type="text/javascript">
                copyrightFooter();
            </script>

    </body>            
</html>