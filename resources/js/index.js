//Store all the selectors

let DOM = {
  performanceTable: "performance-table",
  tableBody: "tbody",
  detailsBtn: "details-btn",
  modalDetails: "modal--details-section",
  modalDetailsIdx: "modal--details-index",
  modalDetailsDate: "modal--details-date",
  modalDetailsCloseBtn: "modal--close-btn",
  pageTitle: "page-title",
  active: "active",
  adminBtn: "admin",
  mobileNavBtn: "js--nav-icon",
  mobileNav: "js--mobile-navbar"
}

let performanceModelController = (function() {

  let userData = {};

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

    //Report Factory Function
    createReport : (rResponses, rQuestions, rModal, rTier) => {
      //Private members
      let responses, questions, tier, modal;
      responses = rResponses;
      questions = rQuestions;
      tier = rTier;
      modal = rModal;

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
      let appendRow = (tBody, content) => {
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
        let date = document.querySelector(`.${DOM.modalDetailsDate}`);
        let qBody = modal.getElementsByTagName(DOM.tableBody)[0];
        let nBody = modal.getElementsByTagName(DOM.tableBody)[1];
        let sBody = modal.getElementsByTagName(DOM.tableBody)[2];

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
          let modalIdx = document.querySelector(`.${DOM.modalDetailsIdx}`);
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
          let qBody = modal.getElementsByTagName(DOM.tableBody)[0];
          let nBody = modal.getElementsByTagName(DOM.tableBody)[1];
          let sBody = modal.getElementsByTagName(DOM.tableBody)[2];

          let qBodyLength = qBody.rows.length;
          let nBodyLength = nBody.rows.length;
          let sBodyLength = sBody.rows.length;

          pUICtrl.deleteRows(qBody, qBodyLength);
          pUICtrl.deleteRows(nBody, nBodyLength);
          pUICtrl.deleteRows(sBody, sBodyLength);
        }
      }
    }
  }

})();

let performanceUIController = (function(){

  return {

    // Show user information.  
    showUserTitle: userData => {
      let pageTitle = document.getElementById(DOM.pageTitle);
      pageTitle.textContent = userData.employee_name + " Performance Evaluation";
    },

    showAdminContent: () => {
      let adminBtn = document.querySelector(`.${DOM.adminBtn}`);
      adminBtn.classList.add(DOM.active);
    },

    // Toggle modal visibility. 
    toggleModal: (modal) => {
      modal.classList.toggle(DOM.active);
    },

    clearDetailsModalContent: (modal) => {
      let qBody = modal.getElementsByTagName(DOM.tableBody)[0];
      let nBody = modal.getElementsByTagName(DOM.tableBody)[1];
      let sBody = modal.getElementsByTagName(DOM.tableBody)[2];

      let qBodyLength = qBody.rows.length;
      let nBodyLength = nBody.rows.length;
      let sBodyLength = sBody.rows.length;

      pUICtrl.deleteRows(qBody, qBodyLength);
      pUICtrl.deleteRows(nBody, nBodyLength);
      pUICtrl.deleteRows(sBody, sBodyLength);
    },

    // Deletes all the rows from a table.  
    deleteRows: (table, rowLength) => {
      for(let i=0; i < rowLength; i++){
        table.deleteRow(0);
      }
    }
    
  }
})();

let performanceController = (function(pUICtrl, pModelCtrl) {

  let setUpEventListeners = () => {

    let performanceTable = document.getElementById(DOM.performanceTable).getElementsByTagName(DOM.tableBody)[0];
    let modalDetails = document.querySelector(`.${DOM.modalDetails}`);
    let modalCloseBtn = document.getElementById(DOM.modalDetailsCloseBtn);

    //Events
    window.addEventListener("click", function(e) {
      if(e.target == modalDetails){
        pUICtrl.toggleModal(modalDetails);
        report1.clearModalContent();
      }
    });

    performanceTable.addEventListener("click", function(e){
      if(e.target.closest(`.${DOM.detailsBtn}`)) {
        pUICtrl.toggleModal(modalDetails);
        
        //This is where we call the function to execute the report change.
        report1.loadModalContent(e.target.id);
      }
    });

    modalCloseBtn.addEventListener("click", () => {
      pUICtrl.toggleModal(modalDetails);
      report1.clearModalContent();
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
      console.log(pModelCtrl.getUserData());

      //2. Show custom title and admin content if applicable
      pUICtrl.showUserTitle(pModelCtrl.getUserData());
      if(pModelCtrl.isAdmin()) {
        pUICtrl.showAdminContent();
      }

      //3. Build Report

      //setUpEventListeners();
    }
  }

})(performanceUIController, performanceModelController);



 //Append multiple rows to the end of a table by using a 2D array for the cell content. 1st Dimension is row, 2nd Dimension is for col.
  // let createRows = (table, rowLength, colLength, dataArr, rowOffset = 0, colOffset = 0) => {
  //   for(let row = rowOffset; row < rowLength; row++) {

  //       //Insert a new row at the end of the table.
  //       let newRow = table.insertRow(table.rows.length);

  //       for(let col = colOffset; col < colLength; col++) {
  //           //Create a cell for our data to go in by specifying the column position. 
  //           let cell = newRow.insertCell(col);

  //           //Insert data into html cell
  //           cell.innerHTML = dataArr[row][col];
  //       }
  //   }
  // }

  //Get the navbar element.





