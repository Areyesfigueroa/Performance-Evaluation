<?php 
require "includes/header.php";
?>

<main class="site-main">
    
    <h1 class="title">Manager Users</h1>

    <!--Admin Table Layout-->
    <section class="main-table table-responsive-sm">
        <table id="admin-table" class="table table-striped table-bordered table-sm" cellspacing="0">
            <thead>                
                <tr>
                    <th class="select-all th-sm">        
                        <!-- Default unchecked -->
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
                <tr>
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
                        <!--------------------
                        ------- TESTING -------
                        --------------------->

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
                </tr>
                <tr>
                    <td>                      
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="table-check-1">
                            <label class="custom-control-label" for="table-check-1"></label>
                        </div>
                    </td>
                    <td>Aliel Reyes</td>
                    <td>alielreyes@gmail.com</td>
                    <td>admin</td>
                    <td><button>Action</button></td>
                </tr>
                <tr>
                    <td>                        
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="table-check-2">
                            <label class="custom-control-label" for="table-check-2"></label>
                        </div>
                    </td>
                    <td>Aliel Reyes</td>
                    <td>alielreyes@gmail.com</td>
                    <td>admin</td>
                    <td><button>Action</button></td>
                </tr>
                <tr>
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="table-check-3">
                            <label class="custom-control-label" for="table-check-3"></label>
                        </div>
                    </td>
                    <td>Aliel Reyes</td>
                    <td>alielreyes@gmail.com</td>
                    <td>admin</td>
                    <td><button>Action</button></td>
                </tr>
                <tr>
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="table-check-4">
                            <label class="custom-control-label" for="table-check-4"></label>
                        </div>
                    </td>
                    <td>Aliel Reyes</td>
                    <td>alielreyes@gmail.com</td>
                    <td>admin</td>
                    <td><button>Action</button></td>
                </tr>
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
</main>

<?php 
require "includes/footer.php";
?>

<!-- MDBootstrap Datatables  -->
<script>
    $(document).ready(function () {
    $('#admin-table').DataTable({
        columnDefs: [{
            orderable: false,
            targets: 0, 
            autoWidth: true
        }]
    });
    $('.dataTables_length').addClass('bs-select');
    });

</script>

<!---------------------->
<!--- CUSTOM SCRIPTS --->
<!---------------------->

<!-- Load Admin Script-->
<script src= "resources/js/admin.js"></script>

<!-- Basic dropdown -->
<!--
<button class="btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">Basic dropdown</button>

<div class="dropdown-menu">
  <a class="dropdown-item" href="#">Action</a>
  <a class="dropdown-item" href="#">Another action</a>
  <a class="dropdown-item" href="#">Something else here</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">Separated link</a>
</div>
-->
<!-- Basic dropdown -->