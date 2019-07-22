//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Table = AllAboutParking.PerformanceEvaluation.Table || {};


AllAboutParking.PerformanceEvaluation.Table = {
    CreateHTMLTable: function(table, reportsQuery, maxNumRows, tableNavDiv, nextBtn = null, prevBtn = null){
        //Constants        
        const _maxNumRowsDisplayed = 8;

        //Private Properties.
        let _rowsDisplayed = maxNumRows > _maxNumRowsDisplayed ? _maxNumRowsDisplayed : maxNumRows; //Cap how many rows a user can choose to display.
        let _tableNav = tableNavDiv; //Container for where we will populate the button pages. 
        let _currPageNum = 0; //set and get the current page number.
        let _maxNumOfPages = 0; //Needs to be global.

        //Public Methods
        this.createTable = function() {

            createRows(_rowsDisplayed, reportsQuery[0].length, reportsQuery);
            createPages();
        }

        let createRows = function(rowLength, colLength, dataArr, rowOffset = 0, colOffset = 0) {            
            for(let row = rowOffset; row < rowLength; row++){

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

        //Private Methods
        let createPages = function (){

            //Get the max number of pages:
            _maxNumOfPages = Math.ceil(reportsQuery.length/_rowsDisplayed);

            //Loop through the pages and create a new button per page.
            for(let i = 0; i < _maxNumOfPages; i++){
                let node = document.createElement("button"); //create node button
                let textNode = document.createTextNode(i.toString()); //Create text.
                node.className = "page-btn";
                node.id = i.toString(); 
                node.appendChild(textNode);
                _tableNav.appendChild(node);
            }

            initPageListeners();
            initNavBtns(nextBtn, prevBtn);
        }

        let initPageListeners = function(){ 
            //Event Bubbling, childEvent will trigger then, the parent div _tableNav.
            _tableNav.addEventListener("click", function(event){                                
                //Convert btn num into pageid:
                console.log("Page #: " + parseInt(event.target.id));
                console.log(getPageData(parseInt(event.target.id)));
                loadTableData(getPageData(parseInt(event.target.id)));

                //set the current page
                setCurrentPageNum(parseInt(event.target.id));
            });
        }

        let getPageData = function(pageNum) {
            let startSliceIdx = 0;
            let endSliceIdx = _rowsDisplayed;
            let slicedArr = [];

            for(let i = 0; i < pageNum; i++){
                startSliceIdx = endSliceIdx;
                endSliceIdx = startSliceIdx + _rowsDisplayed;
            }

            slicedArr = reportsQuery.slice(startSliceIdx, endSliceIdx);
            return slicedArr;
        }

        let loadTableData = function(tableDataArr) {

            //Header does not count as a row in our case.
            tableRowsLength = table.rows.length - 1;

            //Create rows as needed.
            if(tableDataArr.length > tableRowsLength){
                //If table does not have enough rows. Create new rows.
                createRows(tableDataArr.length, tableDataArr[0].length, tableDataArr, tableRowsLength);
            }

            //Edit cell data.
            for(let row = 1; row <= tableDataArr.length; row++){

                for(let col = 0; col < tableDataArr[0].length; col++) {
                    table.rows[row].cells[col].innerHTML = tableDataArr[row - 1][col];
                }
            }

            //Trim rows as needed. Header row does not count in table length.
            if(tableDataArr.length < tableRowsLength){
                //If table has more rows than there is data. Delete left over rows. 
                let deleteRowIdx = tableDataArr.length + 1;

                //Delete left over rows.
                for(let i = deleteRowIdx; i < table.rows.length;){
                    if(table.rows[i]){
                        console.log("Delete Row: " + i);
                        table.deleteRow(i);
                    }
                    else{
                        console.log("Row does not exist");
                    }
                }
            }
        }

        let initNavBtns = function (nextBtn, prevBtn){

            if(nextBtn == null && prevBtn == null) {
                console.log("Either next or prev button have not been assigned")
            }
            else{
                nextBtn.addEventListener("click", function(){
                    console.log("Next Page");
                    setCurrentPageNum(getCurrentPageNum() + 1);
                    loadTableData(getPageData(getCurrentPageNum()));
                });

                prevBtn.addEventListener("click", function(){
                    console.log("Prev Page");
                    setCurrentPageNum(getCurrentPageNum() - 1);
                    loadTableData(getPageData(getCurrentPageNum()));
                });
            }
        }

        //Private Setters and Getters:
        let setCurrentPageNum = function(pageNum) {
            if(pageNum < 0 || pageNum >= _maxNumOfPages) {
                console.log("Reached page limit.");
            }
            else{
                _currPageNum = pageNum;
            }
        }

        let getCurrentPageNum = function() {
            return _currPageNum;
        }
    }
}