
let input = document.getElementById("input");
let collatzArray = [];
let collatzArrayArray = [];
let configArray = [];
let counter = 0;
let numberArray = [];
let startNumber = 0;
let highNumber = 0;
let highNumberInput = 0;
let steps = 0;
const runBtn = document.getElementById("run-btn");
const runArrayBtn = document.getElementById("run-graph");
const numberHi = document.getElementById("number-hi");
const singleCb = document.getElementById("single-cb");

const task1Output = document.getElementById("task1-output");
const showAllNumber = document.getElementById("all-nr");
const showMostSteps = document.getElementById("most-steps");
const showHighNumberTotalInit = document.getElementById("high-nr-total-init");
const showHighNumberTotal = document.getElementById("high-nr-total");



runBtn.addEventListener("mouseup", (e) => {
    
    //guard clause to not repopulate array
    if (collatzArrayArray.length !== 0) return; 

    runCollatz(input.value);

});





input.addEventListener("keyup", (e) => {

    // guard clause to stop all others than 'enter' key and not repopulate array 
    if(e.code !== "Enter" || collatzArrayArray.length !== 0) return; 

    runCollatz(input.value);

});





runArrayBtn.addEventListener("mouseup", (e) => {

    console.log("collatzArrayArray", collatzArrayArray);// This log show all collatz data

    chartData()
    // sends the new dataset to draw the graph
    newChart(configArray);
});





// get the highest number, the number it started from and how many step it took.
numberHi.addEventListener("mouseup", () => {

    // console.log("Highest number came from: " + highNumberInput + ". And is: " + highNumber + ". This took " + (steps - 1) + " steps."  );

    dataLogging();

});





// returns a random hex color to use in graph
function addRandomColor() {

    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor
}




// creates the dataset for chart.js with the values from collatz
function chartData() {

    for (item in collatzArrayArray){
        
        configArray.push(

            configObj = {
                borderColor: `#${addRandomColor()}`,
                borderWidth: 1,
                radius: 0,
                data: collatzArrayArray[item],
            }
        );
    };
};




//TEST: another way to find highest number in object
// need to find an effective way to log out/show the data from nyTestMetode1 before use
function dataLogging(){

    console.log("Highest number came from: " + highNumberInput + ". And is: " + highNumber + ". This took " + (steps - 1) + " steps."  );

    // let testNewHigh = collatzArrayArray.reduce((max, v) => max >= v ? max : v, -Infinity);
        // console.log(testNewHigh);

    let tmpVar = [];
    let nyTestMetode1Prev = 0;

    // Gets the sequence with most step and initiating number
    let longestSequence = collatzArrayArray.reduce((previous, current) => previous.length > current.length ? previous : current);
    showMostSteps.textContent = "Tallet som nådde flest steg var " + longestSequence[0].y + " med " + (longestSequence.length - 1);

    collatzArrayArray.forEach((e) => {

        // this gets the highest number in each collatz sequence and the sequence count at which it occurred. Stored as an object
        let nyTestMetode1 = e.reduce((previous, current) => previous.y > current.y ? previous : current);
        console.log(nyTestMetode1);

        // logs out the step count in each collatz sequence
        console.log(e.length - 1);
        
        // this gets the start number, highest value reached, steps to highest value and total steps of each "hailstone sequence"
        //console.log("Starting nr: ", e[0].y, "highest nr: ", nyTestMetode1.y, "Steps to highest nr: ", nyTestMetode1.x, "Total steps: ", (e.length - 1));

        // complete html output for task 1 ( added "Antall steg til høyeste tall"). Choosing to use innerHTML for convenience, despite security issues, since only numbers will get this far
        task1Output.innerHTML = "Utfører Collatz funksjonen på tallet: " + e[0].y + ".<br> Antall steg før tallet endte på 1: " + (e.length - 1) + ".<br> Høyeste tall nådd i sekvensen: " + nyTestMetode1.y + ".<br> Antall steg til høyeste tall: " + nyTestMetode1.x 

        if (!singleCb.checked){
            showHighNumberTotalInit.textContent = "Høyeste tall nådd i sekvensen: " + nyTestMetode1.y;
        }
        

        if (nyTestMetode1.y > nyTestMetode1Prev && singleCb.checked){

            nyTestMetode1Prev = nyTestMetode1.y;

            showAllNumber.textContent = "Utfører Collatz funksjonen på alle tall fra 1 til " + input.value;
            showHighNumberTotalInit.textContent = "Tallet som nådde høyeste tall var " + highNumberInput  + " som nådde en topp på " + highNumber
        }

        // this saves the values as an array (attempt to use Math.max on array to get highest number. This fails with error message)
        e.forEach((e) => {
            tmpVar.push(e.y);
 
        });
        // console.log(Math.max(...tmpVar)); // NOTE: this gets the highest overall number. Get error message from number 1874 up: "Uncaught RangeError: Maximum call stack size exceeded"

        // this gets how many times each number is reached (slow on high numbers)
        // console.log(tmpVar.reduce((max, v) => max >= v ? max : v, -Infinity));
        
        //  Object.entries(e).forEach(keyValuePair => {console.log("  ",...keyValuePair)}); // hjelper ikke meg?
    });
};



// This function is to prepare for running collatz on all numbers from 2 up to user input value
function runCollatz(number) {

    // zero'z the counter for next collatz
    counter = 0;

    // skips creating number array if single number checkbox is checked.
    if (!singleCb.checked){

        collatz(number);
        return;
    };
    
    // make an array of numbers from 2 to input.value.
    for (i = 2 ; i <= number; i++){ 
        
        numberArray.push(i);
    };

    // sends each number in the array to collatz() function
    for (num in numberArray){

        collatz(numberArray[num]);
    };
};





function collatz(number) {

    // stores the initial number in each new loop as an object in an array
    if (collatzArray.length === 0){

        collatzArray.push(
            {
                x: counter++, 
                y: number
            });
    };

    

    // decides if number is odd or even and does the math
    switch (number % 2) {

        case 0:
            number = number/2;
            break;

        case 1:
            number = number * 3 + 1;
            break;
    };

    
    // fill the array with the result of each collatz iteration, stored as an object
    collatzArray.push(
        {
            x: counter++,
            y: number
        });

    // if checkbox for singleCb is checked, get the highest number in collatz sequence, the starting number and how many loops it took.
    if (number > highNumber && singleCb.checked ) {

        highNumber = number;
        highNumberInput =  numberArray[num]; // get the starting number from numberArray[num] in runCollatz() function
        steps = counter;
    };

    // Checking if end of collatz sequence is reached, then stores the array of objects in an array
    if (number < 2 ){ 

        collatzArrayArray.push(collatzArray);
        collatzArray = [];
        counter = 0;
        
         return // stops further script execution when end of collatz sequence is reached
    };
    
 collatz(number); // runs function in loop while number > 2 and push new value to value array (collatzArray)
}; // end collatz()


