var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace

//Table
let performanceTable = document.getElementById("performance-table").getElementsByTagName("tbody")[0];
let tableData = document.getElementsByClassName("details-btn");

//Modal
let modal = document.querySelector(".modal--details-section");
let modalCloseBtn = document.getElementById("modal--close-btn");

//Report Factory Function
let createReport = (rResponses, rQuestions, rModal, rTier) => {
  //Private members
  let responses, questions, tier, modal;
  responses = rResponses;
  questions = rQuestions;
  tier = rTier;
  modal = rModal;

  //Private methods
  /**
   * 
   * @param {number} id CSS ID name
   * @description creates a button. Used for handling dynamic buttons. 
   */
  let createDetailBtn = (id) => {
    return "<button id='" + id + "' class='details-btn'>Details</button>";
  }

  /**
   * 
   * @param {object} tBody table body 
   * @param {any} content content you want to add the cell
   * 
   * @description Add a new row to the end of a table.
   */
  function appendRow(tBody, content){
    let newRow, cell; 
    newRow = tBody.insertRow(tBody.rows.length); //create new row at the end of table

    cell = newRow.insertCell(0); //create a new col for the cell
    cell.textContent = content; //add the content for the new created cell.
  }

  /**
   * 
   * @param {Number} btnIdx ID or Index of the btn which has been pressed.  
   * 
   * @description Sets the content for the details modal. It is based on the btnIdx. 
   */
  let setModalContent = (btnIdx) => {
    const nCol = responses[0].length - 2; //Notes Col Idx
    const sCol = responses[0].length - 3; //Submitter Col Idx
    
    //Get each section of the modal
    let date = document.querySelector(".modal--details-date");
    let qBody = modal.getElementsByTagName("tbody")[0];
    let nBody = modal.getElementsByTagName("tbody")[1];
    let sBody = modal.getElementsByTagName("tbody")[2];

    //CHANGE MODAL DATE
    date.textContent = responses[btnIdx][responses[0].length - 1];

    //CREATE QUESTIONS MODAL BODY
    for(let row = 0; row < questions.length; row++) {
      //Insert a new row at the end of the table.
      let newRow = qBody.insertRow(qBody.rows.length);

      //Create a cell for our data to go in by specifying the column position. 
      let cell1 = newRow.insertCell(0);
      let cell2 = newRow.insertCell(1);

      //Insert data into html cell
      cell1.textContent = questions[row];
      cell2.textContent = responses[btnIdx][row + 1];
    }

    //CREATE NOTES MODAL BODY
    appendRow(nBody, responses[btnIdx][nCol]);

    //CREATE NOTES SUBMITTER BODY
    appendRow(sBody, responses[btnIdx][sCol]);
  }

  return {
    //Public setters and Getters
    getReport: ()=> {
      return responses;
    },
    getQuestions:() => {
      return questions;
    },

    /**
   * 
   * 
   * @returns Returns an array with the summary data. 
   * 
   * @description Creates a formatted array summary for the main table. 
   */
    getSummary: () => {
      const submitterCol = 5;
      const dateCol = 7;

      let reportSummary = []; 
      
      for(let i=0; i < responses.length; i++) {
        reportSummary.push([tier, responses[i][submitterCol], createDetailBtn(i), responses[i][dateCol]]);
      }
      return reportSummary;
    },

    //Public Methods
    loadModalContent: (btnIdx) => {
      //Get the element
      let modalIdx = document.querySelector(".modal--details-index");
      modalIdx.textContent = btnIdx;
    
      setModalContent(btnIdx);
    },

    /**
 * 
 * @param {DOM Object} modal
 * 
 * @description deletes the content of the details modal for next use.  
 */
    clearModalContent: () => {
      let qBody = modal.getElementsByTagName("tbody")[0];
      let nBody = modal.getElementsByTagName("tbody")[1];
      let sBody = modal.getElementsByTagName("tbody")[2];

      let qBodyLength = qBody.rows.length;
      let nBodyLength = nBody.rows.length;
      let sBodyLength = sBody.rows.length;

      deleteRows(qBody, qBodyLength);
      deleteRows(nBody, nBodyLength);
      deleteRows(sBody, sBodyLength);
    }
  }
}

//Events
window.addEventListener("click", function(e) {
  if(e.target == modal){
    toggleModal(modal);
    report1.clearModalContent();
  }
});

performanceTable.addEventListener("click", function(e){
  if(e.target.closest(".details-btn")) {
    toggleModal(modal);
    
    //This is where we call the function to execute the report change.
    report1.loadModalContent(e.target.id);
  }
});

modalCloseBtn.addEventListener("click", () => {
  toggleModal(modal);
  report1.clearModalContent();
});


//GLOBAL FUNCTIONS
/**
 * 
 * @param {object} userProfile
 * 
 * @description Loads user information.  
 */
function loadUserInfo(userProfile) {
  //Get the dom objects
  //let userName = document.getElementById("user-name");
  //let userEmail = document.getElementById("user-email");
  //let userPosition = document.getElementById("user-position");
  console.log(userProfile);
  let pageTitle = document.getElementById("page-title");

  pageTitle.textContent = userProfile.employee_name + " Performance Evaluation";
  //userName.innerHTML = userProfile.employee_name;
  //userEmail.innerHTML = userProfile.employee_email;
  //userPosition.innerHTML = userProfile.employee_position;
}

/**
 * 
 * @param {object} modal
 * 
 * @description Toggle modal visibility. 
 */
 function toggleModal(modal) {
  modal.classList.toggle("active");
}

/**
 * 
 * @param {DOM Object} table 
 * @param {Number} rowLength
 * 
 * @description Deletes all the rows from a table.  
 */
function deleteRows(table, rowLength){
  for(let i=0; i < rowLength; i++){
    table.deleteRow(0);
  }
}

/**
 * 
 * @param {object} table Table used for row creation.
 * @param {number} rowLength Ammount of rows
 * @param {number} colLength Ammount of col
 * @param {Array} dataArr Double Arr to fill the table content [Row1[Col1, Col2], Row2[Col1, Col2]]
 * @param {number} rowOffset Data Array row offset
 * @param {number} colOffset Data Arra col offset
 * 
 * @description Append multiple rows to the end of a table by using a 2D array for the cell content. 1st Dimension is row, 2nd Dimension is for col.
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