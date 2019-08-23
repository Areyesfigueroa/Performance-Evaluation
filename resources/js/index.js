var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace

//Table
let performanceTable = document.getElementById("performance-table").getElementsByTagName("tbody")[0];
let tableData = document.getElementsByClassName("details-btn");

//Modal
let modalOutside = document.querySelector(".modal--details-section");
let modalCloseBtn = document.getElementById("modal--close-btn");
let detailIdx = document.querySelector(".modal--details-index");

//Temp Questions Array - Will come from a Database in Future. 10 Rows.
let reportsDataQuery = [
  ["0", "Andrew Long", "<button id='0' class='details-btn'>Details</button>", "3.0", "04/23/2019"],
  ["1", "Andrew Long", "<button id='1' class='details-btn'>Details</button>", "2.5", "04/24/2019"],
  ["2", "Marcelo Nieto", "<button id='2' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["3", "Marcelo Nieto", "<button id='3' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["4", "Marcelo Nieto", "<button id='4' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["5", "Marcelo Nieto", "<button id='5' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["6", "Marcelo Nieto", "<button id='6' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["7", "Marcelo Nieto", "<button id='7' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["8", "Marcelo Nieto", "<button id='8' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["9", "Marcelo Nieto", "<button id='9' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["10", "Marcelo Nieto", "<button id='10' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["11", "Marcelo Nieto", "<button id='11' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["12", "Marcelo Nieto", "<button id='12' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["13", "Marcelo Nieto", "<button id='13' class='details-btn'>Details</button>", "1.5", "04/25/2019"],
  ["14", "Marcelo Nieto", "<button id='14' class='details-btn'>Details</button>", "1.5", "04/25/2019"]
];


//EVENT LISTENERS
window.onload = createRows(performanceTable, reportsDataQuery.length, reportsDataQuery[0].length, reportsDataQuery);

window.addEventListener("click", function(e) {
  if(e.target == modalOutside){
    toggleModal();
  }
});

performanceTable.addEventListener("click", function(e){
  if(e.target.closest(".details-btn")) {
    toggleModal();
    
    //This is where we call the function to execute the report change.
    loadDetailReport(e.target.id);
  }
});

modalCloseBtn.addEventListener("click", () => {
  toggleModal();
});

//FUNCTIONS
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

function toggleModal() {
  let modal = document.querySelector(".modal--details-section");
  modal.classList.toggle("active")
}

function loadDetailReport(btnIdx){
  //Get the element
  let modalIdx = document.querySelector(".modal--details-index");
  modalIdx.textContent = btnIdx;
}