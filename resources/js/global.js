/**
 * -----------------------------------------
 * GLOBAL CONTROLLER - Applies to all pages.
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
        active: "active",
        mobileNavBtn: "js--nav-icon",
        mobileNav: "js--mobile-navbar"
      }

    return {

        getDOMstrings: () => {
            return DOM;
        },

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
const globalController = (function(gUICtrl, gModelCtrl) {

    const setUpEventListeners = () => {
        const DOMstrings = gUICtrl.getDOMstrings();

        /* Mobile Nav */
        $(`.${DOMstrings.mobileNavBtn}`).click(() => {
            console.log("TESTING");
            var nav = $(`.${DOMstrings.mobileNav}`);
            nav.slideToggle(350);
        });
    }

    return {
        init: (userData)=> {
            if(gModelCtrl.isAdmin(userData)) {
                gUICtrl.showAdminContent();
            }

            setUpEventListeners();
        }
    }
})(globalUIController, globalModelController); 



