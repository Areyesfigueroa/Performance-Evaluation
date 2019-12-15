<?php 
require "includes/header.php";
?>

<main class="site-main">
    
    <h1 class="title">Manager Users</h1>

    <!--Admin Table Layout-->
    <section class="main-table table-responsive-sm">
        <div class="action-list-all">
            <div class="dropdown">
                <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="dropdownMenuButton-global" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action List All
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton-global">
                    <a class="dropdown-item font-weight-light action-link" id="reset-pwd-btn-all" href="#">Reset Password</a>
                    <a class="dropdown-item font-weight-light action-link" id="remove-user-btn-all" href="#">Remove User</a>
                    <a class="dropdown-item font-weight-light action-link" id="change-role-btn-all" href="#">Change Role</a>
                    <a class="dropdown-item font-weight-light action-link" id="create-user-btn-all" href="#">Create User</a>
                </div>
            </div>
        </div>
        <table id="admin-table" class="table table-striped table-bordered table-sm" cellspacing="0">
            <thead>                
                <tr>
                    <th class="select-all th-sm">        
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="selectall-table-check-0">
                            <label class="custom-control-label" for="selectall-table-check-0">Select All</label>
                        </div>
                    </th>
                    <th class="th-sm">User Name</th>
                    <th class="th-sm">User Email</th>
                    <th class="th-sm">Role</th>
                    <th class="th-sm">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!--Data Insert Here-->
                <!-- <tr>
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="table-check-0">
                            <label class="custom-control-label" for="table-check-0"></label>
                        </div>
                    </td>
                    
                    <td>Aliel Reyes</td>
                    <td>alielreyes@gmail.com</td>
                    <td>admin</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action List
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item font-weight-light" href="#">Reset Password</a>
                                <a class="dropdown-item font-weight-light" href="#">Remove User</a>
                                <a class="dropdown-item font-weight-light" href="#">Change Role</a>
                            </div>
                        </div>
                    </td>
                </tr>-->
            </tbody>
            <tfoot>
                <tr>
                    <th class="th-sm">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="selectall-table-check-1">
                            <label class="custom-control-label" for="selectall-table-check-1">Select All</label>
                        </div>
                    </th>
                    <th class="th-sm">User Name</th>
                    <th class="th-sm">User Email</th>
                    <th class="th-sm">Role</th>
                    <th class="th-sm">Actions</th>
                </tr>
            </tfoot>
        </table>
    </section>

    <div class="modal">
        <div class="modal-outer">
            <div class="modal-inner">
                <div class="modal-close-btn">
                    <a>X</a>
                </div>
                <div>
                    <img class="logo" src="./resources/img/AAP-logo.png" alt="Company Logo">
                </div>
                <div>
                    <h2>Member Signup - Admin</h2>
                </div>
                <div class="form-container">    
                <!-- action="./includes/signup.inc.php" method="POST" -->
                    <form id="js--signup-form">
                        <input type="email" name="mailuid" placeholder="Email..." required>
                        <input type="password" name="pwd" placeholder="Password..." required>
                        <input type="password" name="confirmpwd" placeholder="Confirm Password..." required>
                        <input type="text" name="name" placeholder="Name..." required>
                        <input type="text" name="position" placeholder="Position..." required>
                        <select name="role" required>
                            <option value="Admin">Admin</option>
                            <option selected="selected" value="User">User</option>
                        </select>
                        <button id="js--signup-btn" type="submit" name="signup-submit">Signup User</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<?php 
require "includes/footer.php";
?>

<!-- MDBootstrap Datatables  -->
<script>
    $(document).ready(function () {
    $('#admin-table').DataTable({
        "columnDefs": [{
            orderable: false,
            targets: 0, 
            autoWidth: true
        }], 
    });
    $('.dataTables_length').addClass('bs-select');
    });

</script>

<!---------------------->
<!--- CUSTOM SCRIPTS --->
<!---------------------->

<!-- Load Admin Script-->
<script src= "resources/js/admin.js"></script>
<script type="text/javascript">
    window.onload = () => {
        console.log("REFRESH");
    };
    console.log("LOADED");
    console.log(<?= json_encode($_SESSION['allUsers']) ?>);
    adminController.init(<?= json_encode($_SESSION['allUsers']) ?>);
</script>