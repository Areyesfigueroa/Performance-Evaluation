//TODO: New Problem. What happens when I press the button in-between animations. 
//When pressed fade-in, otherwise fade-out.


//Namespace shorthand
var utilties = AllAboutParking.PerformanceEvaluation.Utilities; 

//Get navbar buttons
let hamburgerMenuBtn = document.getElementById("hamburger-btn");
let profileBtn = document.getElementById("profile-btn");

//Get navbar modal
let navbarModal = document.getElementById("header-navbar");

//Enum to let us know if the animation has faded in and out.
const animStates = {
    FADEIN: 'fade-In',
    FADEOUT: 'fade-out' 
};

//These values get hoisted when called for the first time. 
let animState = animStates.FADEIN;
const fadeInAnim = "navbar-slide-down 0.5s ease-in";
const fadeOutAnim = "navbar-slide-up 0.5s ease-out";


hamburgerMenuBtn.addEventListener("click", function() {
    if(animState == animStates.FADEIN) {
        console.log("Set/Start FadeIn Animation, navbar display is block, set animState = FadeOut");
        navbarModal.style.animation = fadeInAnim;
        navbarModal.style.display = "block";
        animState = animStates.FADEOUT;
    }
    else if(animState == animStates.FADEOUT){
        console.log("Set/Start FadeOut Animation, set animState = FadeIn");
        navbarModal.style.animation = fadeOutAnim;
        animState = animStates.FADEIN;
    }
});

//Triggers a function when the animation ends.
navbarModal.addEventListener("animationend", function()
{
    if(animState === animStates.FADEIN) {
        console.log("navbar display is none, animState remains FadeIn");
        navbarModal.style.display = "none";
    }
});