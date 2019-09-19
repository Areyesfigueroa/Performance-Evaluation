//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Utilities = AllAboutParking.PerformanceEvaluation.Utilities || {};

//Declaring our new constructor function within our namespace object.
//General Function Helpers
AllAboutParking.PerformanceEvaluation.Utilities = {
    toggleVisibility: function(e) {
        if(!e){
            console.log("Element is null");
        }
        else{

            if(e.style.display != "block")
            {
                //Visible
                e.style.display = "block";
                e.style.animation = "navbar-slide-down 1s";
                console.log(e.style.animation);
            }
            else{
                //Invisible
                //e.style.display = "none";
                e.style.animation = "navbar-slide-up 1s";
                console.log(e.style.animation);
            }
        }
    }
}


