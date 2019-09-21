/**
 * -----------------------------------------
 * GLOBAL CONTROLLER - Applies to all sites.
 * -----------------------------------------
 */

const globalModelController = (function() {
    return {
        isAdmin: (userData) => {
            return userData.employee_role==="Admin";
        }
    }
})(); 
const globalUIController = (function(){
    const DOM = {
        adminBtn: "admin",
        adminNavbar: "admin-navbar",
        navbar: "navbar",
        active: "active"
      }

    return {
        showAdminContent: () => {
            const adminBtn = document.querySelector(`.${DOM.adminBtn}`);
            const navbar = document.querySelector(`.${DOM.navbar}`);
            
            //Show admin column on navbar.
            adminBtn.classList.add(DOM.active);
        
            //Adjust for the extra column. Change to admin navbar layout.
            navbar.classList.add(DOM.adminNavbar);
        }
    }
})(); 
const globalController = (function(gUICtrl, gModelCtrl){
    return {
        init: (userData)=> {
            if(gModelCtrl.isAdmin(userData)) {
                gUICtrl.showAdminContent();
            }
        }
    }
})(globalUIController, globalModelController); 



