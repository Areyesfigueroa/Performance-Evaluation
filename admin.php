<?php 
require "includes/header.php";
?>

<main>

    <section>
        <div>
            <h1>Manager Users</h1>
        </div>

        <div class="table-responsive-sm">
            <table id="admin-table" class="table table-striped table-bordered table-sm" cellspacing="0">
                <thead>                
                    <tr>
                        <th class="th-sm"><input type="checkbox"></th>
                        <th class="th-sm">User Name</th>
                        <th class="th-sm">User Email</th>
                        <th class="th-sm">Role</th>
                        <th class="th-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!--Data Insert Here-->
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>Aliel Reyes</td>
                        <td>alielreyes@gmail.com</td>
                        <td>admin</td>
                        <td><button>Action</button></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>Aliel Reyes</td>
                        <td>alielreyes@gmail.com</td>
                        <td>admin</td>
                        <td><button>Action</button></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>Aliel Reyes</td>
                        <td>alielreyes@gmail.com</td>
                        <td>admin</td>
                        <td><button>Action</button></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>Aliel Reyes</td>
                        <td>alielreyes@gmail.com</td>
                        <td>admin</td>
                        <td><button>Action</button></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>Aliel Reyes</td>
                        <td>alielreyes@gmail.com</td>
                        <td>admin</td>
                        <td><button>Action</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th class="th-sm"><input type="checkbox"></th>
                        <th class="th-sm">User Name</th>
                        <th class="th-sm">User Email</th>
                        <th class="th-sm">Role</th>
                        <th class="th-sm">Actions</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </section>

</main>

<?php 
require "includes/footer.php";
?>