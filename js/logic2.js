
let input = document.getElementById("input")
let collatzArray = []
let collatzArrayArray = [];
let configArray = [];
let counter = 0
let numberArray = [];
let startNumber = 0;
let highNumber = 0;
let highNumberInput = 0;
let steps = 0
const runBtn = document.getElementById("run-btn");
const runArrayBtn = document.getElementById("run-array-btn");
const numberHi = document.getElementById("number-hi");
const singleCb = document.getElementById("single-cb");




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




// creates the dataset for chart.js
function chartData() {
    for (item in collatzArrayArray){

        configArray.push(

            configObj = {
                borderColor: 'green',
                borderWidth: 1,
                radius: 0,
                data: collatzArrayArray[item],
            }
        );
    };
}




runArrayBtn.addEventListener("mouseup", (e) => {

    console.log("collatzArrayArray", collatzArrayArray);// This log show all arrays

    chartData()
    // sends the new dataset to draw the graph
    newChart(configArray);
});





// get the highest number, the number it started from and how many step it took.
numberHi.addEventListener("mouseup", () => {

    console.log("Highest number came from: " + highNumberInput + ". And is: " + highNumber + ". This took " + (steps - 1) + " steps."  );

    //TEST: another way to find highest number in object
    // need to find an effective way to log out/show the data from nyTestMetode1 before use
    let tmpVar = [];
    collatzArrayArray.forEach((e) => {

        // this gets the highest number in each collatz sequence and the sequence count at which it occurred. Stored as an object
        let nyTestMetode1 = e.reduce((previous, current) => previous.y > current.y ? previous : current);

        // this gets the start number, highest value reached, steps to highest value and total steps of each "hailstone sequence"
        console.log("Starting nr: ", e[0].y, "highest nr: ", nyTestMetode1.y, "Steps to highest nr: ", nyTestMetode1.x, "Total steps: ", (e.length - 1));

        // console.table(e);

        // this saves the values as an array
        e.forEach((e) => {
            tmpVar.push(e.y);
            
        });
        //  Object.entries(e).forEach(keyValuePair => {console.log("  ",...keyValuePair)}); // hjelper ikke meg?
    });
    // console.log(Math.max(...tmpVar)); // NOTE: this gets the highest overall number. Get error message from number 1874 up: "Uncaught RangeError: Maximum call stack size exceeded"
    // console.log(tmpVar);

});





// This function is to prepare for running collatz on all numbers from 2 up to user input value
function runCollatz(number) {

    // zero'z the counter for next collatz
    counter = 0;

    // skips creating number array if single number checkbox is checked.
    if (singleCb.checked){

        collatz(number);
        return;
    }
    
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

    // if checkbox for single number is not checked, get the highest number in collatz sequence and the starting number
    if (number > highNumber && !singleCb.checked ) {

        highNumber = number;
        highNumberInput =  numberArray[num]; // get the starting number from numberArray[num] in runCollatz() function
        steps = counter;
    };

    // Checking if end of collatz sequence is reached, then stores the array of objects in an array
    if (number < 2 ){ 

        console.log(number);
        collatzArrayArray.push(collatzArray);
        collatzArray = [];
        counter = 0;
        
         return // stops further script execution when end of collatz sequence is reached
    }
    
 collatz(number); // runs function in loop while number > 2 and push new value to value array (collatzArray)
}; // end collatz()


