//Get the header element:
let th1 = document.getElementById("th1");

//Create div element
let divElement = document.createElement("div");

//Add content to div element
divElement.innerHTML = "Added Element";

window.onload = addElement(th1, 3, divElement);

//Create a function to add the element as the 3rd index.
function addElement(colDiv, idx, element)
{
    //Get all child elements in array format from the col.
    let childNodes = colDiv.childNodes;
    let text = '';

    //Loop through all the child elements
    for(let i =0; i < childNodes.length; i++)
    {
        //Get the content from all the elements
        text += childNodes[i].innerHTML + "\n";
    }
    console.log(text);
}