// Using an array to store the user's choices. I decided to have underlines for stylistic purposes.
//It also gives a default to return to later if the reset button is clicked. 
let choices = ['_____', '_____', '_____', '_____', '_____'];

// Function for updating the output paragraph
function updateOutput() {
    const outputParagraph = document.querySelector('.output p');
    //joining each part of the array into a final paragraph element
    outputParagraph.textContent = choices.join(' ');
}

// This function handles clicks on each div within sections (only one div can be selected in each section)
function handleDivClick(event) {
    // Creating a variable to hold whichever div was clicked
    const clickedDiv = event.target.closest('div');
    if (!clickedDiv || clickedDiv.querySelector('h3')){
        // This part ignore clicks on h3 elements and returns nothing until the next click
        return;
    } 
    
    // Storing the section of the div to a variable to get its id
    const section = clickedDiv.closest('section');
    //This part finds the index from the section so that it can be input into the choices array
    //Whichever section is clicked will have the word section removed, leaving just its number
    // then after it's parsed, it's -1 since arrays are zero indexed.
    const sectionIndex = parseInt(section.id.replace('section', '')) - 1;
    
    // selecting all divs from the selected section. then using for each to iteratre over all divs
    // classList then removes the selected class from the element
    // this deselects divs that haven't been clicked so that only one div in each column
    // can be selected at a time.
    section.querySelectorAll('div').forEach(function(div) {
        div.classList.remove('selected');
    });
    
    // Add 'selected' class to clicked div
    clickedDiv.classList.add('selected');
    
    //Based on the sectionIndex previously derived, the corressponding index 
    // in the array is updated
    choices[sectionIndex] = clickedDiv.textContent.trim();
    
    // Calling updateOutput() function
    updateOutput();
}

// Function to reset all choices
function resetChoices() {
    choices = ['_____', '_____', '_____', '_____', '_____'];
    document.querySelectorAll('.container div').forEach(function(div) {
        div.classList.remove('selected');
        // removing choices from each section so they can be clicked again
    });
    // Calling updateOutput() function after choices array have been reassigned 
    // default values
    updateOutput();
}


// Adding event listeners to all sections
document.querySelectorAll('.container section').forEach(function(section) {
    section.addEventListener('click', handleDivClick);
});

// Adding an event listener for the reset button
document.querySelector('.output button').addEventListener('click', resetChoices);

// Initial output update
updateOutput();