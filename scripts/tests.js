/**
 * This script is only being used for visual reference. 
 * It goes over how to organize namespaces, function constructors and emulating static methods by using the prototype property. 
 */


//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Utilities = AllAboutParking.PerformanceEvaluation.Utilities || {};

//Example of how to add a function constructor to our namespace.
AllAboutParking.PerformanceEvaluation.FunctionHelpers.printTest = function () {
    console.log('test');
    return this;
};


//Create a function constructor to emulate a class
AllAboutParking.PerformanceEvaluation.Utilties.FunctionHelpers = function (){};

//Declaring our new constructor function within our namespace object. same behavior as the above line.
AllAboutParking.PerformanceEvaluation.Utilities = {
    FunctionHelpers: function(){}
}

//Using the prototype object reference we will store our methods to emulate the static behaviour.
AllAboutParking.PerformanceEvaluation.Utilities.FunctionHelpers.prototype = { 
    toggleVisibility: function (e) {
        console.log(e);
    }
};

//Use case of our Function Constructor Emulating a static method behaviour.
AllAboutParking.PerformanceEvaluation.Utilities.FunctionHelpers.prototype.toggleVisibility(10);

//Namespace shorthand
var utilties = AllAboutParking.PerformanceEvaluation.Utilities;
 