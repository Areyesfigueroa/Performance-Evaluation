//Store all the selectors

const DOM = {
  performanceTable: "performance-table",
  tableBody: "tbody",
  detailsBtn: "details-btn",
  modalDetails: "modal--details-section",
  modalDetailsIdx: "modal--details-index",
  modalDetailsDate: "modal--details-date",
  modalDetailsCloseBtn: "modal--close-btn",
  pageTitle: "page-title",
  active: "active",
  mobileNavBtn: "js--nav-icon",
  mobileNav: "js--mobile-navbar"
}

const performanceModelController = (function() {

  let userData = {};
  let reportQuestions = {
    tier_1_questions: ["Parked within the lines?", "Customer Service?", "On time attendance", "Dressed up to code?"]
  };

  let Report = function(rTier=1) {
    this.responses = userData.report_1_responses;
    this.questions = reportQuestions.tier_1_questions;
    this.tier = rTier;
  };

  /**
 * @returns Returns an array with the summary data. 
 * @description Creates a formatted array summary for the main table. 
 */
  Report.prototype.getSummary = function(createBtn) {
    const submitterCol = 5;
    const dateCol = 7;
    
    return this.responses.map((el, i) => {
      return [this.tier, el[submitterCol], createBtn(i), el[dateCol]];
    });
  };
  
  return {
    setUserData: sqlData => {
      userData = sqlData;
    },

    getUserData: () => {
      return userData;
    },

    isAdmin: () => {
      return userData.employee_role==="Admin";
    },

    createReport: (userData, reportTier) => {
      return new Report(userData, reportTier);
    }
  }

})();

const performanceUIController = (function(){

  const setDetailsModalTitle = title => {
    //Change modal detail title
    const modalIdx = document.querySelector(`.${DOM.modalDetailsIdx}`);
    modalIdx.textContent = title;
  };

  const setDetailsModalDate = date => {
    let modalDate = document.querySelector(`.${DOM.modalDetailsDate}`);
    modalDate.textContent = date;
  };

  const setQuestionsModalBody = (qBody, btnIdx, questions, responses) => {
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
  };

    /**
     * 
     * @param {object} tBody table body 
     * @param {any} content content you want to add the cell
     * 
     * @description Add a new row to the end of a table.
     */
  const appendRow = (tBody, content) => {
    let newRow, cell; 
    newRow = tBody.insertRow(tBody.rows.length); //create new row at the end of table

    cell = newRow.insertCell(0); //create a new col for the cell
    cell.textContent = content; //add the content for the new created cell.
  };

    // Deletes all the rows from a table.  
  const deleteRows = (table, rowLength) => {
    for(let i=0; i < rowLength; i++){
      table.deleteRow(0);
    }
  };

  return {

    // Show user information.  
    showUserTitle: userData => {
      let pageTitle = document.getElementById(DOM.pageTitle);
      pageTitle.textContent = userData.employee_name + " Performance Evaluation";
    },

    // Toggle modal visibility. 
    toggleModal: (modal) => {
      modal.classList.toggle(DOM.active);
    },

    createDetailBtn: (id) => {
      return "<button id='" + id + "' class='details-btn'>Details</button>";
    }, 

    /**
       * 
       * @param {Number} btnIdx ID or Index of the btn which has been pressed.  
       * 
       * @description Sets the content for the details modal. It is based on the btnIdx. 
       */
    showDetailsModalContent: (btnIdx, report) => {
      //Report variables
      const responses = report.responses;
      const questions = report.questions;

      //Report columns - constants
      const nCol = responses[0].length - 2; //Notes Col Idx
      const sCol = responses[0].length - 3; //Submitter Col Idx
      
      //Get modal section
      const modal = document.querySelector(`.${DOM.modalDetails}`);

      //Get each section of the modal
      const qBody = modal.getElementsByTagName(DOM.tableBody)[0];
      const nBody = modal.getElementsByTagName(DOM.tableBody)[1];
      const sBody = modal.getElementsByTagName(DOM.tableBody)[2];

      //CHANGE MODAL TITLE
      setDetailsModalTitle(btnIdx);

      //CHANGE MODAL DATE
      setDetailsModalDate(responses[btnIdx][responses[0].length - 1]);

      //CREATE QUESTIONS MODAL BODY
      setQuestionsModalBody(qBody, btnIdx, questions, responses);

      //CREATE NOTES MODAL BODY
      appendRow(nBody, responses[btnIdx][nCol]);

      //CREATE NOTES SUBMITTER BODY
      appendRow(sBody, responses[btnIdx][sCol]);
    },

    clearModalContent: () => {
      //Get modal section
      const modal = document.querySelector(`.${DOM.modalDetails}`);

      const qBody = modal.getElementsByTagName(DOM.tableBody)[0];
      const nBody = modal.getElementsByTagName(DOM.tableBody)[1];
      const sBody = modal.getElementsByTagName(DOM.tableBody)[2];

      const qBodyLength = qBody.rows.length;
      const nBodyLength = nBody.rows.length;
      const sBodyLength = sBody.rows.length;

      deleteRows(qBody, qBodyLength);
      deleteRows(nBody, nBodyLength);
      deleteRows(sBody, sBodyLength);
    },

    //Append multiple rows to the end of a table by using a 2D array for the cell content. 1st Dimension is row, 2nd Dimension is for col.
    createRows: (table, rowLength, colLength, dataArr, rowOffset = 0, colOffset = 0) => {
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
  }
})();

const performanceController = (function(pUICtrl, pModelCtrl) {

  let performanceTable = document.getElementById(DOM.performanceTable).getElementsByTagName(DOM.tableBody)[0];
  let modalDetails = document.querySelector(`.${DOM.modalDetails}`);

  let setUpEventListeners = (report) => {
    let modalCloseBtn = document.getElementById(DOM.modalDetailsCloseBtn);

    //Events
    window.addEventListener("click", function(e) {
      if(e.target == modalDetails){
        pUICtrl.toggleModal(modalDetails);
        pUICtrl.clearModalContent();
      }
    });

    performanceTable.addEventListener("click", function(e){
      if(e.target.closest(`.${DOM.detailsBtn}`)) {
        pUICtrl.toggleModal(modalDetails);
        
        //This is where we call the function to execute the report change.
        pUICtrl.showDetailsModalContent(e.target.id, report);
      }
    });

    modalCloseBtn.addEventListener("click", () => {
      pUICtrl.toggleModal(modalDetails);
      pUICtrl.clearModalContent();
    });

    /* Mobile Nav */
    $(`.${DOM.mobileNavBtn}`).click(() => {
      var nav = $(DOM.mobileNav);

      nav.slideToggle(350);
    });
  }

  return {
    init: (sqlUserData) => {
      //1. Get user sql data. 
      pModelCtrl.setUserData(sqlUserData);

      //2. Show custom title
      pUICtrl.showUserTitle(pModelCtrl.getUserData());

      //3. Build Report Data Structure
      const report1 = pModelCtrl.createReport();
      const report1Summary = report1.getSummary(pUICtrl.createDetailBtn);

      //4. Build Summary Report UI
      pUICtrl.createRows(performanceTable, report1Summary.length, report1Summary[0].length, report1Summary);

      //5. Setup Event Listeners
      setUpEventListeners(report1);
    }
  }

})(performanceUIController, performanceModelController);




