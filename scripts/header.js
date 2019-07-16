
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace

//Namespace
AllAboutParking.PerformanceEvaluation = {

Header: function() {

        //Get buttons
        let hamburgerMenuBtn = document.getElementById("hamburger-btn");
        let profileBtn = document.getElementById("profile-btn");
        let signOutBtn = document.getElementById("sign-out-btn");

        //Get modals
        let navbarModal = document.getElementById("navbar-modal");
        let profileModal = document.getElementById("profile-modal");

        //Enum to let us know if the animation has faded in and out.
        const animStates = {
            SLIDEDOWN: 'slide-down',
            SLIDEUP: 'slide-up' 
        };

        //These values get hoisted when called for the first time. 
        let animState = animStates.SLIDEDOWN;

        //Navbar Modal Animations
        const navbarModalSlideDownAnim = "navbar-slide-down 0.5s ease-in";
        const navbarModalSlideUpAnim = "navbar-slide-up 0.5s ease-out";

        //Profile Modal Animations
        const profileModalSlideDownAnim = "profile-modal-slide-down 0.5s ease-out";
        const profileModalSlideUpAnim = "profile-modal-slide-up 0.5s ease-in";

        //Navbar btn on button press
        hamburgerMenuBtn.addEventListener("click", function() {
            animateHeaderModal(navbarModal, "block", navbarModalSlideDownAnim, navbarModalSlideUpAnim);
        });

        //Navbar Modal on animation end.
        navbarModal.addEventListener("animationend", function()
        {
            hideHeaderModal(navbarModal, "none");
        });

        //Profile btn on button press
        profileBtn.addEventListener("click", function() {
            animateHeaderModal(profileModal, "grid", profileModalSlideDownAnim, profileModalSlideUpAnim);
        });

        //Profile Modal on animation end.
        profileModal.addEventListener("animationend", function() {
            hideHeaderModal(profileModal, "none");
        });

        //Sign Out Button
        signOutBtn.addEventListener("click", function()
        {
            window.location = "includes/logout.inc.php";
        });

        //Function goes within the animationEnd 
        let hideHeaderModal = function (modal, fadeOutDisplay) {
            if(animState === animStates.SLIDEDOWN) {
                console.log("modal display is " + fadeOutDisplay + ".");
                modal.style.display = fadeOutDisplay;
            }
        };

        //Function that goes within the button event listener
        let animateHeaderModal = function(modal, fadeInDisplay, slideDownAnim, slideUpAnim) {
            if(animState == animStates.SLIDEDOWN) {
                console.log("Set/Start Slide Down Animation, navbar display is " + fadeInDisplay + ", set animState = FadeOut");
                modal.style.animation = slideDownAnim;
                modal.style.display = fadeInDisplay;
                animState = animStates.SLIDEUP;
            }
            else if(animState == animStates.SLIDEUP){
                console.log("Set/Start Slide Up Animation, set animState = SLIDEDOWN");
                modal.style.animation = slideUpAnim;
                animState = animStates.SLIDEDOWN;
            }
        };
    }
}

window.AllAboutParking.PerformanceEvaluation.Header();
