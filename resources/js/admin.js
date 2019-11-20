/**
 * ---------------------------------
 * ADMIN PAGE - Manage users page
 * ---------------------------------
 */

const adminModelController = (function() {
    const sqlData = [
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin']
    ];

    //TODO: Work out a data structure store the index values for the checkboxes that are on, so that we can use it later and quickly know which data we are referring to. 
    const checkedRows = []

    const resetPwd = (id) => {
        console.log(`Reset Pwd: ${id}`);
    }
    const removeUser = (id) => {
        console.log(`Remove User: ${id}`);
    }
    const changeRole = (id) => {
        console.log(`Change Role: ${id}`);
    }



    return {
        getData: () => {
            return sqlData;
        }, 

        getActions: () => {
            return {
                resetPwd,
                removeUser,
                changeRole
            }
        },

        rowChecked: (id, value) => {
            console.log(`Row Checked - ${id}: Value - ${value}`);
            //Save the true values and remove the false ones. 
        }
    }

})();


const adminUIController = (function() {
    const DOMstrings = {
        selectAllCheckbox: "selectall-table-check-",
        checkbox: "table-check-",
        adminTable: "admin-table",
        tableBody: "tbody",
        resetPwdBtn: "reset-pwd-btn-",
        removeUserBtn: "remove-user-btn-",
        changeRoleBtn: "change-role-btn-"
    }

    const setCheckbox = (active, idNum, checkbox = DOMstrings.checkbox) => {
        document.getElementById(`${checkbox}${idNum}`).checked = active;
    }

    return {

        getDOMstrings: () => {
            return DOMstrings;
        },

        setAllCheckboxes: (active) => {
            const adminTable = document.getElementById(DOMstrings.adminTable).getElementsByTagName(DOMstrings.tableBody)[0];
            adminTableArr = Array.prototype.slice.call(adminTable.rows, 0);
            
            //Set table Header
            setCheckbox(active, 0, DOMstrings.selectAllCheckbox);
            setCheckbox(active, 1, DOMstrings.selectAllCheckbox);
            
            //Set table Body
            adminTableArr.forEach((e, i) => {
                setCheckbox(active, i);
            });            
        },

        createCheckbox: (parentElement, id) => {
            const html = `
            <td>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="${DOMstrings.checkbox}${id}">
                    <label class="custom-control-label" for="${DOMstrings.checkbox}${id}"></label>
                </div>
            </td>`;
            

            parentElement.insertAdjacentHTML('afterbegin', html);
        },

        createActionBtn: (parentElement, id) => {
            const html = `
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="dropdownMenuButton-${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action List
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton-${id}" id="actionBtn-${id}">
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.resetPwdBtn}${id}'}>Reset Password</a>
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.removeUserBtn}${id}'>Remove User</a>
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.changeRoleBtn}${id}'>Change Role</a>
                    </div>
                </div>
            </td>`

            parentElement.insertAdjacentHTML('beforeend', html);
        }
    }
})();


const adminController = (function(aModelCtrl, aUICtrl) {
    
    const setEventListeners = () => {
        DOMstrings = aUICtrl.getDOMstrings();
        const selectAllLength = 2;

        
        //Select All Checkbox Event Listeners
        for(let i =0; i < selectAllLength; i++) {
            document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).addEventListener('change', function() {
                
                let status = document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).checked;
                aUICtrl.setAllCheckboxes(status);
            });
        }

        //Set checkbox event listeners
        const setCheckboxBtn = (i, btnID, callback) => {
            document.getElementById(`${btnID}${i}`).addEventListener('click', (event) => {
                callback(event.target.id, event.target.checked);
            });
        }

        
        //Set adming actions event listeners
        const setActionButton = (i, btnID, callback) => {
            document.getElementById(`${btnID}${i}`).addEventListener('click', (event) => {
                callback(event.target.id);
            });
        }

        aModelCtrl.getData().forEach((_, i) => {
            setActionButton(i, DOMstrings.resetPwdBtn, aModelCtrl.getActions().resetPwd);
            setActionButton(i, DOMstrings.removeUserBtn, aModelCtrl.getActions().removeUser);
            setActionButton(i, DOMstrings.changeRoleBtn, aModelCtrl.getActions().changeRole);
            setCheckboxBtn(i, DOMstrings.checkbox, aModelCtrl.rowChecked);
        });

    }



    const createAdminTable = () => {

        //Get dom strings
        const DOMstrings = aUICtrl.getDOMstrings();
        
        //Initialize variables
        const table = document.querySelector(DOMstrings.tableBody);
        const [rowLength, colLength] = [aModelCtrl.getData().length, aModelCtrl.getData()[0].length];
        const data = aModelCtrl.getData();
        
        //Populate the table with the admin data. 
        AllAboutParking.PerformanceEvaluation.Utilities.createRows(table, rowLength, colLength, data);

        //Add the html elements to the table.
        data.forEach((_, i) => {
            const tr = document.getElementById(`row-${i}`);
            aUICtrl.createCheckbox(tr, i);
            aUICtrl.createActionBtn(tr, i, aModelCtrl.getActions());
        });
    }
    
    return {
        init: () => {
            createAdminTable();
            setEventListeners();
        }
    }
})(adminModelController, adminUIController);

adminController.init();

