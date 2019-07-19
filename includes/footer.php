
        <footer class="site-footer">
            <ul id="footer" class="footer-nav">
                <li id="copyright-date">&copy; (year) AAP Productions</li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </footer>

        <!--LOAD SCRIPTS-->
        <!--Load Scripts-->
        <!--Load DB Info Scripts-->
        <!--Load Utilities-->
        <script src="scripts/utilities/tablenav.js" type="text/javascript"></script>
        <script src="scripts/utilities/utilities.js" type="text/javascript"></script>
        <script src= "scripts/index.js"></script>
        <!--PHP TO JS CALLS-->
        <script type="text/javascript">
            loadUserInfo(<?= json_encode($_SESSION) ?>);
        </script>


        

        <!--Load Header Script-->
        <script src="scripts/header.js" type="text/javascript"></script>
            <script type="text/javascript">
                //Call Header Script Functions.
            </script>

        <!--Load Footer Script-->    
        <script src="scripts/footer.js" type="text/javascript"></script>
            <script type="text/javascript">
                //Call Footer Script Functions.
                copyrightFooter();
            </script>
    </body>            
</html>