
let input = document.getElementById("input");

const runBtn = document.getElementById("run-btn");
const showChart = document.getElementById("run-graph");
const singleCb = document.getElementById("single-cb");

const task1Output = document.getElementById("task1-output");
const showAllNumber = document.getElementById("all-nr");
const showMostSteps = document.getElementById("most-steps");
const showHighNumberTotalInit = document.getElementById("high-nr-total-init");
const showHighNumberTotal = document.getElementById("high-nr-total");

const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
const output3 = document.getElementById('output3');
const output4 = document.getElementById('output4');
const output5 = document.getElementById('output5');
const output6 = document.getElementById('output6');
const output7 = document.getElementById('output7');
const output8 = document.getElementById('output8');
const output9 = document.getElementById('output9');


runBtn.addEventListener("mouseup", (e) => {
    
    //guard clause to not repopulate array
    if (collatzArrayArray.length !== 0) return; 

    runCollatz(input.value);

    dataLogging();

});





input.addEventListener("keyup", (e) => {

    // guard clause to stop all others than 'enter' key and not repopulate array 
    if(e.code !== "Enter" || collatzArrayArray.length !== 0) return; 

    runCollatz(input.value);

    dataLogging();

});





showChart.addEventListener("mouseup", (e) => {

    console.log("collatzArrayArray", collatzArrayArray);// This log show all collatz data

    chartData()

    // sends the new dataset to draw the graph
    newChart(configArray);
});




// removes tooltip when click outside tooltip
document.addEventListener('click', function handleClickOutsideBox(event) {

    const box = document.getElementById('exTooltip');

    if (!box.contains(event.target)) {
        console.log(event.target);
        // box.style.display = 'none';
        box.remove();
        
    }

});



// returns a random hex color to use in graph
function addRandomColor() {

    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor
}



let configArray = [];

// creates the dataset for chart.js with the values from collatz
function chartData() {

    for (item in collatzArrayArray){
        
        configArray.push(

            configObj = {
                borderColor: `#${addRandomColor()}`,
                borderWidth: 1,
                radius: 1,
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
    //showMostSteps.textContent = "Tallet som nådde flest steg var " + longestSequence[0].y + " med " + (longestSequence.length - 1);

    output6.textContent = longestSequence[0].y;
    output7.textContent = (longestSequence.length - 1);

    collatzArrayArray.forEach((e) => {

        // this gets the highest number in each collatz sequence and the sequence count at which it occurred. Stored as an object
        let nyTestMetode1 = e.reduce((previous, current) => previous.y > current.y ? previous : current);
        console.log(nyTestMetode1);

        // logs out the step count in each collatz sequence
        console.log(e.length - 1);
        
        // this gets the start number, highest value reached, steps to highest value and total steps of each "hailstone sequence"
        //console.log("Starting nr: ", e[0].y, "highest nr: ", nyTestMetode1.y, "Steps to highest nr: ", nyTestMetode1.x, "Total steps: ", (e.length - 1));

        // html output for task 1 ( added "Antall steg til høyeste tall")
        output1.textContent = e[0].y;
        output2.textContent = (e.length - 1);
        output4.textContent = nyTestMetode1.x ;

        if (!singleCb.checked){
            output3.textContent = nyTestMetode1.y;
            output5.textContent = '--';
            output8.textContent = '--';
            output9.textContent = '--';
        }
        

        if (nyTestMetode1.y > nyTestMetode1Prev && singleCb.checked){

            nyTestMetode1Prev = nyTestMetode1.y;

            output3.textContent = '--'
            output5.textContent = input.value;
            output8.textContent = highNumberInput;
            output9.textContent = nyTestMetode1Prev
            // showHighNumberTotalInit.textContent = "Tallet som nådde høyeste verdi var " + highNumberInput  + " som nådde en topp på " + highNumber
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



let numberArray = [];

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




let collatzArray = [];
let collatzArrayArray = [];
let highNumber = 0;
let highNumberInput = 0;
let counter = 0;
let steps = 0;

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


