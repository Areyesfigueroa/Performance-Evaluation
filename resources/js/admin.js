/**
 * ---------------------------------
 * ADMIN PAGE - Manage users page
 * ---------------------------------
 */

const adminModelController = (function() {
    let sqlData = [];
    let checkedRows = []; 

    const resetPwd = (email) => {
        return new Promise((resolve, reject) => {

            console.log(`Reset Pwd for: ${email}`);
        
            const xhr = new XMLHttpRequest();
            const url = "includes/reset-request.inc.php";
            const params = `reset-request-submit=true&email=${email}`;
                
            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(`Email sent to ${email}`);
                }
            }

            xhr.onerror = () => reject(new Error(`Error, could not send request for the following ${email}`));
            
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        });
    }

    const removeUser = (email) => {        

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = "includes/remove-user.inc.php";
            const params = `remove-user-submit=true&email=${email}`;
                
            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(`Removed User: ${email} from the database.`);
                }
            }

            xhr.onerror = () => reject(new Error(`Error, could not send request for the following ${email}`));
            
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        });
    }

    const changeRole = (email, newRole) => {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            const url = "includes/change-roles.inc.php";
            const params = `change-roles-submit=true&email=${email}&newRole=${newRole}`;
                
            //Request Lifecycle
            xhr.onreadystatechange = () => {//Call a function when the state changes.
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(`Role changed to ${newRole} for ${email}`);
                }
            }

            //If the request runs into an error
            xhr.onerror = () => reject(new Error(`Error, could not send request for the following ${email}`));
            
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        });
    }

    const createUser = (formInputs) => {

        //POST Http request.
        console.log("Sending Request");

        const xhr = new XMLHttpRequest();
        const url = "includes/signup.inc.php";
        const params = `signup-submit=true&mailuid=${formInputs.email}&pwd=${formInputs.pwd}&confirmpwd=${formInputs.confirmPwd}&name=${formInputs.name}&position=${formInputs.position}&role=${formInputs.role}`;
            
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                alert(`New User Added!`);
    
                //Reload Page to update data.
                window.location.reload();
            }
        }
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    };

    return {
        setSQLData: (value) => {
            sqlData = value;
        },

        getSQLData: () => {
            return sqlData;
        }, 

        get2DArrSQLData: () => {

            //Convert to 2D Array
            const dataArr = [];
            Object.keys(sqlData).forEach((key) => {
                dataArr.push(sqlData[key]);
            });

            return dataArr;
        },

        getActions: () => {
            return {
                resetPwd,
                removeUser,
                changeRole,
                createUser
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
        },
        
        emailIsValid: (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        changeRoleBtn: "change-role-btn-",
        createUserBtn: "create-user-btn-all",
        adminTableLength: "admin-table_length",
        showEntries: "show-entries",
        modal: "modal",
        modalOuter: "modal-outer",
        modalCloseBtn: "modal-close-btn",
        active: "active",
        signupBtn: "js--signup-btn",
        signupForm: "js--signup-form"
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
                    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton-${id}" id="actionBtn-${id}">
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.resetPwdBtn}${id}'}>Reset Password</a>
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.removeUserBtn}${id}'>Remove User</a>
                        <a class="dropdown-item font-weight-light" id='${DOMstrings.changeRoleBtn}${id}'>Change Role</a>
                    </div>
                </div>
            </td>`

            parentElement.insertAdjacentHTML('beforeend', html);
        },

        toggleModal: () => {
            const modal = document.querySelector('.' + DOMstrings.modal);
            modal.classList.toggle(DOMstrings.active);
        },
        
        addClass: (elementId, className) => {
            document.getElementById(elementId).classList.add(className);
        }
    }
})();


const adminController = (function(aModelCtrl, aUICtrl) {

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

        const dataArr = aModelCtrl.get2DArrSQLData();        
        const [rowLength, colLength] = [dataArr.length, dataArr[0].length];
        
        //Populate the table with the admin data. 
        AllAboutParking.PerformanceEvaluation.Utilities.createRows(table, rowLength, colLength, dataArr);

        //Add the html elements to the table.
        dataArr.forEach((_, i) => {
            const tr = document.getElementById(`row-${i}`);
            aUICtrl.createCheckbox(tr, i);
            aUICtrl.createActionBtn(tr, i, aModelCtrl.getActions());
        });
    }

    const setCheckboxListeners = () => {
        const DOMstrings = aUICtrl.getDOMstrings();
        const selectAllLength = 2;


        //Set a callback for after the document loads. 
        window.onload = () => {
            aUICtrl.addClass(DOMstrings.adminTableLength, DOMstrings.showEntries);
        }

        //Select All Checkbox Event Listeners
        for(let i =0; i < selectAllLength; i++) {
            document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).addEventListener('change', function() {
                let status = document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).checked;
                updateAllCheckboxes(status);
            });
        }
    }

    const setInlineActions = (emailColIdx, roleColIdx) => {
        const DOMstrings = aUICtrl.getDOMstrings();

        //Initialize All Table event listeners. Row buttons.
        aModelCtrl.get2DArrSQLData().forEach((_, i) => {

            //Reset Pwd
            document.getElementById(`${DOMstrings.resetPwdBtn}${i}`).addEventListener('click', (event) => {
                const promise = aModelCtrl.getActions().resetPwd(event.target.closest("tr").getElementsByTagName("td")[emailColIdx].textContent);
                promise.then((result)=>{
                    //Alert the result to the user.
                    alert(result);

                    //Update page by reloding
                    window.location.reload();
                }).catch((error)=>{
                    alert(error);
                });
            });

            //Change Roles
            document.getElementById(`${DOMstrings.changeRoleBtn}${i}`).addEventListener('click', (event) => {
                const email = event.target.closest("tr").getElementsByTagName("td")[emailColIdx].textContent;
                const currRole = event.target.closest("tr").getElementsByTagName("td")[roleColIdx].textContent;
                const newRole = (currRole==='User') ? "Admin":"User"; //toggle role

                const promise = aModelCtrl.getActions().changeRole(email, newRole);
                promise.then((result)=>{
                    //Alert the result to the user.
                    alert(result);

                    //Update page by reloding
                    window.location.reload();
                }).catch((error)=>{
                    alert(error);
                });
            });

            //Remove User
            document.getElementById(`${DOMstrings.removeUserBtn}${i}`).addEventListener('click', (event) => {
                const email = event.target.closest("tr").getElementsByTagName("td")[emailColIdx].textContent;

                if(!email) {
                    console.log("Empty Fields");
                    return;
                }
        
                if(!window.confirm(`Are you sure you want to delete ${email}?`)) {
                    alert("Action Aborted");
                    return;
                }

                const promise = aModelCtrl.getActions().removeUser(email);
                promise.then((result)=>{
                    //Alert the result to the user.
                    alert(result);

                    //Update page by reloding
                    window.location.reload();
                }).catch((error)=>{
                    alert(error);
                });
            });

            //Checkbox
            document.getElementById(`${DOMstrings.checkbox}${i}`).addEventListener("click", (event) => {
                aModelCtrl.rowChecked(event.target);
            });
        });
    }

    const setAllActions = (emailColIdx, roleColIdx) => {
        const DOMstrings = aUICtrl.getDOMstrings(); 

        //Initialize Action LIst All //TODO: Change the listener for the All section.
        const id = "all";
        
        //Reset Pwd
        document.getElementById(`${DOMstrings.resetPwdBtn}${id}`).addEventListener('click', () => {
            const checkedRows = aModelCtrl.getCheckedRows();
            
            if(checkedRows.length > 0) {
                const alertMsg = [];
                
                (function loop(i, length) {

                    if(i >= length) {
                        return;
                    }
    
                    const promise = aModelCtrl.getActions().resetPwd(checkedRows[i].closest("tr").getElementsByTagName("td")[emailColIdx].textContent);
                    promise.then((result) => {
                        //Store the results
                        alertMsg.push(result);

                        //Increment to next checkbox
                        loop(i+1, length); //loop recursively.
                        
                        //RELOAD after sending the last element.
                        if(i === length - 1) {
                            //Alert all results at once
                            alert(alertMsg.join('\n'));
                        }
                    }).catch((error) => {
                        alert(error);
                    });

                })(0, checkedRows.length);
            }
        });

        //Change Role
        document.getElementById(`${DOMstrings.changeRoleBtn}${id}`).addEventListener('click', () => {
            //Get the fields
            const checkedRows = aModelCtrl.getCheckedRows();

            //If there are any selected rows.
            if(checkedRows.length > 0) {
                const alertMsg = [];

                (function loop(i, length){    

                    if(i >= length) {
                        return;
                    }

                    //Gather data for Posting //TODO: LOOP THROUGH INDEX
                    const email = checkedRows[i].closest("tr").getElementsByTagName("td")[emailColIdx].textContent;
                    const currRole = checkedRows[i].closest("tr").getElementsByTagName("td")[roleColIdx].textContent;
                    const newRole = (currRole==='User') ? "Admin":"User"; //toggle role

                    const promise = aModelCtrl.getActions().changeRole(email, newRole);
                    promise.then((result) => {
                        //Store the results
                        alertMsg.push(result);

                        //Increment to next checkbox
                        loop(i+1, length); //loop recursively.
        
                        //RELOAD after sending the last element.
                        if(i === length - 1) {
                            //Alert all results at once
                            alert(alertMsg.join('\n'));

                            //Reload the new results
                            window.location.reload();
                        }
                    }).catch((error) => {
                        alert(error);
                    });
                })(0, checkedRows.length);
            }
        });

        //Remove User
        document.getElementById(`${DOMstrings.removeUserBtn}${id}`).addEventListener('click', () => {
            const checkedRows = aModelCtrl.getCheckedRows();
            
            if(checkedRows.length > 0) {
                const alertMsg = [];
                
                //Combine emails into one confirm alert msg
                const confirmMsg = checkedRows.map((el) => {
                    return el.closest("tr").getElementsByTagName("td")[emailColIdx].textContent;
                });

                //Confirm user removal msg
                if(!window.confirm(`Are you sure you want to delete the following emails?\n ${confirmMsg.join('\n')}`)) {
                    alert("Action Aborted");
                    return;
                }

                (function loop(i, length) {

                    if(i >= length) {
                        return;
                    }

                    const email = checkedRows[i].closest("tr").getElementsByTagName("td")[emailColIdx].textContent;

                    const promise = aModelCtrl.getActions().removeUser(email);
                    promise.then((result) => {
                        //Store the results
                        alertMsg.push(result);

                        //Increment to next checkbox
                        loop(i+1, length); //loop recursively.

                        if(i === length - 1) {
                            //Alert all results at once
                            alert(alertMsg.join('\n'));

                            //RELOAD after sending the last element.
                            window.location.reload();
                        }
                    }).catch((error) => {
                        alert(error);
                    });

                })(0, checkedRows.length);
            }
        });

        //Create User
        document.getElementById(DOMstrings.createUserBtn).addEventListener("click", () => {
            //Show the UI
            aUICtrl.toggleModal();
        });
    }

    const setActionListeners = () => {
        const emailColIdx = 1;
        const roleColIdx = 3;    

        setInlineActions(emailColIdx, roleColIdx);
        setAllActions(emailColIdx, roleColIdx); 
    }

    const setModalListeners = () => {
        const DOMstrings = aUICtrl.getDOMstrings();
        const closeBtn = document.querySelector('.' + DOMstrings.modalCloseBtn).children[0];
        const modalOuter = document.querySelector('.' + DOMstrings.modalOuter);

        //Close Btn
        closeBtn.addEventListener("click", () => {
            console.log("Close Modal");
            aUICtrl.toggleModal();
        });

        //Click on outer modal Btn
        modalOuter.addEventListener("click", (event) => {
            if(event.target === modalOuter) {
                console.log("Modal Outer Clicked");
                aUICtrl.toggleModal();
            }
        });
        
    }

    const setFormListener = () => {
        const DOMstrings = aUICtrl.getDOMstrings();

        const signupForm = document.getElementById(DOMstrings.signupForm);

        signupForm.onsubmit = (event)=> {
            event.preventDefault();

            const fieldsArr = Array.prototype.slice.call(event.target);
            const formFields = {
                email: fieldsArr[0].value,
                pwd: fieldsArr[1].value,
                confirmPwd: fieldsArr[2].value,
                name: fieldsArr[3].value,
                position: fieldsArr[4].value,
                role: fieldsArr[5].value
            }; 

            //TEST CASES
            if(!formFields.email || !formFields.pwd || !formFields.confirmPwd || !formFields.name || !formFields.role) {
                alert("Error, Empty Fields");
            } 
            else if(!aModelCtrl.emailIsValid(formFields.email)) {
                alert("Error, Invalid Email");
            }
            else if(formFields.pwd !== formFields.confirmPwd) {
                alert("Error, passwords don't match");
            } 

            //Create User
            aModelCtrl.getActions().createUser(formFields);
            
            //Clear Form
            fieldsArr.forEach((el) => {
                el.value = "";
            });

            //Close Form //May need to refresh page.
            aUICtrl.toggleModal();
        }
    }

    const setEventListeners = () => {
 
        setCheckboxListeners();
        setActionListeners();
        setModalListeners();
        setFormListener();
    }
    
    return {
        init: (sqlData) => {
            //Set SQL Data
            aModelCtrl.setSQLData(sqlData);

            createAdminTable();
            setEventListeners();
        }

        
    }
})(adminModelController, adminUIController);

//adminController.init();

