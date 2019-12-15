<?php 
require "includes/header.php";
?>
        <main class="site-main">

            <!--Check if someone has logged into our site-->
            <?php
                if(!isset($_SESSION['employee_email']))
                {
                    //You are not logged in. Redirect the user so that he mail log in.
                    header("Location: LoginSystem/login.php");
                    exit();
                }
            ?>

            <!--Page Title LAYOUT-->
            <h1 id="page-title" class="title">Page title</h1>

            <!-- Modal -->
            <section class="modal--details-section">
                <div class="modal--details-body">
                    <a id="modal--close-btn" href="#">X</a>
                    <div class="modal--details-content">
                        <div>
                            <h6>Report Details <span class="modal--details-index">1</span></h6>
                        </div>
                        <div>
                            <!-- Questions Table -->
                            <table class="modal--details-table">
                                <thead>
                                    <tr>
                                        <th class="modal--details-date">Date: 08/20/2019</th>
                                    </tr>
                                    <tr>
                                        <th>Questions</th>
                                        <th>Answers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- DATA GOES HERE -->
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <!-- Notes Table -->
                            <table class="modal--details-table">
                                <thead>
                                    <tr>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- DATA GOES HERE -->
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <!-- Submission & Overall Score Table -->
                            <table class="modal--details-table">
                                <thead>
                                    <tr>
                                        <th>Submitted By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- DATA GOES HERE -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


            <!--Performance Table LAYOUT-->
            <section class="main-table table-responsive-sm">
                <table id="performance-table" class="table table-striped table-bordered table-sm" cellspacing="0">
                    <thead>                
                        <tr>
                            <th class="th-sm">Report Tier</th>
                            <th class="th-sm">Submitted By</th>
                            <th class="th-sm">Details</th>
                            <th class="th-sm">Date of submission</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--Data Insert Here-->
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="th-sm">Report Tier</th>
                            <th class="th-sm">Submitted By</th>
                            <th class="th-sm">Details</th>
                            <th class="th-sm">Date of submission</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </main>

<?php 
require "includes/footer.php";
?>

<!-- MDBootstrap Datatables  -->
<script>
    $(document).ready(function () {
    $('#performance-table').DataTable();
    $('.dataTables_length').addClass('bs-select');
    });
</script>

<!---------------------->
<!--- CUSTOM SCRIPTS --->
<!---------------------->

<!-- Load Index Script-->
<script src= "resources/js/index.js"></script>
<script type="text/javascript">
    performanceController.init(<?= json_encode($_SESSION) ?>);
</script>