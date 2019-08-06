
        <footer class="site-footer">
            <ul id="footer" class="footer-nav">
                <li id="copyright-date">&copy; (year) AAP Productions</li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </footer>

        <!-- LOAD SCRIPTS -->
        <script src= "scripts/index.js"></script>

        <!-- VENDOR -->

        <!-- JQuery -->
        <script type="text/javascript" src="vendor/mdb/js/jquery-3.4.1.min.js"></script>
        <!-- MDBootstrap Datatables  -->
        <script type="text/javascript" src="vendor/mdb/js/addons/datatables.min.js"></script>
        <script>
            $(document).ready(function () {
            $('#performance-table').DataTable();
            $('.dataTables_length').addClass('bs-select');
            });
        </script>

        <!-- PHP TO JS CALLS -->
        <script type="text/javascript">
            loadUserInfo(<?= json_encode($_SESSION) ?>);
        </script>

        <!-- Load Header Script -->
        <script src="scripts/header.js" type="text/javascript"></script>
            <script type="text/javascript">
                //Call Header Script Functions.
            </script>

        <!-- Load Footer Script -->    
        <script src="scripts/footer.js" type="text/javascript"></script>
            <script type="text/javascript">
                copyrightFooter();
            </script>
    </body>            
</html>