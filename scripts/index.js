var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace

//DOM Global Variables
let userProfileButton = document.getElementById("user-profile-button");
let createTableButton = document.getElementById("createTable-button");
let dateSelect = document.getElementById("dateSelect");
let performanceTable = document.getElementById("performance-table");
let totalScore = document.getElementById("total-score");
let ddMenu = document.getElementById("dropdown-menu");
let tableNavContainer = document.getElementById("table-nav-container");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("previous-btn");

//Search Bar
let searchbarInput = document.getElementById("search-bar");

//Temp Questions Array - Will come from a Database in Future. 10 Rows.
let reportsDataQuery = [
  ["0", "Andrew Long", "<button class='details-btn'>Details</button>", "3.0", "04/23/2019"],
  ["1", "Andrew Long", "<button class='details-btn'>Details</button>", "2.5", "04/24/2019"],
  ["2", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["3", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["4", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["5", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["6", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["7", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["8", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["9", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["10", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["11", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["12", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["13", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["14", "Marcelo Nieto", "<button class='details-btn'>Details</button>", "1.5", "04/25/2019"]
];

//Constant Variables.
const dateColIdx = 4;

//Object Creation 
let performanceSearchbar = AllAboutParking.PerformanceEvaluation.Table.Searchbar(searchbarInput, performanceTable);
let performanceDateFilter = AllAboutParking.PerformanceEvaluation.Table.DateFilter(dateColIdx, dateSelect, reportsDataQuery, performanceTable);
let reportsTable = AllAboutParking.PerformanceEvaluation.Table.CreateHTMLTable(performanceTable, reportsDataQuery, 8, tableNavContainer, nextBtn, prevBtn, performanceSearchbar, performanceDateFilter);

//When page loads.
window.onload = reportsTable.createTable();

//Event Listeners.
searchbarInput.addEventListener("keyup", function(){
   performanceSearchbar.search();
});
createTableButton.addEventListener("click", function() {  
    //performanceSearchbar.search();
});
dateSelect.addEventListener("change", function() {
  performanceDateFilter.filter();
  //calculateOverallScore();
});
//window.addEventListener("click", outsideClickddMenu);
/*userProfileButton.addEventListener("click", function(){
    //toggleVisibility(ddMenu);
});*/

/**
 * Summary: Calculates the score from the performance table and outputs it on the overall score table
 *
 * Decription: Based on the date filter we loop through the performance table
 *             and get the sum of the visible scores.
 *
 * @requires: performanceTable, totalScore, visibleRowIdx
 * @fires: window.onload, createTableButton.addEventListener, dateSelect.addEventListener
 * @returns: {void} Returns nothing.
 */
function calculateOverallScore() {
  //Get score col index.
  const scoreColIdx = 1;

  //Variable to hold the sum result.
  let result = 0;

  //If the selection is show all
  let dateSelectValue = dateSelect.options[dateSelect.selectedIndex].value;

  if (dateSelectValue === "Show All") {
    //Add all the scores. Start at index 1 to skip the header.
    for (let i = 1; i < performanceTable.rows.length; i++) {
      //Add all rows
      result += Number(performanceTable.rows[i].cells[scoreColIdx].innerHTML);
    }
  } else {
    //Add only the visible scores.
    for (let i = 0; i < visibleRowIdx.length; i++) {
      //Add visible scores
      result += Number(
        performanceTable.rows[visibleRowIdx[i]].cells[scoreColIdx].innerHTML
      );
    }
  }

  //Change overall score html element value.
  totalScore.innerHTML = result;
}

function loadUserInfo(userProfile) {
  //Get the dom objects
  //let userName = document.getElementById("user-name");
  //let userEmail = document.getElementById("user-email");
  //let userPosition = document.getElementById("user-position");
  let pageTitle = document.getElementById("page-title");

  pageTitle.innerHTML = userProfile.employee_name + " Performance Evaluation";
  //userName.innerHTML = userProfile.employee_name;
  //userEmail.innerHTML = userProfile.employee_email;
  //userPosition.innerHTML = userProfile.employee_position;
}

function outsideClickddMenu(e) {
  if (
    !e.target.closest("ul > li") &&
    !e.target.closest("ul") &&
    e.target != userProfileButton
  ) {
    ddMenu.style.display = "none";
  }
}
