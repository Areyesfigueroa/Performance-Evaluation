//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Utilities = AllAboutParking.PerformanceEvaluation.Utilities || {};

//Declaring our new constructor function within our namespace object.
//General Function Helpers
AllAboutParking.PerformanceEvaluation.Utilities = {
    //Append multiple rows to the end of a table by using a 2D array for the cell content. 1st Dimension is row, 2nd Dimension is for col.
    createRows: (table, rowLength, colLength, dataArr, rowOffset = 0, colOffset = 0) => {
        for(let row = rowOffset; row < rowLength; row++) {
            //Insert a new row at the end of the table.
            let newRow = table.insertRow(table.rows.length);
            newRow.id = `row-${row}`;
    
            for(let col = colOffset; col < colLength; col++) {
                //Create a cell for our data to go in by specifying the column position. 
                let cell = newRow.insertCell(col);
    
                //Insert data into html cell
                cell.innerHTML = dataArr[row][col];
            }
        }
    }
}


