//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Table = AllAboutParking.PerformanceEvaluation.Table || {};


AllAboutParking.PerformanceEvaluation.Table = {
    CreateHTMLTable: (table, reportsQuery, maxNumRows, tableNavDiv, nextBtn = null, prevBtn = null, searchbar = null, dateFilter = null) => {
        //Constants        
        const _maxNumRowsDisplayed = 8;

        //Private Properties.
        let _rowsDisplayed = maxNumRows > _maxNumRowsDisplayed ? _maxNumRowsDisplayed : maxNumRows; //Cap how many rows a user can choose to display.
        let _tableNav = tableNavDiv; //Container for where we will populate the button pages. 
        let _currPageNum = 0; //set and get the current page number.
        let _maxNumOfPages = 0; //Needs to be global.

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

                updateFilters();
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
                    updateFilters();
                });

                prevBtn.addEventListener("click", function(){
                    console.log("Prev Page");
                    setCurrentPageNum(getCurrentPageNum() - 1);
                    loadTableData(getPageData(getCurrentPageNum()));
                    updateFilters();
                });
            }
        }

        let updateFilters = () => {
            if(!dateFilter || !searchbar){
                console.log("Either DateFilter or Searchbar is null");
            }
            else{
                searchbar.search();
                dateFilter.filter();
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

        return {
            //Public Methods
            createTable : ()=> {
                createRows(_rowsDisplayed, reportsQuery[0].length, reportsQuery);
                createPages();
            }
        };
    },

    Searchbar: (searchBarElem, searchTable) => {
        let searchbar = searchBarElem; //save the element for reference on the search function.
        let table = searchTable;
    
        return {
            search: ()=>{
                let filter = searchbar.value.toUpperCase();
                let rows = table.rows;
    
                for(let i = 1; i < rows.length; i++){
                    let firstCol = rows[i].cells[0].textContent.toUpperCase();
                    let secondCol = rows[i].cells[1].textContent.toUpperCase();
                    let fourthCol = rows[i].cells[3].textContent.toUpperCase();
                    let fithCol = rows[i].cells[4].textContent.toUpperCase();
    
                    if(firstCol.indexOf(filter) > -1 || secondCol.indexOf(filter) > -1 || fourthCol.indexOf(filter) > -1 || fithCol.indexOf(filter) > -1) {
                        rows[i].style.display = "";
                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }
        }
    },

    DateFilter: (dateColIdx, dateSelectElement, reportsQuery, table) => {
        //Get the value being selected.
        let dateSelect = dateSelectElement;
    
        let init = () => {
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
    
        init();
        return {
            filter: ()=> {
                let filter = dateSelect.options[dateSelect.selectedIndex].value;
                let rows = table.rows;
    
                if(filter !== 'Show All') {            
                    for(let i=1; i < rows.length; i++) {
                        if(rows[i].cells[dateColIdx].textContent.indexOf(filter) > -1){
                            rows[i].style.display = "";
                        }
                        else {
                            rows[i].style.display = "none";
                        }
                    }
                } else {
                    for(let i=1; i < rows.length; i++) {
                        rows[i].style.display = "";
                    }
                }
            }
        };
    }
}