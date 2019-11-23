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
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin'],
        ['Aliel Reyes', 'areyes@allaboutparking.com', 'admin']
    ];

    //TODO: Work out a data structure store the index values for the checkboxes that are on, so that we can use it later and quickly know which data we are referring to. 
    let checkedRows = []; //FOR CHECKLISTS INSTEAD OF NUMBERS USE REFERENCES OBJ

    const resetPwd = (tableRow) => {
        console.log(`Reset Pwd: ${tableRow.id}`);
    }
    const removeUser = (tableRow) => {
        console.log(`Remove User: ${tableRow.id}`);
    }
    const changeRole = (tableRow) => {
        console.log(`Change Role: ${tableRow.id}`);
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

        getCheckedRows: () => {
            return checkedRows;
        },

        rowChecked: (checkbox) => {            

            //Save the true values and remove the false one
            if(checkbox.checked) {
                //Record the checkbox object
                checkedRows.push(checkbox);
            } else {
                //Remove rowIdx
                const rowIdx = checkedRows.findIndex(el => el.id === checkbox.id);
               
                if(rowIdx >= 0) {
                    checkedRows.splice(rowIdx, 1);
                }
            }
            console.log(checkedRows);
        }, 

        clearCheckedRows: () => {
            checkedRows = [];
            console.log(checkedRows);
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

    return {

        getDOMstrings: () => {
            return DOMstrings;
        },

        setCheckbox: (active, idNum, checkbox = DOMstrings.checkbox) => {
            if( document.getElementById(`${checkbox}${idNum}`)) {
                document.getElementById(`${checkbox}${idNum}`).checked = active;
            }
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
                updateAllCheckboxes(status);
            });
        }

        //Set list based listeners
        const setEventListener = (i, btnID, callback) => {
            document.getElementById(`${btnID}${i}`).addEventListener('click', (event) => {
                callback(event.target);
            });
        }


        aModelCtrl.getData().forEach((_, i) => {
            setEventListener(i, DOMstrings.resetPwdBtn, aModelCtrl.getActions().resetPwd);
            setEventListener(i, DOMstrings.removeUserBtn, aModelCtrl.getActions().removeUser);
            setEventListener(i, DOMstrings.changeRoleBtn, aModelCtrl.getActions().changeRole);
            setEventListener(i, DOMstrings.checkbox, aModelCtrl.rowChecked);
        });
    }

    const updateAllCheckboxes = (value) => {
        const DOMstrings = aUICtrl.getDOMstrings();
        
        const adminTable = document.getElementById(DOMstrings.adminTable).getElementsByTagName(DOMstrings.tableBody)[0];
        adminTableArr = Array.prototype.slice.call(adminTable.rows, 0);
        
        if(value) {
            //Check box header checkboxes
            aUICtrl.setCheckbox(value, 0, DOMstrings.selectAllCheckbox);
            aUICtrl.setCheckbox(value, 1, DOMstrings.selectAllCheckbox);  

            //Check all visible checkboxes. 
            adminTableArr.forEach((el) => {
                //Update UI
                const id = parseInt(el.id.replace("row-", ""));
                aUICtrl.setCheckbox(true, id);
                
                //Update Data
                aModelCtrl.rowChecked(document.getElementById(`${DOMstrings.checkbox}${id}`));
            });      

        } else {

            //Check box header checkboxes
            aUICtrl.setCheckbox(value, 0, DOMstrings.selectAllCheckbox);
            aUICtrl.setCheckbox(value, 1, DOMstrings.selectAllCheckbox); 

            //Uncheck all stored checkboxes.
            aModelCtrl.getCheckedRows().forEach((el) => {
                //Update UI
                el.checked = false;
            }); 

            //Update Data
            aModelCtrl.clearCheckedRows();
        }
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

