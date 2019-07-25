var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Table = AllAboutParking.PerformanceEvaluation.Table || {};

//DOM Public Variables
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

//Public Variables
let hiddenRowIdx = [];
let visibleRowIdx = [];

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

//Object Creation 
let reportsTable = new AllAboutParking.PerformanceEvaluation.Table.CreateHTMLTable(performanceTable, reportsDataQuery, 8, tableNavContainer, nextBtn, prevBtn);
let performanceSearchbar = Searchbar(searchbarInput, performanceTable);

//When page loads.
window.onload = reportsTable.createTable();

//Event Listeners.
searchbarInput.addEventListener("keyup", function(){
  performanceSearchbar.search();
});
createTableButton.addEventListener("click", function() {  
    //reportsTable.createTable();
    performanceSearchbar.search();
  //calculateOverallScore();
});
dateSelect.addEventListener("change", function() {
  dateFilter();
  calculateOverallScore();
});
//window.addEventListener("click", outsideClickddMenu);
/*userProfileButton.addEventListener("click", function(){
    //toggleVisibility(ddMenu);
});*/



function testing(somedata) {
  console.log(somedata);
}

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

function initializeDateFilter(reportsQuery) {
  let dateQuery = [];

  //Slice the query to get only the date
  for (let i = 0; i < reportsQuery.length; i++) {
    dateQuery[i] = reportsQuery[i].slice(4)[0];
  }
  //Make dateQuery unique.
  const uniqDates = [...new Set(dateQuery)];

  for (let i = 0; i < uniqDates.length; i++) {
    //Create a new option element
    var option = document.createElement("option");

    //Create text node to add to option element
    option.appendChild(document.createTextNode(uniqDates[i]));

    //Set value property of opt
    option.value = uniqDates[i];

    //add option to end of selection box
    dateSelect.appendChild(option);
  }
}

/**
 * Summary: Filters the date based on the date dropdown selector.
 *
 * Description: Based on the selector html tag it will hide or show
 *              the table rows on the performance table by relying on
 *              the date column.
 *
 * @requires: performanceTable, hiddenRowIdx, visibleRowIdx
 * @fires: dateSelect.addEventListener
 * @returns: {void} Returns nothing.
 */
function dateFilter() {
  //Get the value being selected.
  let dateSelectValue = dateSelect.options[dateSelect.selectedIndex].value;

  //Get the date col index.
  const dateColIdx = 4;

  if (dateSelectValue === "Show All") {
    //console.log("Show All: " + hiddenRowIdx.length);

    //Are there any hidden rows.
    if (hiddenRowIdx.length > 0) {
      //Reveal the hidden rows only.
      for (let i = 0; i < hiddenRowIdx.length; i++) {
        performanceTable.rows[hiddenRowIdx[i]].style.display = "";
        //console.log("Show row of index: " + hiddenRowIdx[i]);
      }
    }
  } else {
    //Clear prev hidden and visible rows
    hiddenRowIdx = [];
    visibleRowIdx = [];

    //Loop through all the rows
    for (let rowIdx = 1; rowIdx < performanceTable.rows.length; rowIdx++) {
      //Compare only the date column with the date selected.
      if (
        performanceTable.rows[rowIdx].cells[dateColIdx].innerText !=
        dateSelectValue
      ) {
        //Hide the row
        performanceTable.rows[rowIdx].style.display = "none";
        hiddenRowIdx.push(rowIdx);
        //console.log("Hide Row Index of : " + rowIdx);
      } else if (
        performanceTable.rows[rowIdx].cells[dateColIdx].innerText ===
        dateSelectValue
      ) {
        //Show the row
        performanceTable.rows[rowIdx].style.display = "";
        visibleRowIdx.push(rowIdx);
        //console.log("Show Row Index of: " + rowIdx);
      }
    }
    //console.log("Hidden Row Indexes: " + hiddenRowIdx);
  }
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

function toggleVisibility(element) {
  if (element.style.display != "block") {
    //Visible
    element.style.display = "block";
  } else {
    //Invisible
    element.style.display = "none";
  }
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
