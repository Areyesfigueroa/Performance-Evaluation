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
            let maxNumOfPages = Math.ceil(rowLength/maxNumRowsDisplayed);

            //Loop through the pages and create a new button per page.
            for(let i = 0; i < maxNumOfPages; i++){
                let node = document.createElement("button"); //create node button
                let textNode = document.createTextNode(i.toString()); //Create text.
                node.className = "page-btn";
                node.id = i.toString(); 
                node.appendChild(textNode);
                tableNav.appendChild(node);
            }

            initPageListeners();
        }

        let initPageListeners = function(){ 
            //Event Bubbling, childEvent will trigger then, the parent div tableNav.
            tableNav.addEventListener("click", function(event){

                console.log("Button Clicked!: " + event.target.id);

                //Pattern:
                /**
                 * Page: 0 = 0 Loop
                 * Page: 1 = 1 Loop
                 * Page: 2 = 2 Loops
                 * 
                 * 
                 * let startSliceIdx = 0;
                 * let endSlideIdx = maxNumRowsDisplayed; //8
                 * let slicedArr = [];
                 * 
                 * if user picks 0:
                 * default: slice(startSliceIdx, endSliceIdx);
                 * 
                 * if user picks 1: 1 Loop
                 * for(let i = 0; i < currPage; i++){
                 * 
                 *  startSliceIdx = endSliceIdx + 1; //9
                 *  endSliceIdx = startSliceIdx + maxNumRowsDisplayed; //17
                 * 
                 * }
                 * 
                 * slicedArr = reportsQuery.slice(startSliceIdx, endSliceIdx); 
                 * 
                 * if user picks 3: 2 Loops
                 * 
                 * 
                 * Start at 0: startIdx(0)-endIdx(8)
                 * Start Index to slice = 8 + 1 = 9
                 * End Index to slice = 9 + 8 = 17
                 */

                //If it is page 0, only load the first 8 rows.
                //let arr = reportsQuery.slice(9,17); //Page 0: 0-8, Page 1: 9-17
                
                //TESTING ZONE:
                
                //Convert btn num into pageid:
                console.log("Page #: " + parseInt(event.target.id));
                console.log(getPageData(parseInt(event.target.id)));

                
                //console.log(arr);
                //Clear table.
                //clearTable();
            });
        }

        let getPageData = function(pageNum) {
            let startSliceIdx = 0;
            let endSliceIdx = rowsDisplayed;
            let slicedArr = [];

            for(let i = 0; i < pageNum; i++){
                startSliceIdx = endSliceIdx + 1;
                endSliceIdx = startSliceIdx + rowsDisplayed;
            }

            slicedArr = reportsQuery.slice(startSliceIdx, endSliceIdx);
            return slicedArr;
        }

        let loadTableData = function(tableDataArr) {
            //TODO: Change the table data using the getPageData.

            for(let row = 0; row < table.rows.length; row++){

                for(let col = 0; col < table.rows[0].cells.length; col++) {
                    table.rows[row].cells[col].innerHTML = "Changed!!!";
                }
            }
        }
    }
}