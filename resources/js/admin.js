/**
 * ---------------------------------
 * ADMIN PAGE - Manage users page
 * ---------------------------------
 */

const adminModelController = (function() {

})();


const adminUIController = (function() {
    const DOMstrings = {
        selectAllCheckbox: "selectall-table-check-",
        checkbox: "table-check-",
        adminTable: "admin-table",
        tableBody: "tbody"  
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
        }
    }
})();


const adminController = (function(aModelCtrl, aUICtrl) {
    
    const setEventListeners = () => {
        DOMstrings = aUICtrl.getDOMstrings();
        const selectAllLength = 2;

        for(let i =0; i < selectAllLength; i++) {
            document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).addEventListener('change', function() {
                
                let status = document.getElementById(`${DOMstrings.selectAllCheckbox}${i}`).checked;
                aUICtrl.setAllCheckboxes(status);
            });
        }
    }
    
    return {
        init: () => {
            setEventListeners();
        }
    }
})(adminModelController, adminUIController);

adminController.init();

