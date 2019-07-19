//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Table = AllAboutParking.PerformanceEvaluation.Table || {};


AllAboutParking.PerformanceEvaluation.Table = {
    CreateHTMLTable: function(table, reportsQuery, maxNumRows, tableNavDiv){
        //Constants        
        const maxNumRowsDisplayed = 8;

        //Private Properties
        let rowLength = reportsQuery.length;
        let colLength = reportsQuery[0].length;

        //Cap how many rows a user can choose to display.
        let rowsDisplayed = maxNumRows > maxNumRowsDisplayed ? maxNumRowsDisplayed : maxNumRows;

        //Container for where we will populate the button pages. 
        let tableNav = tableNavDiv;

        //Public Methods
        this.createTable = function() {

            //Create Table
            for(let row = 0; row < rowsDisplayed; row++){

                //Insert a new row at the end of the table.
                let newRow = table.insertRow(table.length);

                for(let col = 0; col < colLength; col++) {
                    //Create a cell for our data to go in by specifying the column position. 
                    let cell = newRow.insertCell(col);

                    //Insert data into html cell
                    cell.innerHTML = reportsQuery[row][col];
                }
            }

            //Create Pages
            createPages();
        }

        //Private Methods
        let createPages = function (){

            //Get the max number of pages: TODO: VERIFY MATH IS CORRECT.
            let maxNumOfPages = Math.ceil(rowsDisplayed/rowLength);

            //Loop through the pages and create a new button per page.
            for(let i = 0; i < maxNumOfPages; i++){
                let node = document.createElement("button"); //create node button
                let textNode = document.createTextNode(i.toString());
                node.className = "page-btn";
                node.appendChild(textNode);
                tableNav.appendChild(node);
            }
        }
    }
}