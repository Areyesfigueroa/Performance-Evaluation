
            <footer class="site-footer">
                <ul id="footer" class="footer-nav">
                    <li id="copyright-date">&copy; (year) AAP Productions</li>
                    <li><a href="#">Terms of use</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </footer>

            <!---------------------->
            <!--- VENDOR SCRIPTS --->
            <!---------------------->

            <!-- JQuery & Popper & Bootstrap -->
            <!-- JQuery -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <!-- Bootstrap tooltips -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
            <!-- Bootstrap core JavaScript -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>
            <!-- MDB core JavaScript -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.14.0/js/mdb.min.js"></script>

            <!-- MDBootstrap Datatables -->
            <script type="text/javascript" src="myvendors/mdb/js/addons/datatables.min.js"></script>

            <!---------------------->
            <!--- CUSTOM SCRIPTS --->
            <!---------------------->

            <!-- Load Utilities Script -->
            <script src="resources/js/utilities.js" type="text/javascript"></script>

            <!-- Load Global Script -->
            <script src="resources/js/global.js" type="text/javascript"></script>
            <script>
                globalController.init(<?= json_encode($_SESSION) ?>);
            </script>


            <!-- Load Footer Script -->    
            <script src="resources/js/footer.js" type="text/javascript"></script>
                <script type="text/javascript">
                    copyrightFooter();
                </script>
        </div> <!--Page Container-->
    </body>            
</html>