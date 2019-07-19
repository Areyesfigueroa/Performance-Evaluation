//Let's create a namespace: <Company>.<Technology>.<Feature>
//Check if performance evaluation already exists, otherwise create a new object. 
var AllAboutParking = AllAboutParking || {}; //Root Level Namespace
AllAboutParking.PerformanceEvaluation = AllAboutParking.PerformanceEvaluation || {}; //Nested namespace
AllAboutParking.PerformanceEvaluation.Table = AllAboutParking.PerformanceEvaluation.Table || {};

AllAboutParking.PerformanceEvaluation.Table = function(){
function createHTMLTable(reportsQuery){

        var rowLenght = reportsQuery.length;
        var colLength = reportsQuery[0].length;

        const detailColumnIdx = 2;

        for(let row = 0; row < rowLenght; row++)
        {
            //Insert a new row at the end of the table.
            let newRow = performanceTable.insertRow(performanceTable.length);

            for(let col = 0; col < colLength; col++)
            {
                //Create a cell for our data to go in by specifying the column position. 
                let cell = newRow.insertCell(col);
    
                //Insert the question
                //If it is the third column include button.
                if(col == detailColumnIdx)
                {   
                    //Add button.
                    cell.innerHTML = "<button class='details-btn'>Details</button>";
                }
                else{
                    cell.innerHTML = reportsQuery[row][col];
                }
            }
        }
    }
}

//Table Creator Function Constructor
function CreateHTMLTable(table, reportsQuery){
    let rowLength = reportsQuery.length;
    let colLength = reportsQuery[0].length;
    
    const detailColumnIdx = 2;

    this.createTable = function() {

    for(let row = 0; row < rowLength; row++){
            //Insert a new row at the end of the table.
            let newRow = table.insertRow(table.length);

            for(let col = 0; col < colLength; col++)
            {
                //Create a cell for our data to go in by specifying the column position. 
                let cell = newRow.insertCell(col);

                //Insert the question
                //If it is the third column include button.
                if(col == detailColumnIdx)
                {   
                    //Add button.
                    cell.innerHTML = "<button class='details-btn'>Details</button>";
                }
                else{
                    cell.innerHTML = reportsQuery[row][col];
                }
            }
        }
    }
}