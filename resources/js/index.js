var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace

//DOM Global Variables
let userProfileButton = document.getElementById("user-profile-button");
let createTableButton = document.getElementById("createTable-button");
let dateSelect = document.getElementById("dateSelect");
let performanceTable = document.getElementById("performance-table").getElementsByTagName("tbody")[0];
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

//When page loads.
window.onload = createRows(performanceTable, reportsDataQuery.length, reportsDataQuery[0].length, reportsDataQuery);

/**
 * 
 * @param {*} table 
 * @param {*} rowLength 
 * @param {*} colLength 
 * @param {*} dataArr 
 * @param {*} rowOffset 
 * @param {*} colOffset 
 * 
 * TODO: Table rows showing up on the table head element.
 * 
 */
function createRows(table, rowLength, colLength, dataArr, rowOffset = 0, colOffset = 0) {            
  for(let row = rowOffset; row < rowLength; row++) {

      //Insert a new row at the end of the table.
      let newRow = table.insertRow(table.rows.length);

      for(let col = colOffset; col < colLength; col++) {
          //Create a cell for our data to go in by specifying the column position. 
          let cell = newRow.insertCell(col);

          //Insert data into html cell
          cell.innerHTML = dataArr[row][col];
      }
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

  /* Mobile Nav */
  $('.js--nav-icon').click(function(){
    var nav = $('.js--main-nav');
    var icon = $('.js--nav-icon ion-icon');

    if(icon[0].name === "close") {
        icon[0].name = "menu";
    } else {
        icon[0].name = "close";
    }

    nav.slideToggle(200);
});