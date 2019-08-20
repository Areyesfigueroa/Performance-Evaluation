//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Header = AllAboutParking.PerformanceEvaluation.Header || {};

AllAboutParking.PerformanceEvaluation.Header = function() {
    //Get Navbar elements
    let navbar = document.getElementById("navbar-modal");
    let navbarBtn = document.getElementById("hamburger-btn");

    //Get sign out element
    let signoutBtn = document.getElementById("sign-out-btn");

    //Get Profile elements
    let profile = document.getElementById("profile-modal");
    let profileBtn = document.getElementById("profile-btn");

    //Navbar Modal Animations
    const navbarModalSlideDownAnim = "navbar-slide-down .7s ease-in";
    const navbarModalSlideUpAnim = "navbar-slide-up .7s ease-out";

    //Profile Modal Animations
    const profileModalSlideDownAnim = "profile-modal-slide-down .7s ease-out";
    const profileModalSlideUpAnim = "profile-modal-slide-up .7s ease-in";

    //Set modal visible display
    const navbarDisplay = "block";
    const profileDisplay = "grid";

    //Create animation handler object.
    let navbarAnimHandler = new HeaderAnimationSlider(
        navbar,
        navbarDisplay,
        navbarModalSlideDownAnim,
        navbarModalSlideUpAnim
    );

    //Create animation handler for Profile Modal
    let profileAnimHandler = new HeaderAnimationSlider(
        profile,
        profileDisplay,
        profileModalSlideDownAnim,
        profileModalSlideUpAnim
    );

    //Navbar Event Listener
    navbarBtn.addEventListener("click", function() {
        if(profileAnimHandler.getIsModalActive()) //Profile is in the way
        {
            //Remove profile
            profileAnimHandler.animateHeaderModal();
        }
        else {
            navbarAnimHandler.animateHeaderModal();
        }
    });
    navbar.addEventListener("animationend", function() {
        navbarAnimHandler.hideHeaderModal();
    });

    //Profile Event Listener
    profileBtn.addEventListener("click", function() {
        if(navbarAnimHandler.getIsModalActive()) //Navbar is in the way
        {
            //Remove navbar
            navbarAnimHandler.animateHeaderModal();
        }
        else{
            profileAnimHandler.animateHeaderModal();
        }
    });
    profile.addEventListener("animationend", function(){

        profileAnimHandler.hideHeaderModal();
    });

    //If we click outside our Modals.
    window.addEventListener("click", function(e){
        if(e.target != navbarBtn && e.target != profileBtn && !e.target.closest(".navbar") && !e.target.closest(".profile-slide-menu")){
            if(profileAnimHandler.getIsModalActive())
            {
                profileAnimHandler.animateHeaderModal();
            }

            if(navbarAnimHandler.getIsModalActive())
            {
                navbarAnimHandler.animateHeaderModal();
            }
        }
    });

    //If we click sign out button.
    signoutBtn.addEventListener("click", function() {
        window.location = "includes/logout.inc.php";
    });

    //Function Constructor
    function HeaderAnimationSlider (modal, slideDownDisplay, slideDownAnim, slideUpAnim) {

        this.modal = modal;
        this.slideDownDisplay = slideDownDisplay;
        this.slideDownAnim = slideDownAnim;
        this.slideUpAnim = slideUpAnim;
        
        
        let _isModalActive = false;

        const slideUpDisplay = "none";
    
        const animStates = {
            SLIDEDOWN: 'slide-down',
            SLIDEUP: 'slide-up'
        };
    
        let animState = animStates.SLIDEDOWN;
    
        this.animateHeaderModal = function() {
            if(animState == animStates.SLIDEDOWN) {
                console.log("Set/Start Slide Down Animation, navbar display is " + slideDownDisplay + ", set animState = FadeOut");
                modal.style.animation = slideDownAnim;
                modal.style.display = slideDownDisplay;
                animState = animStates.SLIDEUP;
                _isModalActive = true;
            }
            else if(animState == animStates.SLIDEUP){
                console.log("Set/Start Slide Up Animation, set animState = SLIDEDOWN");
                modal.style.animation = slideUpAnim;
                animState = animStates.SLIDEDOWN;
                _isModalActive = false;
            }
        };
    
        this.hideHeaderModal = function () {
            if(animState === animStates.SLIDEDOWN) {
                console.log("modal display is " + slideUpDisplay + ".");
                modal.style.display = slideUpDisplay;
            }
        };

        this.getIsModalActive = function(){ return _isModalActive; }
    }
}

//window.AllAboutParking.PerformanceEvaluation.Header();

/* Mobile Nav */
$('.js--nav-icon').click(function(){
    var nav = $('.js--mobile-navbar');

    nav.slideToggle(350);
});


